# Backend Project (Node + Express + MongoDB)

A minimal, production-ready REST API boilerplate using Node.js, Express, and MongoDB (via Mongoose). Includes a sample `Item` resource with full CRUD, ready to deploy on [Render](https://render.com).

## Project Structure

```
backend-project/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   └── itemController.js  # CRUD logic (JSON API + EJS view handlers)
├── middleware/
│   └── errorHandler.js    # Centralized error handling
├── models/
│   └── Item.js             # Mongoose schema
├── routes/
│   ├── itemRoutes.js       # JSON API routes
│   └── viewRoutes.js       # EJS page routes
├── views/
│   ├── index.ejs            # List + add items
│   └── edit.ejs              # Edit item form
├── public/
│   └── style.css            # Basic styling for the UI
├── .env.example
├── .gitignore
├── package.json
└── server.js               # App entry point
```

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

3. Run in development (auto-restart on changes):
   ```bash
   npm run dev
   ```

4. Run in production mode:
   ```bash
   npm start
   ```

The server runs on `http://localhost:5000` by default. Visit `http://localhost:5000` in your browser to use the EJS UI (list, add, edit, delete items).

## Web UI (EJS)

Alongside the JSON API, this project includes a simple server-rendered UI built with EJS:

| Method | Page                     | Description             |
|--------|--------------------------|--------------------------|
| GET    | `/`                      | List all items, add form |
| POST   | `/items`                 | Create item (from form) |
| GET    | `/items/:id/edit`        | Edit form for an item    |
| PUT    | `/items/:id`             | Update item (via `method-override`) |
| DELETE | `/items/:id`             | Delete item (via `method-override`) |

Since HTML forms can only send GET/POST natively, the `method-override` package lets the edit/delete forms send PUT/DELETE requests using a `?_method=` query param — this is standard practice for EJS + Express CRUD apps.

## API Endpoints (JSON)

| Method | Endpoint          | Description       |
|--------|-------------------|--------------------|
| GET    | `/health`         | Health check       |
| GET    | `/api/items`      | Get all items      |
| GET    | `/api/items/:id`  | Get single item    |
| POST   | `/api/items`      | Create item        |
| PUT    | `/api/items/:id`  | Update item        |
| DELETE | `/api/items/:id`  | Delete item        |

## Deploying to Render

### 1. Push this project to GitHub
Render deploys directly from a Git repository, so push this folder to a new GitHub repo.

### 2. Set up MongoDB
Use [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier works fine) to create a cluster and get your connection string. Make sure to whitelist all IPs (`0.0.0.0/0`) in Atlas Network Access, since Render's outbound IPs are dynamic on free/standard plans.

### 3. Create a Web Service on Render
1. Go to the Render Dashboard → **New** → **Web Service**.
2. Connect your GitHub repo.
3. Configure the service:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free or paid, your choice.

### 4. Add Environment Variables
In the Render dashboard, under your service → **Environment**, add:
- `MONGO_URI` — your MongoDB Atlas connection string
- `PORT` — Render sets this automatically, but the app already falls back to `process.env.PORT`, so no action needed.

### 5. Deploy
Click **Create Web Service**. Render will install dependencies and start the server. Once deployed, you'll get a public URL like:
```
https://your-service-name.onrender.com
```

Test it by visiting `https://your-service-name.onrender.com/health`.

## Notes
- There's no real "build" step for a plain Node/Express app — Render just runs `npm install` then `npm start`. The `build` script in `package.json` is a no-op placeholder in case you later add a compile step (e.g., TypeScript).
- `helmet` and `cors` are included for basic security and cross-origin support out of the box.
- Free-tier Render web services spin down after inactivity and take a few seconds to spin back up on the next request — expected behavior, not a bug.
