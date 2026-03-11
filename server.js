import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/predict", async (req, res) => {
  try {
    const response = await fetch(
      "http://0dd429b2-2d8d-41da-ae59-f7534e7fafd4.francecentral.azurecontainer.io/score",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      },
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri pozivu Azure ML endpointa" });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Proxy server running on http://localhost:${PORT}`),
);
