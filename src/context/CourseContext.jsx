import axios from "axios";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { server } from "../main";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [myCourses, setMyCourses] = useState([]);
  async function fetchCourses() {
    try {
      const { data } = await axios.get(`${server}/api/course/all`);

      setCourses(data.courses);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchCourses();
    fetchMyCourse();
  }, []);

  async function fetchMyCourse() {
    try {
      const { data } = await axios.get(`${server}/api/mycourses`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setMyCourses(data.courses);

    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCourse(id) {
    try {
      const { data } = await axios.get(`${server}/api/course/${id}`);
      setCourse(data.course);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CourseContext.Provider
      value={{ courses, fetchCourses, fetchCourse, fetchMyCourse, course ,myCourses}}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const courseData = () => useContext(CourseContext);
