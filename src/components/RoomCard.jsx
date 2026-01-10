// src/components/RoomCard.jsx
import React from "react";

export default function RoomCard({ room }) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px", width: "250px" }}>
      <img src={room.image_url} alt={room.title} style={{ width: "100%", borderRadius: "8px" }} />
      <h3>{room.title}</h3>
      <p><strong>Location:</strong> {room.location}</p>
      <p><strong>Price:</strong> ₹{room.price}</p>
      <p><strong>Type:</strong> {room.property_type}</p>
      <p><strong>Tenant:</strong> {room.tenant_preference}</p>
      <p><strong>Contact:</strong> {room.contact_number}</p>
    </div>
  );
}
