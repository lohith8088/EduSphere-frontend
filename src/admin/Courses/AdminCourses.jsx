import React, { useEffect, useState } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { courseData } from "../../context/CourseContext";
import CourseCard from "../../components/courseCard/CourseCard";
import "./AdminCourses.css";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const Categories = [
  "Programming",
  "Web Development",
  "Data Science",
  "Cybersecurity",
  "Machine Learning",
  "Mobile App Development",
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const { courses, fetchCourses } = courseData();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [createdBY, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const changeImgHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !createdBY ||
      !duration ||
      !image
    ) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("createdBY", createdBY);
    formData.append("duration", duration);
    formData.append("file", image);
    try {
      const { data } = await axios.post(`${server}/api/course/new`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success("Course created successfully!");

      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setCreatedBy("");
      setDuration("");
      setImage("");
      setImagePreview("");

      fetchCourses(); // Refresh courses list
    } catch (error) {
      toast.error("Failed to create course. Please try again.");
      // console.error("Error creating course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="admin-courses-container">
        <div className="courses-section">
          <h1 className="section-title">Manage Courses</h1>
          <div className="courses-grid">
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard key={course._id} course={course} adminView={true} />
              ))
            ) : (
              <div className="empty-state">
                <p>No courses available yet</p>
                <button
                  className="common-btn"
                  onClick={() =>
                    document.querySelector(".course-form").scrollIntoView()
                  }
                >
                  Create Your First Course
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <div className="course-form-card">
            <h2 className="form-title">Add New Course</h2>
            <form onSubmit={submitHandler} className="course-form">
              <div className="form-group">
                <label>Course Title</label>
                <input
                  type="text"
                  placeholder="e.g., Advanced React Development"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="Describe what students will learn..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    placeholder="e.g., 49"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Duration (hours)</label>
                  <input
                    type="number"
                    placeholder="e.g., 10"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  {Categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Instructor</label>
                <input
                  type="text"
                  placeholder="Course creator's name"
                  value={createdBY}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Course Image</label>
                <div className="file-upload">
                  <input
                    type="file"
                    onChange={changeImgHandler}
                    accept="image/*"
                    required
                  />
                  {imagePreview ? (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Course Preview" />
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <span>Click to upload image</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                className="common-btn submit-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Creating...
                  </>
                ) : (
                  "Create Course"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
