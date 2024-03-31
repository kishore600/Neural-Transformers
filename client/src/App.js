import AboutPage from "./components/AboutPage";
import CoursesPage from "./components/CoursesPage";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Login from "./components/Login";
import SpecificCourse from "./components/SpecificCourse.jsx";
import CreateCourse from "./components/CreateCourse.jsx";
import Contact from "./components/Contact";
import Courselist from "./components/Courselist"
import EnrolledCourses from "./components/EnrolledCourses.jsx"
import Userlist from "./components/Userlist";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUsers from "./components/Createusers";
import Products from "./components/Products.jsx";
import Services from "./components/Services.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="h-screen">
      <ToastContainer /> {/* Move ToastContainer outside of the Router */}
      <Router>
        <Nav />
        <Routes>
          <Route path='/about' element={<AboutPage />} />
          <Route path='/product' element={<Products />} />
          <Route path='/services' element={<Services />} />
          <Route path='/courses' element={<CoursesPage />} />
          <Route path='/courselist' element={<Courselist />} />
          <Route path='/enrolled' element={<EnrolledCourses />} />
          <Route path='/create' element={<CreateCourse />} />
          <Route path='/createuser' element={<CreateUsers />} />
          <Route path="/userlist" element={<Userlist />} />
          <Route path='/course/:id' element={<SpecificCourse />} />
          <Route path="/connect" element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
