# Web App HW2

## Setup

### 1. MySQL
Run `backend/database.sql` in MySQL Workbench to create the database and tables.

### 2. Create `backend/.env`
```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=leaderboard_db
```

### 3. Backend
```bash
cd backend
npm install
npm run dev
```

### 4. Frontend
```bash
cd frontend
npm install
npm run dev
```
