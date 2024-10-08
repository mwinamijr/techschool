import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import LoginScreen from "./screens/LoginScreen";
import RegisterStudentScreen from "./screens/RegisterStudentScreen";
import RegisterTeacherScreen from "./screens/RegisterTeacherScreen";
import UserListScreen from "./screens/userListScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column" style={{ height: "100vh" }}>
        {/* Navbar */}

        <Header />
        {/* Main Layout */}
        <div className="d-flex" style={{ flexGrow: 1 }}>
          <Sidebar />
          <div className="content p-4" style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<h1>Home Page</h1>} />
              <Route path="/dashboard" element={<h1>Dashboard Page</h1>} />
              <Route
                path="/products/action"
                element={<h1>Action Product Page</h1>}
              />
              <Route
                path="/products/another-action"
                element={<h1>Another Action Product Page</h1>}
              />
              <Route path="/orders" element={<h1>Orders Page</h1>} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route
                path="/register-student"
                element={<RegisterStudentScreen />}
              />
              <Route
                path="/register-teacher"
                element={<RegisterTeacherScreen />}
              />

              <Route path="/admin/user-list" element={<UserListScreen />} />
            </Routes>
          </div>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
