require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/db/db');

// Connect Database
connectDB();

// Use dynamic port for deployment
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});