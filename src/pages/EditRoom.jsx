import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ room, setRoom ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ form, setForm ] = useState({
    title: "",
    location: "",
    price: "",
    property_type: "",
    tenant_preference: "",
    contact_number: "",
  });

  // Fetch room details
  useEffect(() => {
    const fetchRoom = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Error fetching room:", error.message);
        setLoading(false);
        return;
      }

      setRoom(data);
      setForm({
        title: data.title,
        location: data.location,
        price: data.price,
        property_type: data.property_type,
        tenant_preference: data.tenant_preference,
        contact_number: data.contact_number,
      });
      setLoading(false);
    };

    fetchRoom();
  }, [ id ]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [ e.target.name ]: e.target.value });
  };

  // Update room
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("rooms")
      .update(form)
      .eq("id", id);

    if (error) console.log("Error updating room:", error.message);
    else {
      alert("Room updated successfully!");
      navigate("/my-rooms");
    }
  };

  if (loading) return <p>Loading room details...</p>;
  if (!room) return <p>Room not found!</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Room</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px", gap: "10px" }}>
        <input
          type="text"
          name="title"
          placeholder="Room Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <select name="property_type" value={form.property_type} onChange={handleChange} required>
          <option value="">Select Property Type</option>
          <option value="1 BHK">1 BHK</option>
          <option value="2 BHK">2 BHK</option>
          <option value="3 BHK">3 BHK</option>
        </select>
        <select name="tenant_preference" value={form.tenant_preference} onChange={handleChange} required>
          <option value="">Select Tenant Preference</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Family">Family</option>
          <option value="Girls">Girls</option>
          <option value="Working">Working</option>
        </select>
        <input
          type="text"
          name="contact_number"
          placeholder="Contact Number"
          value={form.contact_number}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ padding: "10px", backgroundColor: "green", color: "white", border: "none", borderRadius: "5px" }}>
          Update Room
        </button>
      </form>
    </div>
  );
}
