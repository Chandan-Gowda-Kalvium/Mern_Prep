const mongoose = require('mongoose');

const kalviumSchema = new mongoose.Schema({
    course: String,
    courseId: Number,
    cohort: Number,
    college: String,
    semester: Number,
    averageRating: Number,
    studentsVoted: Number
})

const CourseData = mongoose.model('Course',kalviumSchema );

module.exports = CourseData

