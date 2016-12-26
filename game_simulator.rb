class Situation
  PLAY_TYPES = %i(from_scrimmage point_after_touchdown kickoff free_kick)
  HOME = 0
  AWAY = 1

  attr_reader :play_type, :down, :field_position

  def initialize
    @possession = HOME
    @score_by_quarter = {
      # 1-based arrays fools
      HOME => [nil, 0, 0, 0, 0],
      AWAY => [nil, 0, 0, 0, 0],
    }
    @quarter = 1
    @seconds_remaining = 15 * 60

    kickoff
  end

  def to_s
    q = @quarter == 5 ? 'OT' : "Q#{@quarter}"
    mins = @seconds_remaining / 60
    secs = @seconds_remaining % 60

    yard_end = @field_position >= 50 ? 'Opp' : 'Own'
    rel_yard = @field_position >= 50 ? 100 - @field_position : @field_position

    scrimmage = case @play_type
                when :from_scrimmage
                  to_gain = (@line_to_gain >= 100) ? 'Goal' : @line_to_gain - @field_position
                  "#{@down} and #{to_gain} at #{yard_end} #{rel_yard}"
                when :point_after_touchdown
                  "point after attempt"
                when :kickoff
                  "kickoff"
                when :free_kick
                  "free kick"
                end

    "Bears #{away_score} - Lions #{home_score}, #{q} #{mins}:#{secs} #{(@possession == HOME) ? 'Lions' : 'Bears'} ball, #{scrimmage}"
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
    # TODO games cannot end in ties in the playoffs
    ((@quarter > 4) && (home_score != away_score)) || # 4th quarter ended in non-tie or
      (@quarter > 5) # OT ended, game is tied
  end

  def turnover
    puts "---> Turnover"
    change_of_possession
  end

  def change_of_possession
    puts "--> Change of possession"
    @possession = 1 - @possession
    @field_position = 100 - @field_position
  end

  def first_down
    puts "--> First down"
    new_downs
  end

  def new_downs
    @down = 1
    @line_to_gain = @field_position + 10 # TODO think it's okay if this goes over 100
    @play_type = :from_scrimmage
  end

  def touchdown
    puts "--> Touchdown"
    score(6)
    @play_type = :point_after_touchdown
  end

  def safety
    puts "--> Safety"
    score(2, true)
    free_kick
  end

  def score(points, defensive_score = false)
    puts "--> Score #{points}" + (defensive_score ? ' (defensive)' : '')
    scorer = defensive_score ? 1 - @possession : @possession
    @score_by_quarter[scorer][@quarter] += points
  end

  def free_kick
    @play_type = :free_kick
    @field_position = 20
  end

  def kickoff
    @play_type = :kickoff
    @field_position = 35
  end

  def apply_result(result)
    case result
    when FromScrimmageResult
      @field_position += result.yards_gained

      if @field_position >= 100
        touchdown
      elsif @field_position >= @line_to_gain
        first_down
      elsif @field_position <= 0
        safety
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
      kickoff

    when TwoPointConversionResult
      if result.success
        score(2)
      end
      kickoff

    when FieldGoalResult
      if result.success
        score(3)
        kickoff
      else
        change_of_possession
        new_downs
      end

    when ReturnableKickResult
      # This handles all three types of returnable kicks
      @field_position += result.kick_distance
      change_of_possession

      if result.touchback
        @field_position = result === KickoffResult ? 25 : 20
      else
        @field_position += result.return_distance
      end

      # Now check for a TD or safety
      # TODO dedup with scrimmage logic
      if @field_position >= 100
        touchdown
      elsif @field_position <= 0
        safety
      else
        new_downs
      end

    when TakeawayResult
      turnover
      @field_position += result.taking_team_yards_gained

      if @field_position >= 100
        touchdown
      elsif @field_position <= 0
        # touchback
        # TODO can there be a safety on a takeaway? technically i think yet but very rare
        @field_position = 20
        first_down
      end

    else
      raise "unknown result type #{result.class}"

    end

    # advance the clock
    # TODO two minute warning?
    @seconds_remaining -= result.seconds_elapsed
    if (@seconds_remaining <= 0) && (@play_type != :point_after_touchdown)
      @quarter += 1
      @seconds_remaining = 15 * 60

      if @quarter == 3
        puts "--> End of half"
        @possession = AWAY
        kickoff
      end
    end
  end
end

class Result
  # Takeaway == interception or fumble. Scoring plays and turnovers on downs are not takeaways
  attr_reader :seconds_elapsed

  def initialize(situation)
    @seconds_elapsed = rand(60)
  end

  def self.simulate_for_situation(situation)
    # TODO add takeaways

    case situation.play_type
    when :from_scrimmage
      if (situation.down != 4)
        FromScrimmageResult.new(situation)
      elsif (situation.field_position > 62)
        FieldGoalResult.new(situation)
      else
        PuntResult.new(situation)
      end

    when :point_after_touchdown
      # TODO think about going for two. Need the table!
      OnePointConversionResult.new(situation)

    when :kickoff
      # TODO onside kick
      KickoffResult.new(situation)

    when :free_kick
      FreeKickResult.new(situation)

    end
  end
end

class FromScrimmageResult < Result
  attr_reader :repeat_down, :yards_gained

  def initialize(situation)
    super
    @repeat_down = false # TODO make this possible
    @yards_gained = rand(9) - 2 # TODO better distribution
  end

  def to_s
    if @yards_gained > 0
      "Gain of #{@yards_gained} yard(s)"
    elsif @yards_gained < 0
      "Loss of #{-1 * @yards_gained} yard(s)"
    else
      "No gain"
    end
  end
end

class OnePointConversionResult < Result
  attr_reader :success

  def initialize(situation)
    super(situation)
    @success = rand < 0.9 # TODO
  end

  def to_s
    "XP attempt is #{@success ? 'good' : 'no good'}"
  end
end

class TwoPointConversionResult < Result
  attr_reader :success

  def initialize
    super(situation)
    @success = rand < 0.55 # TODO
  end
end

class FieldGoalResult < Result
  attr_reader :success

  def initialize(situation)
    super(situation)
    @success = rand < 0.7 # TODO factor in FG distance
  end

  def to_s
    "Field goal #{@success ? 'good' : 'missed'}"
  end
end

# Abstract
class ReturnableKickResult < Result
  attr_reader :kick_distance, :touchback, :return_distance

  def initialize(situation, kick_distance, return_distance)
    super(situation)

    @kick_distance = kick_distance
    @return_distance = return_distance
    @touchback = if situation.field_position + kick_distance >= 100
                   rand > 0.2
                 else
                   false
                 end
  end

  # TODO model a takeaway on a return, which is different than a takeaway from
  # scrimmage in terms of field position

  def to_s
    # TODO model like punt with touchback, distance, return, out of bounds
    if @touchback
      "#{kick_type} of #{@kick_distance} yards for a touchback"
    else
      "#{kick_type} of #{@kick_distance} yards with a #{@return_distance} yard return" # TODO max this out
    end
  end
end

class KickoffResult < ReturnableKickResult
  def initialize(situation)
    super(situation, rand(30) + 55, rand(120 - 15))
  end

  def kick_type
    'Kickoff'
  end
end

class FreeKickResult < ReturnableKickResult
  def initialize(situation)
    super(situation, rand(30) + 40, rand(125 - 15))
  end

  def kick_type
    'Free Kick'
  end
end

class PuntResult < ReturnableKickResult
  def initialize(situation)
    target_distance = [65, (100 - situation.field_position) + 5].min
    kick_distance = rand(target_distance)
    super(situation, kick_distance, rand(125 - 10))
  end

  def kick_type
    'Punt'
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
  puts situation
  result = Result.simulate_for_situation(situation)
  puts result
  situation.apply_result(result)
end
