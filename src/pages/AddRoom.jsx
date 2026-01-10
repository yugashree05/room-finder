// src/pages/AddRoom.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AddRoom() {
  const [ title, setTitle ] = useState("");
  const [ location, setLocation ] = useState("");
  const [ price, setPrice ] = useState("");
  const [ propertyType, setPropertyType ] = useState("1 BHK");
  const [ tenantPreference, setTenantPreference ] = useState("Bachelor");
  const [ contactNumber, setContactNumber ] = useState("");
  const [ image, setImage ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImage(e.target.files[ 0 ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image.");

    setLoading(true);

    // 1️⃣ Upload image to Supabase storage
    const fileName = `${Date.now()}_${image.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("room-images") // your storage bucket name
      .upload(fileName, image);

    if (uploadError) {
      setLoading(false);
      return alert("Image upload failed: " + uploadError.message);
    }

    // 2️⃣ Get public URL of the uploaded image
    const { publicUrl } = supabase.storage
      .from("room-images")
      .getPublicUrl(fileName);

    // 3️⃣ Insert room record into Supabase table
    const { error } = await supabase.from("rooms").insert([
      {
        title,
        location,
        price: Number(price), // ensure numeric
        property_type: propertyType,
        tenant_preference: tenantPreference,
        contact_number: contactNumber,
        image_url: publicUrl,
        owner_id: supabase.auth.getSession().then(({ data: { session } }) => session?.user.id),
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Failed to add room: " + error.message);
    } else {
      alert("Room added successfully!");
      navigate("/my-rooms"); // redirect to MyRooms
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Room</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
          <option>1 BHK</option>
          <option>2 BHK</option>
          <option>3 BHK</option>
        </select>
        <select value={tenantPreference} onChange={(e) => setTenantPreference(e.target.value)}>
          <option>Bachelor</option>
          <option>Family</option>
          <option>Girls</option>
          <option>Working</option>
        </select>
        <input type="text" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
        <input type="file" onChange={handleFileChange} required />
        <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Room"}</button>
      </form>
    </div>
  );
}
