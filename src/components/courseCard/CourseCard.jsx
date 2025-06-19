import React from "react";
import "./coursecard.css";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { courseData } from "../../context/CourseContext";
import  axios from "axios";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = courseData();
  const deleteHandler = async (id) => {
    if(confirm("Are you sure you want to delete this course? ")){
      try {
      const { data } = await axios.delete(
       `${server}/api/course/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      fetchCourses();
    } catch (error) {
       console.error(error);
      toast.error(error?.response?.data?.message || "Failed to delete course");
    }
    }
  };

  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} />
      <div className="course-details">
        <h3>{course.title}</h3>
        <p className="instructor">Instructor: {course.createdBY}</p>
        <p className="duration">Duration: {course.duration} Hrs </p>
        <p className="price">Price: ₹{course.price}</p>
        {isAuth ? (
          <>
            {user && user.role !== "admin" ? (
              <>
                {user.subscription.includes(course._id) ? (
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="common-btn"
                  >
                    study
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="common-btn"
                  >
                    Enroll
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="common-btn"
              >
                Study
              </button>
            )}
          </>
        ) : (
          <button onClick={() => navigate("/login")} className="common-btn">
            login to enroll
          </button>
        )}
        {user && user.role === "admin" && (
          <button
            onClick={() => deleteHandler(course._id)}
            className="common-btn"
            style={{ background: "red" }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
