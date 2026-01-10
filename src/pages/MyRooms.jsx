import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function MyRooms() {
  const [ user, setUser ] = useState(null);
  const [ rooms, setRooms ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  // Detect logged-in user
  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for login/logout
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Fetch rooms added by logged-in user
  useEffect(() => {
    if (!user) return;
    const fetchRooms = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("rooms") // your Supabase table name
        .select("*")
        .eq("owner_id", user.id); // only show rooms added by this user

      if (error) console.error("Error fetching rooms:", error);
      else setRooms(data || []);
      setLoading(false);
    };

    fetchRooms();
  }, [ user ]);

  if (!user) return <p>Please log in to see your rooms.</p>;
  if (loading) return <p>Loading your rooms...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Rooms</h1>
      {rooms.length === 0 ? (
        <p>No rooms found. Add a room first!</p>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {rooms.map((room) => (
            <div key={room.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
              <img src={room.image_url} alt={room.title} style={{ width: "200px", height: "150px", objectFit: "cover" }} />
              <h3>{room.title}</h3>
              <p>Location: {room.location}</p>
              <p>Price: {room.price}</p>
              <p>Property Type: {room.property_type}</p>
              <p>Tenant Preference: {room.tenant_preference}</p>
              <p>Contact: {room.contact_number}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
