
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Mock player data by team
const playersByTeam: Record<string, string[]> = {
  "MI": ["Rohit Sharma", "Jasprit Bumrah", "Suryakumar Yadav", "Ishan Kishan"],
  "CSK": ["MS Dhoni", "Ravindra Jadeja", "Ruturaj Gaikwad", "Deepak Chahar"],
  "RCB": ["Virat Kohli", "Glenn Maxwell", "Faf du Plessis", "Mohammed Siraj"],
  "KKR": ["Andre Russell", "Sunil Narine", "Venkatesh Iyer", "Shreyas Iyer"],
  "DC": ["Rishabh Pant", "Axar Patel", "David Warner", "Kuldeep Yadav"],
  "PBKS": ["Shikhar Dhawan", "Liam Livingstone", "Kagiso Rabada", "Arshdeep Singh"],
  "RR": ["Sanju Samson", "Jos Buttler", "Yuzvendra Chahal", "Shimron Hetmyer"],
  "SRH": ["Bhuvneshwar Kumar", "Rahul Tripathi", "Washington Sundar", "Abhishek Sharma"],
  "GT": ["Hardik Pandya", "Rashid Khan", "Shubman Gill", "Mohammed Shami"],
  "LSG": ["KL Rahul", "Quinton de Kock", "Nicholas Pooran", "Avesh Khan"],
};

interface PlayerSelectorProps {
  teams: string[];
  selectedTeam: string;
  onTeamChange: (team: string) => void;
  selectedPlayer: string;
  onPlayerChange: (player: string) => void;
  labelPrefix: string;
  isLoading: boolean;
}

export default function PlayerSelector({
  teams,
  selectedTeam,
  onTeamChange,
  selectedPlayer,
  onPlayerChange,
  labelPrefix,
  isLoading
}: PlayerSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleTeamChange = (value: string) => {
    onTeamChange(value);
    // Clear player when team changes
    onPlayerChange("");
  };

  const filteredPlayers = selectedTeam 
    ? playersByTeam[selectedTeam]?.filter(player => 
        player.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    : [];

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`${labelPrefix}-team`}>{labelPrefix} Team</Label>
        <Select value={selectedTeam} onValueChange={handleTeamChange}>
          <SelectTrigger id={`${labelPrefix}-team`}>
            <SelectValue placeholder="Select a team" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((team) => (
              <SelectItem key={team} value={team}>
                {team}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor={`${labelPrefix}-player-search`}>Search Players</Label>
        <Input
          id={`${labelPrefix}-player-search`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to search players"
          disabled={!selectedTeam || isLoading}
        />
      </div>

      <div>
        <Label htmlFor={`${labelPrefix}-player`}>Select Player</Label>
        <Select 
          value={selectedPlayer} 
          onValueChange={onPlayerChange}
          disabled={!selectedTeam || isLoading}
        >
          <SelectTrigger id={`${labelPrefix}-player`}>
            <SelectValue placeholder={isLoading ? "Loading..." : "Select a player"} />
          </SelectTrigger>
          <SelectContent>
            {filteredPlayers.map((player) => (
              <SelectItem key={player} value={player}>
                {player}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
