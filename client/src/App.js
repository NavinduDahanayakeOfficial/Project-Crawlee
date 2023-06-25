import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Messages from "./pages/Messages";
import SiteHome from "./pages/SiteHome";
import CreateCourse from "./pages/CreateCourse";
import Home from "./pages/Home";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import AdminUserManagement from "./pages/Admin/AdminUserManagement";
import AdminCourseManagement from "./pages/Admin/AdminCourseManagement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import TermsAndCond from "./pages/Authentication/TermsAndCond";
import ForgetPassword from "./pages/Authentication/ForgetPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";

import SingleCourse from "./pages/SingleCourse";
import CourseEdit from "./pages/CourseEdit";
import StudentProfile from "./pages/StudentProfile";
import AllCourses from "./pages/AllCourses";
import Request from "./pages/Request";
import Certificate from "./components/Certificate/Certificate";

axios.defaults.withCredentials = true;

function App() {
  

  return (
    <div className="App">
      <Router>
      <ToastContainer />
        
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<SingleCourse />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/home" element={<SiteHome />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/course-edit/:courseId" element={<CourseEdit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/forgetPassword" element={<ForgetPassword />} />
          <Route
            path="/resetpassword/:resetToken"
            element={<ResetPassword />}
          />

          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/termsandconditions" element={<TermsAndCond />} />
          <Route path="/userManagement" element={<AdminUserManagement />} />
          <Route path="/courseManagement" element={<AdminCourseManagement />} />
          <Route path="/profile" element={<StudentProfile/>} />
          <Route path="/all-courses" element={<AllCourses/>} />
          <Route path="/requests" element={<Request/>} />
          <Route path="/certificate" element={<Certificate/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
