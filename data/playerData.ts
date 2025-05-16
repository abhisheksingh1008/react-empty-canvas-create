export interface Match {
  id: string;
  date: string;
  againstTeam: string;
  venue: string;
  homeOrAway: string;
  innings: string;
  battingPosition: number;
  matchStage: string;
  boundaries: number;
  sixes: number;
  wickets: number;
  fantasyPoints: number;
  Avg_fp_last_5: number;
  isImpactPlayer: boolean;
  is_wk: boolean;
  result: string;
  mom_indicator: number;
  runs_scored: number;
  balls_faced: number;
  no_of_sixes_hitted: number;
  no_of_fours: number;
  strike_rate: number;
  number_of_over_bowled: number;
  number_of_wicket_taken: number;
  maiden_over: number;
  number_of_dot_ball: number;
  runs_given_in_bowling: number;
  economy_rate: number;
  number_of_catches: number;
  Overall_Avg_runs: number;
  Venue_Avg_fantasy_points: number;
  Venue_Avg_runs_scored: number;
  Venue_Avg_number_of_wicket_taken: number;
  Venue_Avg_strike_rate: number;
  Venue_Avg_economy_rate: number;
  Career_Avg_wickets: number;
  Career_Avg_econ: number;
  Avg_run_last_5: number;
  Avg_ball_faced_last_5: number;
  Avg_str_last_5: number;
}

// IPL Teams
const iplTeams = [
  "Mumbai Indians",
  "Chennai Super Kings",
  "Royal Challengers Bangalore",
  "Kolkata Knight Riders",
  "Delhi Capitals",
  "Punjab Kings",
  "Rajasthan Royals",
  "Sunrisers Hyderabad",
  "Gujarat Titans",
  "Lucknow Super Giants",
];

// IPL Venues
const iplVenues = [
  "Wankhede Stadium, Mumbai",
  "M. A. Chidambaram Stadium, Chennai",
  "M. Chinnaswamy Stadium, Bangalore",
  "Eden Gardens, Kolkata",
  "Arun Jaitley Stadium, Delhi",
  "Punjab Cricket Association Stadium, Mohali",
  "Sawai Mansingh Stadium, Jaipur",
  "Rajiv Gandhi International Cricket Stadium, Hyderabad",
  "Narendra Modi Stadium, Ahmedabad",
  "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium, Lucknow",
];

// Generate results with more details
function generateMatchResult(teamName: string): string {
  const winningTeam =
    Math.random() > 0.5
      ? teamName
      : iplTeams[Math.floor(Math.random() * iplTeams.length)];

  // Generate different types of cricket results
  const resultTypes = [
    `${winningTeam} Won by ${Math.floor(Math.random() * 120) + 1} runs`,
    `${winningTeam} Won by ${Math.floor(Math.random() * 9) + 1} wickets`,
    `${winningTeam} Won by DLS method`,
    `Match Tied, ${winningTeam} Won in Super Over`,
  ];

  return resultTypes[Math.floor(Math.random() * resultTypes.length)];
}

// Generate random match data for a player
function generateRandomMatches(count: number): Match[] {
  const matches: Match[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const randomDate = new Date(
      today.getFullYear() - Math.floor(Math.random() * 3), // Last 3 years
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    );

    const boundaries = Math.floor(Math.random() * 12);
    const sixes = Math.floor(Math.random() * 8);
    const wickets = Math.floor(Math.random() * 4);

    // Calculate fantasy points
    // 1 point per boundary, 2 points per six, 25 points per wicket
    const fantasyPoints = boundaries + 2 * sixes + 25 * wickets;

    const againstTeam = iplTeams[Math.floor(Math.random() * iplTeams.length)];
    const venue = iplVenues[Math.floor(Math.random() * iplVenues.length)];
    const homeOrAway = ["home", "away", "neutral"][
      Math.floor(Math.random() * 3)
    ];
    const innings = Math.random() > 0.5 ? "1" : "2";
    const battingPosition = Math.floor(Math.random() * 7) + 1; // 1-7
    const matchStage = Math.random() > 0.8 ? "playoffs" : "league";

    // New fields with random values
    const runs_scored = Math.floor(Math.random() * 80);
    const balls_faced = runs_scored + Math.floor(Math.random() * 20);
    const strike_rate = balls_faced > 0 ? (runs_scored / balls_faced) * 100 : 0;
    const number_of_over_bowled = Math.floor(Math.random() * 4);
    const runs_given_in_bowling = Math.floor(Math.random() * 40);
    const economy_rate =
      number_of_over_bowled > 0
        ? runs_given_in_bowling / number_of_over_bowled
        : 0;

    matches.push({
      id: `match-${i}`,
      date: randomDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      againstTeam,
      venue,
      homeOrAway,
      innings,
      battingPosition,
      matchStage,
      boundaries,
      sixes,
      wickets,
      fantasyPoints,
      Avg_fp_last_5: Math.floor(Math.random() * 50),
      result: generateMatchResult(againstTeam),
      isImpactPlayer: Math.random() > 0.85,
      is_wk: Math.random() > 0.85,
      mom_indicator: Math.random() > 0.9 ? 1 : 0,
      runs_scored,
      balls_faced,
      no_of_sixes_hitted: sixes, // Match with previous field
      no_of_fours: boundaries, // Match with previous field
      number_of_over_bowled,
      number_of_wicket_taken: wickets, // Match with previous field
      maiden_over: Math.floor(Math.random() * 2),
      number_of_dot_ball: Math.floor(Math.random() * 15),
      runs_given_in_bowling,
      number_of_catches: Math.floor(Math.random() * 3),
      strike_rate,
      economy_rate,
      Overall_Avg_runs: 25 + Math.floor(Math.random() * 20),
      Venue_Avg_fantasy_points: 30 + Math.floor(Math.random() * 25),
      Venue_Avg_runs_scored: 30 + Math.floor(Math.random() * 20),
      Venue_Avg_number_of_wicket_taken: Math.random() * 2,
      Venue_Avg_strike_rate: 100 + Math.floor(Math.random() * 50),
      Venue_Avg_economy_rate: 6 + Math.random() * 3,
      Career_Avg_wickets: Math.random() * 2,
      Career_Avg_econ: 6 + Math.random() * 3,
      Avg_run_last_5: 20 + Math.floor(Math.random() * 30),
      Avg_ball_faced_last_5: 15 + Math.floor(Math.random() * 20),
      Avg_str_last_5: 100 + Math.floor(Math.random() * 60),
    });
  }

  // Sort matches by date (newest first)
  return matches.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Player database (mock)
const playerDatabase: Record<string, Match[]> = {
  "Virat Kohli": generateRandomMatches(200),
  "MS Dhoni": generateRandomMatches(190),
  "Rohit Sharma": generateRandomMatches(245),
  "Jasprit Bumrah": generateRandomMatches(135),
  "Ravindra Jadeja": generateRandomMatches(188),
  "KL Rahul": generateRandomMatches(142),
  "Hardik Pandya": generateRandomMatches(160),
};

// Fetch player data - simulated API delay
export const fetchPlayerData = (playerName: string): Promise<Match[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Case-insensitive search, partial match
      const matchedPlayer = Object.keys(playerDatabase).find((name) =>
        name.toLowerCase().includes(playerName.toLowerCase())
      );

      if (matchedPlayer) {
        resolve([...playerDatabase[matchedPlayer]]); // Return a copy to avoid mutation
      } else {
        // If player not in database, generate random data
        resolve(generateRandomMatches(216));
      }
    }, 800); // Simulate network delay
  });
};
