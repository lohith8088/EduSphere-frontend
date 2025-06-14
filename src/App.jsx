import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Register from "./pages/Auth/Register";
import Verify from "./pages/Auth/Verify";
import Login from "./pages/Auth/Login";
import Footer from "./components/footer/Footer";
import About from "./pages/about/About";
import { createContext, useContext } from "react";

import Account from "./pages/account/Account";
import { UserData } from "./context/UserContext";
import Loading from "./components/loading/Loading";
import Courses from "./pages/courses/Courses.jsx";
import CourseDesc from "./pages/Coursedescription/CourseDesc.jsx";
import PaymentSuc from "./pages/Paymentsucess/PaymentSuc.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import CourseStudy from "./pages/courseStudy/CourseStudy.jsx";
import Lecture from "./pages/lecture/Lecture.jsx";
import AdminDB from "./admin/Dashboard/AdminDB.jsx";
import AdminCourses from "./admin/Courses/AdminCourses.jsx";
import AdminUsers from "./admin/Users/AdminUsers.jsx";

const App = () => {
  const { isAuth, user, loading } = UserData();

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Login />}
            />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
            <Route
              path="/course/:id"
              element={isAuth ? <CourseDesc user={user} /> : <Login />}
            />
            <Route
              path="/payment-success/:id"
              element={isAuth ? <PaymentSuc user={user} /> : <Login />}
            />
            <Route
              path="/:id/dashboard"
              element={isAuth ? <Dashboard user={user} /> : <Login />}
            />
            <Route
              path="/course/study/:id"
              element={isAuth ? <CourseStudy user={user} /> : <Login />}
            />
            <Route
              path="/lectures/:id"
              element={isAuth ? <Lecture user={user} /> : <Login />}
            />
            <Route
              path="/admin/dashboard"
              element={isAuth ? <AdminDB user={user} /> : <Login />}
            />
            <Route
              path="/admin/course"
              element={isAuth ? <AdminCourses user={user} /> : <Login />}
            />
            <Route
              path="/admin/users"
              element={isAuth ? <AdminUsers user={user} /> : <Login />}
            />
          </Routes>

          <Footer />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
