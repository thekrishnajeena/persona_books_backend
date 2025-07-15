const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => res.send("📚 Persona Book API is live"));

app.get("/books", (req, res) => {
  const books = JSON.parse(fs.readFileSync("books.json", "utf-8"));
  const fullUrl = req.protocol + "://" + req.get("host");
  res.json(
    books.map(book => ({
      ...book,
      file_url: fullUrl + book.file_url
    }))
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
