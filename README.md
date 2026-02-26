Web App HW2

A school leaderboard app. MySQL holds scores, MongoDB holds student and contact info.

Setup

1. MySQL
Open MySQL Workbench, copy everything from `backend/database.sql` and run it.

2. Create `backend/.env`

```bash
MONGODB_URI=mongodb+srv://spencer:spencer@spencer.jw3h8fw.mongodb.net/leaderboardUsers?appName=Spencer
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=spencer
DB_DATABASE=leaderboard_db
```

3. Backend

```bash
cd backend
npm install
npm run dev
```

4. Frontend

```bash
cd frontend
npm install
npm run dev
```

5. Login

```bash
Last name: Root
Email: test.root@gmail.com
```

6. Contact

Fill in name, email, and a message then hit Send.

7. Github

Link: https://github.com/NickTAM1/Web2.git

Endpoints

GET /api/leaderboard — get all scores from MySQL
POST /api/leaderboard — add a score ({ name, score })
POST /api/contact — save a contact message to MongoDB
GET /api/login — find a student by email/lastName (?email=...&lastName=...)
GET /api/leaderboard-summary — get top 3 scores (used on the home page)

Pinia Stores

student — saves who is logged in (name, email). Used in the navbar and contact form.
leaderboard — saves the score list. Used on the leaderboard page and home page widget.
counter — saves a visit count. Shown on the home page.

Pages

/ — Home. Shows a counter and top 3 scores.
/login — Log in with last name and email.
/leaderboard — Full score table. Click headers to sort.
/contact — Send a message. Fields auto-fill if you are logged in.
/about — About page.

Known Limitations

- Refreshing the page logs you out (no persistent session).
- All pages are visible to everyone (no access control).
- You can not submit your own score from the UI.
