import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

const ENDPOINT =
  "http://0dd429b2-2d8d-41da-ae59-f7534e7fafd4.francecentral.azurecontainer.io/score";

app.post("/predict", async (req, res) => {
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Prediction error");
  }
});

app.get("/test", (req, res) => {
  res.send("Hello, server is working!");
});

/* SERVE REACT */
app.use(express.static(path.join(__dirname, "./client/dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

console.log("PORT:", process.env.PORT);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
