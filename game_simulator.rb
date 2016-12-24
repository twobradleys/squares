class Situation
  PLAY_TYPES = %i(from_scrimmage point_after_touchdown kickoff free_kick)
  HOME = 0
  AWAY = 1

  attr_reader :play_type

  def initialize
    @possession = HOME
    @score_by_quarter = {
      # 1-based arrays fools
      HOME => [nil, 0, 0, 0, 0],
      AWAY => [nil, 0, 0, 0, 0],
    }
    @field_position = 20 # from the possessing team's perspective. 0 = own end zone, 100 = opponent end zone
    @down = 1
    @line_to_gain = 30
    @quarter = 1
    @seconds_remaining = 15 * 60
    @play_type = :from_scrimmage
  end

  def total_score(team)
    @score_by_quarter[team][1] + @score_by_quarter[team][2] + @score_by_quarter[team][3] + @score_by_quarter[team][4]
  end

  def home_score
    total_score(HOME)
  end

  def away_score
    total_score(AWAY)
  end

  def is_finished?
    # TODO does not take full OT rules into account; this is a sudden-death model
    ((@quarter > 4) && (home_score != away_score)) || # 4th quarter ended in non-tie or
      (@quarter > 5) # OT ended, game is tied
  end

  def turnover
    @possession = 1 - @possession
    @field_position = 100 - @field_position
    first_down
  end

  def first_down
    @down = 1
    @line_to_gain = @field_position + 10 # TODO think it's okay if this goes over 100
  end

  def score(points, defensive_score = false)
    scorer = defensive_score ? 1 - @possession : @possession
    @score_by_quarter[scorer][@quarter] += points
  end

  def apply_result(result)
    case result
    when FromScrimmageResult
      @field_position += result.yards_gained

      if @field_position >= 100
        # touchdown
        score(6)
        @play_type = :point_after_touchdown
      elsif @field_position >= @line_to_gain
        first_down
      elsif @field_position <= 0
        # Safety
        score(2, true)
        @play_type = :kickoff
      elsif result.repeat_down
        # No-op
      else
        @down += 1
        if @down > 4
          turnover
        end
      end

    when OnePointConversionResult
      if result.success
        score(1)
      end
      @play_type = :kickoff

    when TwoPointConversionResult
      if result.success
        score(2)
      end
      @play_type = :kickoff

    when FieldGoalResult
      if result.success
        score(3)
        @play_type = :kickoff
      else
        turnover
      end

    when KickoffResult, FreeKickResult
      turnover
      @field_position = result.starting_field_position
      first_down
      @play_type = :from_scrimmage

    when PuntResult
      @field_position += result.net_distance
      if @field_position > 100
        # touchback
        @field_position = 80
      end
      turnover

    when TakeawayResult
      turnover
      @field_position += result.taking_team_yards_gained

      if @field_position >= 100
        # touchdown
        score(6)
        @play_type = :point_after_touchdown
      elsif @field_position <= 0
        # touchback
        @field_position = 20
        first_down
      end
    else
      raise "unknown result type #{result.class}"

    end

    # advance the clock
    @seconds_remaining -= result.seconds_elapsed
    if (@seconds_remaining <= 0) && (@play_type != :point_after_touchdown)
      @quarter += 1
      @seconds_remaining = 15 * 60
    end
  end
end

class Result
  # Takeaway == interception or fumble. Scoring plays and turnovers on downs are not takeaways
  attr_reader :seconds_elapsed

  def initialize
    @seconds_elapsed = rand(60)
  end

  def self.simulate_for_situation(situation)
    # TODO add takeaways

    case situation.play_type
    when :from_scrimmage
      # TODO think about punting or kicking
      FromScrimmageResult.new

    when :point_after_touchdown
      # TODO think about going for two. Need the table!
      OnePointConversionResult.new

    when :kickoff
      KickoffResult.new

    when :free_kick
      FreeKickResult.new

    end
  end
end

class FromScrimmageResult < Result
  attr_reader :repeat_down, :yards_gained

  def initialize
    super
    @repeat_down = false # TODO make this possible
    @yards_gained = rand(15) - 2 # TODO better distribution
  end
end

class OnePointConversionResult < Result
  attr_reader :success

  def initialize
    super
    @success = rand < 0.9 # TODO
  end
end

class TwoPointConversionResult < Result
  attr_reader :success

  def initialize
    super
    @success = rand < 0.55 # TODO
  end
end

class FieldGoalResult < Result
  attr_reader :success

  def initialize
    super
    # TODO
  end
end

class KickoffResult < Result
  attr_reader :starting_field_position

  def initialize
    super
    @starting_field_position = (rand < 0.3) ? 25 : rand(105)
  end
end

class FreeKickResult < Result
  attr_reader :starting_field_position

  def initialize
    super
    # TODO different distribution than touchdowns
    @starting_field_position = (rand < 0.2) ? 25 : rand(115)
  end
end

class PuntResult < Result
  attr_reader :net_distance

  def initialize(punting_field_position)
    super
    target_distance = [65, (100 - punting_field_position) + 5].min
    return_distance = rand(100)
    rand(target_distance) + return_distance
  end
end

class TakeawayResult < Result
  attr_reader :taking_team_yards_gained

  def initialize
    super
    # TODO
  end
end

# main
situation = Situation.new
until situation.is_finished?
  p situation
  result = Result.simulate_for_situation(situation)
  p result
  situation.apply_result(result)
end
