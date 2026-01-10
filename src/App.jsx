import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddRoom from "./pages/AddRoom";
import MyRooms from "./pages/MyRooms";
import Login from "./pages/Login";
import EditRoom from "./pages/EditRoom";
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/add-room" element={<AddRoom />} />
  <Route path="/my-rooms" element={<MyRooms />} />
  <Route path="/edit-room/:id" element={<EditRoom />} />
  <Route path="/login" element={<Login />} />
</Routes>
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/my-rooms" element={<MyRooms />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;