require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

/* ---------- Middlewares ---------- */
app.use(cors());
app.use(express.json());

/* ---------- MongoDB Connection ---------- */
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.6clk9e4.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let resultCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("results");
    resultCollection = db.collection("result");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed", error);
  }
}

connectDB();

/* ---------- Routes ---------- */
app.get("/", (req, res) => {
  res.send("Result Portal Backend is running");
});

/* ---------- RESULT FETCH API ---------- */
app.get("/api/v1/results/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    const result = await resultCollection.findOne({
      studentId,
      published: true,
    });

    if (!result) {
      return res.status(404).json({
        message: "Result not found",
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching result:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

/* ---------- Server ---------- */
app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});
