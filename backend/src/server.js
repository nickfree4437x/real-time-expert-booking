const http = require("http");
const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./config/db");
const setupSocket = require("./sockets/socket");

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.io and save instance on app
const io = setupSocket(server);
app.set("io", io);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});