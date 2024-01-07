const express = require("express");
const dbConnection = require("./DBconfig/dbConnection");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`listening to port ${port}...`);
});

dbConnection();

app.use("/blog-api", require("./routes/userRoute"));

app.use("/blog-api/blogs", require("./routes/blogRoute"));

app.use("/user", require("./routes/likeRoute"));

app.use("/user", require("./routes/commentsRoute"));
