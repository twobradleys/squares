class MyFile < File
  def gets(*args)
    line = super
    if line != nil
      line.gsub!('\\"','""')  # fix the \" that would otherwise cause a parse error
    end
    line
  end
end

require 'csv'

csv = CSV.new(MyFile.open(ARGV.first), :headers => true, :header_converters => :symbol, :converters => :all)
records = csv.to_a.map(&:to_hash)
require 'set'
playtypes = Set.new
records.each do |r|
  playtypes << r[:playtype]
#  if r[:gameid] == 2013090901
#  end
end

p playtypes
