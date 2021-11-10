import express from "express";
import morgan from "morgan";
import config from "./config";
import cors from "cors";

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

export const start = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};
