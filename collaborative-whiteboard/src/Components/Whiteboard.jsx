import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const Whiteboard = () => {
  const [socket, setSocket] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('black');
  const [isErasing, setIsErasing] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const newSocket = io('https://kotech-solution.onrender.com/', {
      query: { token },
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('userJoined', (data) => {
      setActiveUsers(data.users);
    });

    newSocket.on('userLeft', (data) => {
      setActiveUsers(data.users);
    });


    newSocket.on('loadCanvasState', (canvasState) => {
      const ctx = ctxRef.current;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasState.forEach(({ action, x, y, color }) => {
        ctx.beginPath();
        ctx.strokeStyle = color || 'black';
        ctx.lineWidth = 2;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();
      });
    });

    return () => newSocket.disconnect();
  }, []);

  const handleJoin = () => {
    const username = localStorage.getItem('username');
    if (socket && sessionId && username) {
      socket.emit('joinSession', sessionId, username);
    } else {
      console.error('Session ID or Username is missing');
    }
  };


  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!drawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = ctxRef.current;
    if (isErasing) {
      ctx.clearRect(offsetX - 10, offsetY - 10, 20, 20);
      socket.emit('eraseUpdate', { x: offsetX, y: offsetY, sessionId });
    } else {
      ctx.strokeStyle = color;
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      socket.emit('drawingUpdate', { x: offsetX, y: offsetY, color, sessionId });
    }
  };

  const stopDrawing = () => {
    setDrawing(false);
    ctxRef.current.closePath();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctxRef.current = ctx;
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{ color: '#333', marginBottom: '10px' }}>Collaborative Whiteboard</h1>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        width: '80%',
        maxWidth: '400px',
      }}>
        <h3 style={{ marginBottom: '10px', color: '#007BFF' }}>Active Users:</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {activeUsers.map((user, index) => (
            <li key={index} style={{
              backgroundColor: '#e9ecef',
              padding: '8px',
              marginBottom: '5px',
              borderRadius: '4px',
              color: '#333',
              textAlign: 'center',
            }}>
              {user}
            </li>
          ))}
        </ul>
      </div>
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
      }}>
        <input
          type="text"
          placeholder="Enter session ID"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '200px',
            outline: 'none',
          }}
        />
        <button
          onClick={handleJoin}
          style={{
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '10px',
            cursor: 'pointer',
          }}
        >
          Join Session
        </button>
      </div>

      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        alignItems: 'center',
      }}>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ border: 'none', cursor: 'pointer' }}
        />
        <button
          onClick={() => setIsErasing(!isErasing)}
          style={{
            backgroundColor: isErasing ? '#ffc107' : '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '10px',
            cursor: 'pointer',
          }}
        >
          {isErasing ? 'Stop Erasing' : 'Erase'}
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        style={{
          border: '2px solid #333',
          backgroundColor: '#fff',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '4px',
        }}
      ></canvas>
    </div>
  );

};

export default Whiteboard;
