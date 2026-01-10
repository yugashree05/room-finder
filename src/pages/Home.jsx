import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Home() {
  const [ rooms, setRooms ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      const { data, error } = await supabase.from("rooms").select("*");
      if (error) {
        console.log("Error fetching rooms:", error);
      } else {
        setRooms(data);
      }
      setLoading(false);
    }
    fetchRooms();
  }, []);

  if (loading) return <p>Loading rooms...</p>;

  return (
    <div>
      {rooms.length === 0 ? (
        <p>No rooms found.</p>
      ) : (
        rooms.map((room) => (
          <div key={room.id}>
            <h3>{room.title}</h3>
            <p>{room.location}</p>
            <p>₹{room.price}</p>
          </div>
        ))
      )}
    </div>
  );
}
