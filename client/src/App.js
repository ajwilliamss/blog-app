import { useContext } from "react";
import { UserContext } from "./contexts/UserContext/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import SinglePost from "./pages/SinglePost/SinglePost";
import Create from "./pages/Create/Create";
import User from "./pages/User/User";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import "./App.css";

function App() {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={user ? <Create /> : <Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/user" element={user ? <User /> : <Register />} />
        <Route path="/posts/:postId" element={<SinglePost />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
