const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/errorHandler");
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const keepAliveService = require("./utils/keepAlive");







const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
keepAliveService.startKeepAlive();

app.get('/', async (req, res, next) => {
  res.send({ message: 'Welcome to GEN_CODE api 🐱‍🚀' });
});

app.use('/api', require('./routes/api.route'));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// Middleware to generate 404 error for undefined routes
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
