// TypeScript interface for the MySQL `leaderboard` table rows
export interface ILeaderboard {
    id: number;
    name: string;
    score: number;
    created_at: Date;
}
