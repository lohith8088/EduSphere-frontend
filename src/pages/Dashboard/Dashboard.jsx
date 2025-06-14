import React from 'react'
import './dashboard.css'
import { courseData } from '../../context/CourseContext'
import CourseCard from '../../components/courseCard/CourseCard'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { myCourses } = courseData()

  return (
    <div className="student-dashBoard">
      <div className="dashboard-header">
        <h2>My Learning Dashboard</h2>
        <p>Continue your learning journey</p>
      </div>
      <div className="dashboard-Content">
        {myCourses && myCourses.length > 0 ? (
          myCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <div className="empty-state">
            <p>You haven't enrolled in any courses yet.</p>
            <Link to="/courses" className="common-btn">
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard