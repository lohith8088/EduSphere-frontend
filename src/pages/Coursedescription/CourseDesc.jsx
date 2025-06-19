import React, { useEffect, useState } from "react";
import "./CourseDesc.css";
import { useNavigate, useParams } from "react-router-dom";
import { courseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";

const CourseDesc = ({ user }) => {
  const params = useParams();
  const { fetchCourses, fetchCourse, fetchMyCourse, course } = courseData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { fetchUser } = UserData();

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id]);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    const {
      data: { order },
    } = await axios.post(
      `${server}/api/course/checkout/${params.id}`,
      {},
      {
        headers: {
          token,
        },
      }
    );
    const options = {
      key: "rzp_test_6adxtJhl6MnEYD",
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "EduSphere", //your business name
      description: "Learn with us",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the previous step
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        try {
          const { data } = await axios.post(
            `${server}/api/verification/${params.id}`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            },
            {
              headers: {
                token,
              },
            }
          );
          await fetchUser(params.id);
          await fetchCourses();
          await fetchMyCourse();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      theme: {
        color: "#E0F7FA", // Customize the theme color
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="course-desc">
          {course ? (
            <>
              <div className="course-header">
                <img
                  src={course.image}
                  className="Course-img"
                  alt={course.title || "Course"}
                />

                <div className="course-info">
                  <h2>Master {course.title} - Comprehensive Learning</h2>
                  <p>Taught by: {course.createdBY || "Industry Expert"}</p>
                  <p>
                    Course Duration: {course.duration} hours of expert-led
                    content
                  </p>
                  <p className="price-highlight">
                    Start your journey for just ₹{course.price}
                  </p>
                </div>

                {user && user.subscription.includes(course._id) ? (
                  <button
                    className="common-btn"
                    onClick={() => navigate(`/course/study/${course._id}`)}
                  >
                    Continue Learning
                  </button>
                ) : (
                  <button className="common-btn" onClick={checkoutHandler}>
                    Enroll Now - Limited Seats!
                  </button>
                )}
              </div>
            </>
          ) : (
            <p className="loading-text">Loading course details...</p>
          )}
        </div>
      )}
    </>
  );
};

export default CourseDesc;
