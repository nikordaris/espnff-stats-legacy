// set NFL team names by ID
export const nflTeams = {
  "22": "Arizona Cardinals",
  "1": "Atlanta Falcons",
  "33": "Baltimore Ravens",
  "2": "Buffalo Bills",
  "29": "Carolina Panthers",
  "3": "Chicago Bears",
  "4": "Cincinnati Bengals",
  "5": "Cleveland Browns",
  "6": "Dallas Cowboys",
  "7": "Denver Broncos",
  "8": "Detroit Lions",
  "9": "Green Bay Packers",
  "34": "Houston Texans",
  "11": "Indianapolis Colts",
  "30": "Jacksonville Jaguars",
  "12": "Kansas City Chiefs",
  "24": "Los Angeles Chargers",
  "14": "Los Angeles Rams",
  "15": "Miami Dolphins",
  "16": "Minnesota Vikings",
  "17": "New England Patriots",
  "18": "New Orleans Saints",
  "19": "New York Giants",
  "20": "New York Jets",
  "13": "Oakland Raiders",
  "21": "Philadelphia Eagles",
  "23": "Pittsburgh Steelers",
  "25": "San Francisco 49ers",
  "26": "Seattle Seahawks",
  "27": "Tampa Bay Buccaneers",
  "10": "Tennessee Titans",
  "28": "Washington Redskins",
  "-1": "Bye"
};

export const nflTeamsAbbrev = {
  "22": "Ari",
  "1": "Atl",
  "33": "Bal",
  "2": "Buf",
  "29": "Car",
  "3": "Chi",
  "4": "Cin",
  "5": "Cle",
  "6": "Dal",
  "7": "Den",
  "8": "Det",
  "9": "GB",
  "34": "Hou",
  "11": "Ind",
  "30": "Jax",
  "12": "KC",
  "24": "LAC",
  "14": "LAR",
  "15": "Mia",
  "16": "Min",
  "17": "NE",
  "18": "NO",
  "19": "NYG",
  "20": "NYJ",
  "13": "Oak",
  "21": "Phi",
  "23": "Pit",
  "25": "SF",
  "26": "Sea",
  "27": "TB",
  "10": "Ten",
  "28": "Wsh",
  "-1": "Bye"
};

// set player positions
export const playerPositions = {
  "0, 20": "QB",
  "2, 23, 20": "RB",
  "2, 3, 20": "RB",
  "4, 23, 20": "WR",
  "3, 4, 20": "WR",
  "6, 23, 20": "TE",
  "6, 20": "TE",
  "16, 20": "Def",
  "17, 20": "K"
};

// set lineup positions
export const lineupPositions = {
  "0": "QB",
  "2": "RB",
  "3": "RB/WR",
  "4": "WR",
  "6": "TE",
  "16": "Def",
  "17": "K",
  "20": "Bench",
  "23": "Flex"
};

export const streakType = {
  "1": "W",
  "2": "L"
};

export const boxscoreUrl = (leagueId, teamId, scoringPeriodId, season) =>
  `http://games.espn.com/ffl/api/v2/boxscore?leagueId=${leagueId}&teamId=${teamId}&scoringPeriodId=${scoringPeriodId}&seasonId=${season}`;

export const standingsUrl = (leagueId, season) =>
  `http://games.espn.com/ffl/api/v2/standings?leagueId=${leagueId}&seasonId=${season}`;
