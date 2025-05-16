import { Card, CardContent } from "@/components/ui/card";

interface PlayerStatsHeaderProps {
  playerName: string;
  totalMatches: number;
  totalPoints: number;
  avgPoints: number;
}

function PlayerStatsHeader({
  playerName,
  totalMatches,
  totalPoints,
  avgPoints,
}: PlayerStatsHeaderProps) {
  return (
    <Card className="bg-gradient-to-r from-[#1e40af] to-[#10b981] text-white ">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">{playerName}</h2>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
            <div className="text-center">
              <p className="text-sm uppercase tracking-wider text-white/80">
                Matches
              </p>
              <p className="text-2xl font-bold">{totalMatches}</p>
            </div>
            <div className="text-center">
              <p className="text-sm uppercase tracking-wider text-white/80">
                Total Points
              </p>
              <p className="text-2xl font-bold">{totalPoints}</p>
            </div>
            <div className="text-center">
              <p className="text-sm uppercase tracking-wider text-white/80">
                Avg Points
              </p>
              <p className="text-2xl font-bold">{avgPoints.toFixed(1)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PlayerStatsHeader;
