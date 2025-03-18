import express from "express";
import cors from "cors";
import { userRouter } from "./routes/UserRoutes.js";
import { teamRouter } from "./routes/TeamRoutes.js";
import { dashboardRouter } from "./routes/DashboardRoutes.js";

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'https://flexskill.onrender.com',  // Production frontend URL
    'http://localhost:5173',           // Local development URL
    'http://127.0.0.1:5173'           // Alternative local URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/sign", userRouter);
app.use("/team", teamRouter);
app.use("/dash", dashboardRouter);

export default app; 