"use client";

import { useState } from "react";
import { toast } from "sonner";
import SearchInput from "@/components/SearchInput";
import { FantasyPointsTable } from "@/components/FantasyPointsTable";
import {
  MatchFilters,
  FilterOptions,
} from "@/components/FantasyExplorerFilters";
import PlayerStatsHeader from "@/components/PlayerStatsHeader";
import NoPlayerSelected from "@/components/NoPlayerSelected";
import { fetchPlayerData, Match } from "@/data/playerData";
import PlayerPerformanceChart from "@/components/PlayerPerformanceChart";

const FantasyExplorer = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);

  const handleSearch = async (name: string) => {
    if (!name.trim()) return;

    setLoading(true);
    setPlayerName(name);

    try {
      const data = await fetchPlayerData(name);
      setMatches(data);
      setFilteredMatches(data);
      toast.success(`Found ${data.length} matches for ${name}`);
    } catch (error) {
      console.error("Error fetching player data:", error);
      toast.error("Failed to fetch player data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (filters: FilterOptions) => {
    let filtered = [...matches];

    // Apply filters
    if (filters.homeOrAway !== "all") {
      filtered = filtered.filter(
        (match) => match.homeOrAway === filters.homeOrAway
      );
    }

    if (filters.againstTeam !== "all") {
      filtered = filtered.filter(
        (match) => match.againstTeam === filters.againstTeam
      );
    }

    if (filters.venue !== "all") {
      filtered = filtered.filter((match) => match.venue === filters.venue);
    }

    if (filters.innings !== "all") {
      filtered = filtered.filter((match) => match.innings === filters.innings);
    }

    if (filters.battingOrder !== "all") {
      filtered = filtered.filter(
        (match) => match.battingPosition.toString() === filters.battingOrder
      );
    }

    if (filters.matchStage !== "all") {
      filtered = filtered.filter(
        (match) => match.matchStage === filters.matchStage
      );
    }

    // Apply new result filter
    if (filters.result !== "all") {
      filtered = filtered.filter((match) => {
        if (match.result.toLowerCase().includes("won")) {
          return true;
        }
        if (
          filters.result === "loss" &&
          !match.result.toLowerCase().includes("won") &&
          !match.result.toLowerCase().includes("tied")
        ) {
          return true;
        }
        if (match.result.toLowerCase().includes("tied")) {
          return true;
        }
        return false;
      });
    }

    // Apply MOTM filter
    if (filters.motm) {
      filtered = filtered.filter((match) => match.mom_indicator === 1);
    }

    setFilteredMatches(filtered);
  };

  // Calculate stats
  const totalMatches = filteredMatches.length;
  const totalPoints = filteredMatches.reduce(
    (sum, match) => sum + match.fantasyPoints,
    0
  );
  const avgPoints = totalMatches > 0 ? totalPoints / totalMatches : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-cricket-primary text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Fantasy Cricket Point Vista</h1>
          <p className="mt-2 text-white/80">
            Analyze player fantasy performance over the last three years
          </p>
        </div>
      </header>

      <main className="container px-4 mx-auto py-8 space-y-6">
        <section className="flex justify-center">
          <SearchInput onSearch={handleSearch} />
        </section>
        {loading ? (
          <div className="py-12 flex justify-center">
            <div className="animate-pulse flex space-x-4">
              <div className="h-12 w-12 rounded-full bg-cricket-primary"></div>
              <div className="space-y-2">
                <div className="h-4 w-28 bg-cricket-primary rounded"></div>
                <div className="h-4 w-48 bg-cricket-primary/60 rounded"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {playerName && matches.length > 0 ? (
              <>
                <PlayerStatsHeader
                  playerName={playerName}
                  totalMatches={totalMatches}
                  totalPoints={totalPoints}
                  avgPoints={avgPoints}
                />

                <MatchFilters
                  playerData={matches}
                  onApplyFilters={applyFilters}
                />

                <PlayerPerformanceChart
                  matchData={filteredMatches.map((m) => ({
                    id: m.id,
                    date: m.date,
                    fantasyPoints: m.fantasyPoints,
                    Avg_fp_last_5: m.Avg_fp_last_5,
                  }))}
                  playerName={playerName}
                />

                <FantasyPointsTable
                  matches={filteredMatches}
                  playerName={playerName}
                />
              </>
            ) : (
              <NoPlayerSelected />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default FantasyExplorer;
