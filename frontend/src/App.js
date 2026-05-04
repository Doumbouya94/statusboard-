import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import LoginForm from './components/LoginForm';
import StatusBoard from './components/StatusBoard';
import './App.css';

const socket = io('http://localhost:3001');

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    socket.on('members:update', (updatedMembers) => {
      setMembers(updatedMembers);
    });

    return () => {
      socket.off('members:update');
    };
  }, []);

  const handleJoin = (name) => {
    setCurrentUser(name);
    socket.emit('user:join', { name });
    addEvent(`${name} a rejoint le board`);
  };

  const handleStatusChange = (status) => {
    socket.emit('status:change', { status });
    const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    addEvent(`${currentUser} → ${status}`);
  };

  const addEvent = (message) => {
    const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    setEvents(prev => [...prev, { message, time }]);
  };

  if (!currentUser) {
    return <LoginForm onJoin={handleJoin} />;
  }

  return (
      <StatusBoard
          members={members}
          currentUser={currentUser}
          onStatusChange={handleStatusChange}
          events={events}
      />
  );
}

export default App;