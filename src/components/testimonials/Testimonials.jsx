import React from 'react'
import "./testimonials.css"

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "Alex Johnson",
      position: "Web Development Student",
      message: "EduSphere transformed my career. The hands-on projects helped me land my first developer job within 3 months!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces"
    },
    {
      id: 2,
      name: "Priya Patel",
      position: "Data Science Learner",
      message: "The quality of courses exceeded my expectations. I went from beginner to building ML models in just 6 weeks.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces"
    },
    {
      id: 3,
      name: "Marcus Chen",
      position: "UX Design Student",
      message: "The mentor support was incredible. I got personalized feedback that improved my design skills dramatically.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=faces"
    },
    {
      id: 4,
      name: "Sarah Williams",
      position: "Digital Marketing Student",
      message: "The practical assignments mirrored real-world challenges. I applied what I learned immediately at work.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces"
    },
    {
  id: 5,
  name: "James Carter",
  position: "Full Stack Developer",
  message: "This platform helped me transition into tech. The course structure and mentorship were top-notch.",
  image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
},
{
  id: 6,
  name: "Aisha Khan",
  position: "UX/UI Design Enthusiast",
  message: "I loved the hands-on projects! The visual design tutorials were easy to follow and super engaging.",
  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
},
{
  id: 7,
  name: "Carlos Ramirez",
  position: "Data Analyst",
  message: "The data science track sharpened my skills fast. I'm now more confident handling real datasets at work.",
  image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
}

    
  ];

  return (
    <section className="testimonials">
      <h2>Success Stories from Our Learners</h2>
      <div className="testimonials-cards">
        {testimonialsData.map((e) => (
          <div className="testimonial-card" key={e.id}>
            <div className="student-image">
              <img src={e.image} alt={e.name} />
            </div>
            <p className="message">"{e.message}"</p>
            <div className="info">
              <p className="name">{e.name}</p>
              <p className="position">{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials