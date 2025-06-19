import React, { useEffect } from 'react'
import './CourseStudy.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { courseData } from '../../context/CourseContext'
import { server } from '../../main'

const CourseStudy = ({ user }) => {
  const params = useParams()
  const { fetchCourse, course } = courseData()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCourse(params.id)
  }, [params.id])

  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return navigate("/")
  }

  return (
    <div className='course-study-page'>
      {course && (
        <div className="course-study-card">
          <img 
            src={course.image} 
            alt={course.title} 
            className="course-thumbnail"
          />
          <div className="course-details">
            <h3>{course.title}</h3>
            <p className="instructor">By {course.createdBY}</p>
            <p className="duration">⏱️ {course.duration} hours</p>
            <p className="description">{course.description}</p>
            <Link to={`/lectures/${course._id}`} className='common-btn small-btn'>
              Start Learning →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseStudy