// Import necessary packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CourseData=require("./modal")
require("dotenv").config();

// Create an Express app
const app = express(
  {cors:{origin:"*",
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true}}
);

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);

// Set up a database connection using Mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo-db connected!");
  })

  app.post("/course", async (req, res) => {
    try {
      // Extract course data from the request body
      const { course, courseId, cohort, colleges, semester, averageRating, studentsVoted } = req.body;
  
      // Create a new course data document
      const courseData = new CourseData({
        course,
        courseId,
        cohort,
        colleges,
        semester,
        averageRating,
        studentsVoted,
      });
  
      // Save the course data to the database
      await courseData.save();
  
      // Send a success response
      res.status(200).send("Course data saved successfully");
    } catch (err) {
      // Send an error response if something went wrong
      res.status(500).send("Error saving Course data: " + err.message);
    }
  });

  app.get("/courses", async (req, res) => {
    const courseData = await CourseData.find()
    res.status(200).send(courseData)
  })

  app.delete("/course/:id", async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: 'No such Course Created'})
    }
  
    const courseData = await CourseData.findOneAndDelete({_id:id})
  
    if(!courseData) {
      return res.status(404).json({error: 'No such Course Created'})
    }
  
    res.status(200).json(courseData)
  })

  app.get("/course/:course", (req, res) => {
    const { course } = req.params;
    console.log(req.params);
    CourseData
      .find({ course })
      .then((data) => res.json(data))
      .catch((err) => console.log(err));
  });

// Start the server
app.listen(4000, () => {
  console.log("Server started on port 4000");
});
