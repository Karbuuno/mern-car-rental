import path from "path";
import express from "express";
const port = process.env.PORT || 5000;
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.listen(port, () => console.log(`Server started on port ${port}`));
