"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestPage() {
  const [incidents, setIncidents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch all incidents
  const fetchIncidents = async () => {
    const { data, error } = await supabase
      .from("incidents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching:", error);
    } else {
      setIncidents(data);
      console.log("Fetched incidents:", data);
    }
  };

  // Create a new incident
  const createIncident = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("incidents")
      .insert({
        title,
        description,
        category: "test",
      })
      .select();

    if (error) {
      console.error("Error creating:", error);
      alert("Error: " + error.message);
    } else {
      console.log("Created:", data);
      alert("Incident created!");
      setTitle("");
      setDescription("");
      fetchIncidents(); // Refresh the list
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test Supabase Connection</h1>

      {/* Create Form */}
      <form onSubmit={createIncident} className="mb-8 p-4 border rounded">
        <h2 className="text-xl mb-2">Create Incident</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-2"
          rows="3"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Incident
        </button>
      </form>

      {/* Fetch Button */}
      <button
        onClick={fetchIncidents}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Fetch All Incidents
      </button>

      {/* Display Incidents */}
      <div>
        <h2 className="text-xl mb-2">Incidents ({incidents.length})</h2>
        {incidents.map((incident) => (
          <div key={incident.id} className="border p-4 mb-2 rounded">
            <h3 className="font-bold">{incident.title}</h3>
            <p className="text-gray-600">{incident.description}</p>
            <p className="text-sm text-gray-400">
              {new Date(incident.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
