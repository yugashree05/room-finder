import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/add-room">Add Room</Link> |{" "}
      <Link to="/my-rooms">My Rooms</Link> |{" "}
      <Link to="/login">Login</Link>
    </nav>
  );
}
