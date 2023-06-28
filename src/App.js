import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import CreateStaff from "./pages/CreateStaff";
import UpdateStaff from "./pages/UpdateStaff";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="contact" element={<Contact />} />
            <Route path="add" element={<CreateStaff />} />
            <Route path="update" element={<UpdateStaff />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
