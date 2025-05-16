import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchInputProps {
  onSearch: (playerName: string) => void;
}

function SearchInput({ onSearch }: SearchInputProps) {
  const [playerName, setPlayerName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onSearch(playerName.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <Input
        type="text"
        placeholder="Enter player name (e.g., Virat Kohli)"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" className="bg-[#10b981] hover:bg-[#10b981]/90">
        <Search className="mr-2 h-4 w-4" /> Search
      </Button>
    </form>
  );
}

export default SearchInput;
