// src/components/EventList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      const response = await axios.get(config.apiUrl);
      setEvents(response.data);
    } catch (err) {
      setError("Wystąpił błąd podczas ładowania wydarzeń.");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.apiUrl}/delete/${id}`); // Delete from database
      setEvents(events.filter((event) => event._id !== id)); // delete from app/browser/local
    } catch (err) {
      console.error("Błąd podczas usuwania wydarzenia:", err);
      setError("Nie udało się usunąć wydarzenia.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Lista:</h2>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Imię i Nazwisko</th>
            <th>Wydarzenie</th>
            <th>Miasto</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={event._id}>
              <td>{index + 1}</td>
              <td>{event.name}</td>
              <td>{event.event.val}</td>
              <td>{event.city.val}</td>
              <td>
                <button onClick={() => handleDelete(event._id)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;
