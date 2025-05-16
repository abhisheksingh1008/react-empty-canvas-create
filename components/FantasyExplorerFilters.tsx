import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export type FilterOptions = {
  homeOrAway: string;
  againstTeam: string;
  venue: string;
  innings: string;
  battingOrder: string;
  matchStage: string;
  result: string; // New filter for match result
  motm: boolean; // New filter for MOTM
};

interface MatchFiltersProps {
  playerData: any[];
  onApplyFilters: (filters: FilterOptions) => void;
}

export function MatchFilters({
  playerData,
  onApplyFilters,
}: MatchFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    homeOrAway: "all",
    againstTeam: "all",
    venue: "all",
    innings: "all",
    battingOrder: "all",
    matchStage: "all",
    result: "all", // Default value for result filter
    motm: false, // Default value for MOTM filter
  });

  // Derive unique values for filter options from data
  const [filterOptions, setFilterOptions] = useState<{
    homeOrAway: string[];
    teams: string[];
    venues: string[];
    innings: string[];
    battingPositions: string[];
    matchStages: string[];
    results: string[]; // New array for result options
  }>({
    homeOrAway: [],
    teams: [],
    venues: [],
    innings: [],
    battingPositions: [],
    matchStages: [],
    results: [],
  });

  useEffect(() => {
    if (playerData && playerData.length) {
      // Extract unique values for each filter
      const homeOrAwayOptions = Array.from(
        new Set(playerData.map((match) => match.homeOrAway))
      );
      const teams = Array.from(
        new Set(playerData.map((match) => match.againstTeam))
      );
      const venues = Array.from(
        new Set(playerData.map((match) => match.venue))
      );
      const inningsOptions = Array.from(
        new Set(playerData.map((match) => match.innings))
      );
      const positions = Array.from(
        new Set(playerData.map((match) => match.battingPosition.toString()))
      );
      const stages = Array.from(
        new Set(playerData.map((match) => match.matchStage))
      );

      // Extract unique results (win/loss/draw)
      // We'll extract from the result string (e.g., "Chennai Super Kings Won by 4 wickets")
      const resultTypes = Array.from(
        new Set(
          playerData
            .filter((match) => match.result)
            .map((match) => {
              if (match.result.toLowerCase().includes("won")) return "win";
              if (match.result.toLowerCase().includes("tied")) return "draw";
              return "loss";
            })
        )
      );

      setFilterOptions({
        homeOrAway: homeOrAwayOptions,
        teams,
        venues,
        innings: inningsOptions,
        battingPositions: positions,
        matchStages: stages,
        results: resultTypes,
      });
    }
  }, [playerData]);

  const handleFilterChange = (
    key: keyof FilterOptions,
    value: string | boolean
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    onApplyFilters(filters);
  };

  const resetFilters = () => {
    setFilters({
      homeOrAway: "all",
      againstTeam: "all",
      venue: "all",
      innings: "all",
      battingOrder: "all",
      matchStage: "all",
      result: "all",
      motm: false,
    });
    onApplyFilters({
      homeOrAway: "all",
      againstTeam: "all",
      venue: "all",
      innings: "all",
      battingOrder: "all",
      matchStage: "all",
      result: "all",
      motm: false,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Filter className="h-5 w-5" /> Filters
        </h3>
        <Button variant="outline" size="sm" onClick={resetFilters}>
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Home or Away */}
        <div className="space-y-2">
          <Label htmlFor="homeOrAway">Home or Away</Label>
          <Select
            value={filters.homeOrAway}
            onValueChange={(value) => handleFilterChange("homeOrAway", value)}
          >
            <SelectTrigger id="homeOrAway">
              <SelectValue placeholder="Home or Away" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Matches</SelectItem>
              {filterOptions.homeOrAway.map((option) => (
                <SelectItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Against Team */}
        <div className="space-y-2">
          <Label htmlFor="againstTeam">Against Team</Label>
          <Select
            value={filters.againstTeam}
            onValueChange={(value) => handleFilterChange("againstTeam", value)}
          >
            <SelectTrigger id="againstTeam">
              <SelectValue placeholder="Select Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              {filterOptions.teams.map((team) => (
                <SelectItem key={team} value={team}>
                  {team}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Venue */}
        <div className="space-y-2">
          <Label htmlFor="venue">Venue</Label>
          <Select
            value={filters.venue}
            onValueChange={(value) => handleFilterChange("venue", value)}
          >
            <SelectTrigger id="venue">
              <SelectValue placeholder="Select Venue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Venues</SelectItem>
              {filterOptions.venues.map((venue) => (
                <SelectItem key={venue} value={venue}>
                  {venue}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Innings */}
        <div className="space-y-2">
          <Label htmlFor="innings">Innings</Label>
          <Select
            value={filters.innings}
            onValueChange={(value) => handleFilterChange("innings", value)}
          >
            <SelectTrigger id="innings">
              <SelectValue placeholder="Select Innings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Innings</SelectItem>
              {filterOptions.innings.map((inning) => (
                <SelectItem key={inning} value={inning}>
                  {inning}st Innings
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Batting Order */}
        <div className="space-y-2">
          <Label htmlFor="battingOrder">Batting Position</Label>
          <Select
            value={filters.battingOrder}
            onValueChange={(value) => handleFilterChange("battingOrder", value)}
          >
            <SelectTrigger id="battingOrder">
              <SelectValue placeholder="Batting Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              {filterOptions.battingPositions.map((position) => (
                <SelectItem key={position} value={position}>
                  Position {position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Match Stage */}
        <div className="space-y-2">
          <Label htmlFor="matchStage">Match Stage</Label>
          <Select
            value={filters.matchStage}
            onValueChange={(value) => handleFilterChange("matchStage", value)}
          >
            <SelectTrigger id="matchStage">
              <SelectValue placeholder="Match Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              {filterOptions.matchStages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage.charAt(0).toUpperCase() + stage.slice(1)} Stage
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* New Filter: Result (Win/Loss/Draw) */}
        <div className="space-y-2">
          <Label htmlFor="resultFilter">Result</Label>
          <Select
            value={filters.result}
            onValueChange={(value) => handleFilterChange("result", value)}
          >
            <SelectTrigger id="resultFilter">
              <SelectValue placeholder="Match Result" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Results</SelectItem>
              {filterOptions.results.map((result) => (
                <SelectItem key={result} value={result}>
                  {result.charAt(0).toUpperCase() + result.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* New Filter: MOTM */}
        <div className="space-y-2 flex items-center">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="motmFilter"
              checked={filters.motm}
              onCheckedChange={(checked) =>
                handleFilterChange("motm", Boolean(checked))
              }
            />
            <Label htmlFor="motmFilter" className="cursor-pointer">
              Player of the Match Only
            </Label>
          </div>
        </div>
      </div>

      <Button
        onClick={applyFilters}
        className="w-full bg-cricket-secondary hover:bg-cricket-secondary/90"
      >
        Apply Filters
      </Button>
    </div>
  );
}
