import express from "express";
import cors from "cors";
import {} from "dotenv/config";

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(express.json());

app.get("/", cors(corsOptions), (req, res, next) => {
  return res.send(`server on ...`);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on the port ` + PORT);
});
