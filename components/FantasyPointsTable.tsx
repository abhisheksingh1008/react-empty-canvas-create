import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowUp, ArrowDown } from "lucide-react";
import { PerformanceDetailsModal } from "./PerformanceDetailsModal";
import { Match } from "@/data/playerData";

interface FantasyPointsTableProps {
  matches: Match[];
  playerName: string;
  loading?: boolean;
}

type SortField = "date" | "boundaries" | "sixes" | "wickets" | "fantasyPoints";
type SortDirection = "asc" | "desc";

export function FantasyPointsTable({
  matches,
  playerName,
  loading,
}: FantasyPointsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [sortedMatches, setSortedMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 15;

  // Sort matches whenever sort field, direction, or matches change
  useEffect(() => {
    if (!matches || matches.length === 0) return;

    const sorted = [...matches].sort((a, b) => {
      if (sortField === "date") {
        // Convert string dates to Date objects for comparison
        const dateA = new Date(a[sortField]);
        const dateB = new Date(b[sortField]);
        return sortDirection === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      } else {
        // For numeric fields
        return sortDirection === "asc"
          ? a[sortField] - b[sortField]
          : b[sortField] - a[sortField];
      }
    });

    setSortedMatches(sorted);
    setCurrentPage(1); // Reset to first page after sorting
  }, [matches, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // Toggle sort direction if clicking on the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new sort field with default direction
      setSortField(field);
      setSortDirection("desc"); // Default to descending when changing fields
    }
  };

  // Render sort indicator
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;

    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4 ml-1 inline" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-1 inline" />
    );
  };

  const handleRowClick = (match: Match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-40">
          <p className="text-lg text-gray-500">Loading player data...</p>
        </div>
      </Card>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-40">
          <p className="text-lg text-gray-500">No match data available.</p>
        </div>
      </Card>
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(sortedMatches.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMatches = sortedMatches.slice(indexOfFirstItem, indexOfLastItem);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handle page changes
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-cricket-light">
              <TableRow>
                <TableHead
                  className="font-bold cursor-pointer hover:bg-cricket-light/80 h-12 text-muted-foreground"
                  onClick={() => handleSort("date")}
                >
                  Match Date {renderSortIcon("date")}
                </TableHead>
                <TableHead className="font-bold text-muted-foreground">
                  Against
                </TableHead>
                <TableHead className="font-bold text-muted-foreground">
                  Venue
                </TableHead>
                <TableHead
                  className="font-bold cursor-pointer hover:bg-cricket-light/80 text-muted-foreground"
                  onClick={() => handleSort("boundaries")}
                >
                  Boundaries {renderSortIcon("boundaries")}
                </TableHead>
                <TableHead
                  className="font-bold cursor-pointer hover:bg-cricket-light/80 text-muted-foreground"
                  onClick={() => handleSort("sixes")}
                >
                  Sixes {renderSortIcon("sixes")}
                </TableHead>
                <TableHead
                  className="font-bold cursor-pointer hover:bg-cricket-light/80 text-muted-foreground"
                  onClick={() => handleSort("wickets")}
                >
                  Wickets {renderSortIcon("wickets")}
                </TableHead>
                <TableHead
                  className="font-bold text-cricket-primary cursor-pointer hover:bg-cricket-light/80"
                  onClick={() => handleSort("fantasyPoints")}
                >
                  Fantasy Points {renderSortIcon("fantasyPoints")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentMatches.map((match) => (
                <TableRow
                  key={match.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(match)}
                >
                  <TableCell className="p-4">{match.date}</TableCell>
                  <TableCell>{match.againstTeam}</TableCell>
                  <TableCell>{match.venue}</TableCell>
                  <TableCell>{match.boundaries}</TableCell>
                  <TableCell>{match.sixes}</TableCell>
                  <TableCell>{match.wickets}</TableCell>
                  <TableCell className="font-medium text-cricket-primary">
                    {match.fantasyPoints}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {pageNumbers.map((number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  isActive={currentPage === number}
                  onClick={() => handlePageChange(number)}
                  className="cursor-pointer"
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <PerformanceDetailsModal
        match={selectedMatch}
        isOpen={isModalOpen}
        playerName={playerName}
        onClose={handleCloseModal}
      />
    </div>
  );
}
