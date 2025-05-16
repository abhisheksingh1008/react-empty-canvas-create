
"use client";

import { useState, useEffect } from "react";
import { fetchPlayerData, Match } from "@/data/playerData";
import PlayerSelector from "./PlayerSelector";
import StatsFilter from "./StatsFilter";
import ComparisonChart from "./ComparisonChart";
import { Card, CardContent } from "@/components/ui/card";
import PlayerStatsHeader from "../PlayerStatsHeader";
import IPLTeams from "@/lib/constants.ts/IPLTeams";

type StatsFilterType = "all" | "first" | "second";

export default function PlayerComparisonContainer() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [player1Data, setPlayer1Data] = useState<Match[]>([]);
  const [player2Data, setPlayer2Data] = useState<Match[]>([]);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [statsFilter, setStatsFilter] = useState<StatsFilterType>("all");

  useEffect(() => {
    async function loadPlayerData(playerName: string, setData: (data: Match[]) => void, setLoading: (isLoading: boolean) => void) {
      if (!playerName) return;
      
      setLoading(true);
      try {
        const data = await fetchPlayerData(playerName);
        setData(data);
      } catch (error) {
        console.error(`Error fetching data for ${playerName}:`, error);
      } finally {
        setLoading(false);
      }
    }

    if (player1) {
      loadPlayerData(player1, setPlayer1Data, setIsLoading1);
    }
    
    if (player2) {
      loadPlayerData(player2, setPlayer2Data, setIsLoading2);
    }
  }, [player1, player2]);

  const filterData = (data: Match[], filter: StatsFilterType) => {
    if (filter === "all") return data;
    if (filter === "first") return data.filter(match => match.innings === "1");
    if (filter === "second") return data.filter(match => match.innings === "2");
    return data;
  };

  const player1FilteredData = filterData(player1Data, statsFilter);
  const player2FilteredData = filterData(player2Data, statsFilter);

  // Calculate stats for radar chart
  const getPlayerStats = (data: Match[]) => {
    if (!data.length) return null;

    const totalMatches = data.length;
    const avgRuns = data.reduce((sum, match) => sum + match.runs_scored, 0) / totalMatches;
    const avgWickets = data.reduce((sum, match) => sum + match.number_of_wicket_taken, 0) / totalMatches;
    const avgStrikeRate = data.reduce((sum, match) => sum + match.strike_rate, 0) / totalMatches;
    const avgEconomy = data.reduce((sum, match) => sum + match.economy_rate, 0) / totalMatches;
    const avgFantasyPoints = data.reduce((sum, match) => sum + match.fantasyPoints, 0) / totalMatches;
    
    return {
      "Avg. Runs": parseFloat(avgRuns.toFixed(2)),
      "Avg. Wickets": parseFloat(avgWickets.toFixed(2)),
      "Strike Rate": parseFloat(avgStrikeRate.toFixed(2)),
      "Economy Rate": parseFloat(avgEconomy.toFixed(2)),
      "Fantasy Points": parseFloat(avgFantasyPoints.toFixed(2))
    };
  };

  const player1Stats = getPlayerStats(player1FilteredData);
  const player2Stats = getPlayerStats(player2FilteredData);

  const getRadarChartData = () => {
    if (!player1Stats || !player2Stats) return null;

    return [
      { name: "Runs", player1: player1Stats["Avg. Runs"], player2: player2Stats["Avg. Runs"] },
      { name: "Wickets", player1: player1Stats["Avg. Wickets"], player2: player2Stats["Avg. Wickets"] },
      { name: "Strike Rate", player1: player1Stats["Strike Rate"], player2: player2Stats["Strike Rate"] },
      { name: "Economy", player1: 10 - player1Stats["Economy Rate"], player2: 10 - player2Stats["Economy Rate"] }, // Inverted for better visualization
      { name: "Fantasy", player1: player1Stats["Fantasy Points"], player2: player2Stats["Fantasy Points"] },
    ];
  };

  const radarData = getRadarChartData();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <PlayerSelector 
              teams={IPLTeams} 
              selectedTeam={team1}
              onTeamChange={setTeam1}
              selectedPlayer={player1}
              onPlayerChange={setPlayer1}
              labelPrefix="Player 1"
              isLoading={isLoading1}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <PlayerSelector 
              teams={IPLTeams} 
              selectedTeam={team2}
              onTeamChange={setTeam2}
              selectedPlayer={player2}
              onPlayerChange={setPlayer2}
              labelPrefix="Player 2"
              isLoading={isLoading2}
            />
          </CardContent>
        </Card>
      </div>
      
      <StatsFilter selectedFilter={statsFilter} onFilterChange={setStatsFilter} />
      
      {player1 && player2 && player1Stats && player2Stats && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PlayerStatsHeader
              playerName={player1}
              totalMatches={player1FilteredData.length}
              totalPoints={player1FilteredData.reduce((sum, match) => sum + match.fantasyPoints, 0)}
              avgPoints={player1Stats["Fantasy Points"]}
            />
            
            <PlayerStatsHeader
              playerName={player2}
              totalMatches={player2FilteredData.length}
              totalPoints={player2FilteredData.reduce((sum, match) => sum + match.fantasyPoints, 0)}
              avgPoints={player2Stats["Fantasy Points"]}
            />
          </div>
          
          {radarData && (
            <ComparisonChart
              player1={player1}
              player2={player2}
              chartData={radarData}
            />
          )}
        </>
      )}
    </div>
  );
}
