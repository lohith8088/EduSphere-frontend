import React from 'react'
import "./courses.css"
import {courseData} from "../../context/CourseContext.jsx"
import CourseCard from '../../components/courseCard/CourseCard.jsx'

const Courses = () => {
  const {courses}=courseData()
  console.log(courses);
  return (
    <>
    <div className="courses">
      <h2>Available Courses</h2>
      <div className="course-container">
        {
          courses && courses.length >0 ? courses.map((e)=>(
            <CourseCard key={e._id} course={e}></CourseCard>

          )) :<p>No courses Yet !</p>
        }
      </div>
    </div>
    </>
  )
}

export default Courses
