import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Match } from "@/data/playerData";
import { Award, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PerformanceDetailsModalProps {
  match: Match | null;
  isOpen: boolean;
  playerName: string;
  onClose: () => void;
}

export function PerformanceDetailsModal({
  match,
  isOpen,
  playerName,
  onClose,
}: PerformanceDetailsModalProps) {
  if (!match) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-cricket-primary">
            {/* Updated title format with player name and team */}
            {playerName}&apos;s Performance vs {match.againstTeam}
            {match.isImpactPlayer && (
              <Badge
                variant="outline"
                className="bg-[#F2FCE2] text-cricket-primary ml-2 flex items-center gap-1"
              >
                <Award className="h-3.5 w-3.5" />
                Impact Player
              </Badge>
            )}
            {match.is_wk && (
              <Badge variant="outline" className="ml-1 flex items-center gap-1">
                <Shield className="h-3.5 w-3.5" />
                Wicket Keeper
              </Badge>
            )}
            {match.mom_indicator === 1 && (
              <Badge className="bg-amber-100 text-amber-800 ml-2">
                Player of the Match
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Fantasy points moved to the top */}
          <div className="bg-cricket-light p-6 rounded-lg text-center">
            <p className="text-sm text-gray-700 mb-1">Fantasy Points</p>
            <p className="text-4xl font-bold text-cricket-primary">
              {match.fantasyPoints}
            </p>
          </div>

          {/* Performance stats - renamed to Match Performance */}
          <div>
            <h3 className="text-lg font-medium mb-4">Match Performance</h3>
            <div className="grid grid-cols-4 gap-4">
              {(match.no_of_fours !== undefined ||
                match.boundaries !== undefined) && (
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-3xl font-bold text-cricket-primary">
                    {match.no_of_fours !== undefined
                      ? match.no_of_fours
                      : match.boundaries}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Boundaries</p>
                </div>
              )}

              {(match.no_of_sixes_hitted !== undefined ||
                match.sixes !== undefined) && (
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-3xl font-bold text-cricket-primary">
                    {match.no_of_sixes_hitted !== undefined
                      ? match.no_of_sixes_hitted
                      : match.sixes}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Sixes</p>
                </div>
              )}

              {(match.number_of_wicket_taken !== undefined ||
                match.wickets !== undefined) && (
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-3xl font-bold text-cricket-primary">
                    {match.number_of_wicket_taken !== undefined
                      ? match.number_of_wicket_taken
                      : match.wickets}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Wickets</p>
                </div>
              )}

              {match.number_of_catches !== undefined && (
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-3xl font-bold text-cricket-primary">
                    {match.number_of_catches}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Catches</p>
                </div>
              )}
            </div>
          </div>

          {/* Batting performance */}
          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-3">Batting Performance</h3>
            <div className="grid grid-cols-4 gap-4">
              {match.runs_scored !== undefined && (
                <div className="bg-gray-50 p-3 rounded-md text-center">
                  <p className="text-2xl font-bold text-cricket-primary">
                    {match.runs_scored}
                  </p>
                  <p className="text-sm text-gray-600">Runs</p>
                </div>
              )}
              {match.balls_faced !== undefined && (
                <div className="bg-gray-50 p-3 rounded-md text-center">
                  <p className="text-2xl font-bold text-cricket-primary">
                    {match.balls_faced}
                  </p>
                  <p className="text-sm text-gray-600">Balls</p>
                </div>
              )}
              {match.strike_rate !== undefined && (
                <div className="bg-gray-50 p-3 rounded-md text-center">
                  <p className="text-2xl font-bold text-cricket-primary">
                    {match.strike_rate.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">Strike Rate</p>
                </div>
              )}
            </div>
          </div>

          {/* Bowling performance */}
          {(match.number_of_over_bowled ||
            match.maiden_over ||
            match.number_of_dot_ball ||
            match.runs_given_in_bowling ||
            match.economy_rate) && (
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium mb-3">Bowling Performance</h3>
              <div className="grid grid-cols-4 gap-4">
                {match.number_of_over_bowled !== undefined && (
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <p className="text-2xl font-bold text-cricket-primary">
                      {match.number_of_over_bowled}
                    </p>
                    <p className="text-sm text-gray-600">Overs</p>
                  </div>
                )}
                {match.maiden_over !== undefined && (
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <p className="text-2xl font-bold text-cricket-primary">
                      {match.maiden_over}
                    </p>
                    <p className="text-sm text-gray-600">Maidens</p>
                  </div>
                )}
                {match.number_of_dot_ball !== undefined && (
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <p className="text-2xl font-bold text-cricket-primary">
                      {match.number_of_dot_ball}
                    </p>
                    <p className="text-sm text-gray-600">Dot Balls</p>
                  </div>
                )}
                {match.runs_given_in_bowling !== undefined && (
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <p className="text-2xl font-bold text-cricket-primary">
                      {match.runs_given_in_bowling}
                    </p>
                    <p className="text-sm text-gray-600">Runs Conceded</p>
                  </div>
                )}
                {match.economy_rate !== undefined && (
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <p className="text-2xl font-bold text-cricket-primary">
                      {match.economy_rate.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">Economy</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Venue statistics - Batting stats first, then bowling stats */}
          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-2">Venue Statistics</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {/* Batting stats first */}
                {match.Venue_Avg_fantasy_points !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Avg. Fantasy Points</p>
                    <p className="font-medium text-cricket-primary">
                      {match.Venue_Avg_fantasy_points.toFixed(1)}
                    </p>
                  </div>
                )}
                {match.Venue_Avg_runs_scored !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Avg. Runs</p>
                    <p className="font-medium text-cricket-primary">
                      {match.Venue_Avg_runs_scored.toFixed(1)}
                    </p>
                  </div>
                )}
                {match.Venue_Avg_strike_rate !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Avg. Strike Rate</p>
                    <p className="font-medium text-cricket-primary">
                      {match.Venue_Avg_strike_rate.toFixed(1)}
                    </p>
                  </div>
                )}

                {/* Bowling stats after */}
                {match.Venue_Avg_number_of_wicket_taken !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Avg. Wickets</p>
                    <p className="font-medium text-cricket-primary">
                      {match.Venue_Avg_number_of_wicket_taken.toFixed(1)}
                    </p>
                  </div>
                )}
                {match.Venue_Avg_economy_rate !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Avg. Economy</p>
                    <p className="font-medium text-cricket-primary">
                      {match.Venue_Avg_economy_rate.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Career statistics - Batting stats first, then bowling stats */}
          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-2">Career Statistics</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {/* Batting stats first */}
                {match.Overall_Avg_runs !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Career Avg. Runs</p>
                    <p className="font-medium text-cricket-primary">
                      {match.Overall_Avg_runs.toFixed(1)}
                    </p>
                  </div>
                )}
                {match.Avg_run_last_5 !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Avg. Runs (Last 5)</p>
                    <p className="font-medium text-cricket-primary">
                      {match.Avg_run_last_5.toFixed(1)}
                    </p>
                  </div>
                )}
                {match.Avg_ball_faced_last_5 !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Avg. Balls (Last 5)</p>
                    <p className="font-medium text-cricket-primary">
                      {match.Avg_ball_faced_last_5.toFixed(1)}
                    </p>
                  </div>
                )}
                {match.Avg_str_last_5 !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Avg. SR (Last 5)</p>
                    <p className="font-medium text-cricket-primary">
                      {match.Avg_str_last_5.toFixed(2)}
                    </p>
                  </div>
                )}

                {/* Bowling stats after */}
                {match.Career_Avg_wickets !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Career Avg. Wickets</p>
                    <p className="font-medium text-cricket-primary">
                      {match.Career_Avg_wickets.toFixed(2)}
                    </p>
                  </div>
                )}
                {match.Career_Avg_econ !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Career Avg. Economy</p>
                    <p className="font-medium text-cricket-primary">
                      {match.Career_Avg_econ.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Basic match information moved to the bottom, including date */}
          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-3">Match Details</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{match.date}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Venue</p>
                <p className="font-medium">{match.venue}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Match Type</p>
                <p className="font-medium">{match.homeOrAway}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Match Stage</p>
                <p className="font-medium">{match.matchStage}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Innings</p>
                <p className="font-medium">{match.innings}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Batting Position</p>
                <p className="font-medium">{match.battingPosition}</p>
              </div>
              {match.result && (
                <div className="space-y-1 col-span-2">
                  <p className="text-sm text-gray-500">Result</p>
                  <p className="font-medium">{match.result}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
