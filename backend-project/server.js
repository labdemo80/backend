require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const methodOverride = require('method-override');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const itemRoutes = require('./routes/itemRoutes');
const viewRoutes = require('./routes/viewRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing HTML form submissions
app.use(methodOverride('_method')); // allows forms to send PUT/DELETE via ?_method=
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// Health check route (useful for Render)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// EJS UI routes
app.use('/', viewRoutes);

// JSON API routes
app.use('/api/items', itemRoutes);

// Error handler (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
