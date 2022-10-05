//use of express and mongoose for the app
const express = require("express");
const app = express();

// dotenv.config put environment variables inside a file
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Route
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

// multer is used for uploading files
const multer = require("multer");
const path = require("path");


// dotenv.config put environment variables inside a file
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

//connect to mongoose - MONGO_URL is a variable from .env
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true, //fix all deprecation warnings
    useUnifiedTopology: true, //fix all deprecation warnings
    useCreateIndex: true, //fix all deprecation warnings
    useFindAndModify: false, //fix all deprecation warnings
  }).then(
      console.log("Connected to MongoDB")
    ).catch(
      (err) => console.log(err)
    );

const storage = multer.diskStorage({ // folder to which the file has been saved
  destination: (req, file, cb) => { //destination 
    cb(null, "images"); //call back function - error = null - destination = images
  },
  filename: (req, file, cb) => { //name 
    cb(null, req.body.name);
  },
});

//upload the file
const upload = multer({ storage: storage });

//POST to upload the file
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//Route
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

//app.listen() function is used to bind and listen the connections on the specified host and port
app.listen("5000", () => {
  console.log("Backend is running.");
});
