import React from 'react'
import {useNavigate} from 'react-router-dom'
import './home.css'
import Testimonials from '../../components/testimonials/Testimonials'

const Home = () => {
  const navigate = useNavigate()
  return (<>
    <div className="home">
      <div className="home-content">
        <h1>
          Unlock Your Potential with EduSphere
        </h1>
        <p>Master new skills with expert-led courses tailored for your success</p>
        <button onClick={() => navigate("/courses")} className='common-btn'>
          Explore Courses
        </button>
      </div>
    </div>
    <Testimonials/>
    </>
  )
}

export default Home