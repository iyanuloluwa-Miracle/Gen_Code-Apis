const axios = require("axios");
const cron = require("node-cron");

class KeepAliveService {
  constructor() {
    this.baseUrl = process.env.BASE_URL || "http://localhost:3009/api";
    this.routes = [
      // Authentication Routes
      { path: "/api/login", method: "get" },
      { path: "/api/signup", method: "get" },
      { path: "/api/logout", method: "get" },
      { path: "/api/forgot-password", method: "get" },
      { path: "/api/reset-password", method: "get" },

      // QR Code Routes
      { path: "/api/save-qr-code", method: "get" },
      { path: "/api/qr-codes", method: "get" },

      // User Management Routes
      { path: "/api/users", method: "get" },

      // Contact Routes
      { path: "/api/contact-us", method: "get" },
    ];
  }

  async pingRoutes() {
    for (const route of this.routes) {
      try {
        const fullUrl = `${this.baseUrl}${route.path}`;
        const requestConfig = {
          timeout: 10000,
          headers: {
            "User-Agent": "KeepAlive Service",
          },
        };

        switch (route.method.toLowerCase()) {
          case "get":
            await axios.get(fullUrl, requestConfig);
            break;
          case "post":
            await axios.post(fullUrl, {}, requestConfig);
            break;
        }
      } catch {
        // Silently catch and ignore errors
        continue;
      }
    }
  }

  startKeepAlive() {
    // Run every 10 minutes
    cron.schedule("*/10 * * * *", () => {
      this.pingRoutes();
    });
  }
}

module.exports = new KeepAliveService();
