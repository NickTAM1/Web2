import express, {type Request, type Response } from "express";
import cors from "cors";

type LeaderboardItem = {
	player: string;
	score: number;
};

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/ping", (req: Request, res: Response) =>{
	res.json({ message: "OK" });
});

// All players data
const allPlayers: LeaderboardItem[] = [
	{ player: "Spencer", score: 9999 },
	{ player: "Nick", score: 8500 },
	{ player: "Spencer1", score: 7200 },
	{ player: "Spencer2", score: 6100 },
	{ player: "Spencer3", score: 5000 },
	{ player: "Raf", score: 4200 },
	{ player: "YE", score: 3500 },
	{ player: "Nick1", score: 2800 },
	{ player: "Nick2", score: 1500 },
	{ player: "Nick3", score: -8000 },
];

// Summary endpoint - returns top 3 players
app.get("/api/leaderboard-summary", (req: Request, res: Response) => {
	const top3 = allPlayers.slice(0, 3);
	res.json(top3);
});

// Full leaderboard endpoint - returns all players
app.get("/api/leaderboard", (req: Request, res: Response) => {
	res.json(allPlayers);
});

app.listen(PORT, () =>{
	console.log(`Backend server is running at http://localhost:3000`)

});