import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAddEventForm, setShowAddEventForm] = useState(false);

  // Form field states for new event
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [whatsappGroupLink, setWhatsappGroupLink] = useState('');

  // Fetch user data and events on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setErrorMessage('Please login first!');
          return;
        }

        // Fetch user data using axios
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,  // Send the token in the Authorization header
          }
        });

        if (response.data.name && response.data.email) {
          setUserData(response.data);  // Set user data if valid
        } else {
          setErrorMessage('Failed to load user data');
        }

        // Fetch events for the organization using axios
        const eventResponse = await axios.get('http://localhost:5000/api/events/organization-events', {
          headers: {
            'Authorization': `Bearer ${token}`,  // Send token in header
          }
        });
        setEvents(eventResponse.data);  // Set events data

      } catch (error) {
        setErrorMessage('Failed to fetch data.');
        console.error(error);  // Log the error for debugging
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this runs only once on component mount

  const handleAddEventClick = () => {
    setShowAddEventForm(true);
  };

  const handleCloseAddEventForm = () => {
    setShowAddEventForm(false);
    resetForm();
  };

  // Reset form fields after submission or closing
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setLocation('');
    setDate('');
    setWhatsappGroupLink('');
  };

  // Handle form submission to add new event
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const newEvent = {
      title,
      description,
      location,
      date,
      whatsappGroupLink,
    };

    try {
      // Post request to create the event
      await axios.post('https://volunteer-connect-2.onrender.com/api/events/create', newEvent, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Send token in the Authorization header
        }
      });

      setShowAddEventForm(false);
      resetForm();
      fetchEvents(); // Refresh events list
    } catch (error) {
      setErrorMessage('Failed to create event.');
      console.error(error);  // Log the error for debugging
    }
  };

  // Fetch events after adding a new one
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const eventResponse = await axios.get('https://volunteer-connect-2.onrender.com/api/events/organization-events', {
        headers: {
          'Authorization': `Bearer ${token}`,  // Send token in header
        }
      });
      setEvents(eventResponse.data);  // Update events state
    } catch (error) {
      setErrorMessage('Failed to fetch events.');
      console.error(error);  // Log the error for debugging
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      {userData ? (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Welcome, {userData.name}</h2>
          <p className="text-gray-600">Email: {userData.email}</p>
        </div>
      ) : (
        <p className="text-gray-600">Loading user data...</p>
      )}

      <h3 className="text-xl font-semibold text-gray-700 mt-8">Your Events</h3>
      {events.length > 0 ? (
        <div className="mt-4">
          {events.map((event) => (
            <div key={event._id} className="border-b border-gray-200 pb-4 mb-4">
              <h4 className="text-xl font-semibold text-gray-800">{event.title}</h4>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-gray-600">Location: {event.location}</p>
              <p className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
              {event.whatsappGroupLink && (
                <p>
                  <a href={event.whatsappGroupLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Join the WhatsApp Group
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No events found.</p>
      )}

      <button onClick={handleAddEventClick} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Add Event
      </button>

      {showAddEventForm && (
        <div className="mt-6 p-6 border border-gray-300 rounded-lg bg-gray-50">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Add a New Event</h4>
          <form onSubmit={handleEventSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Event Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="url"
              placeholder="WhatsApp Group Link (optional)"
              value={whatsappGroupLink}
              onChange={(e) => setWhatsappGroupLink(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-between">
              <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                Submit
              </button>
              <button type="button" onClick={handleCloseAddEventForm} className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
