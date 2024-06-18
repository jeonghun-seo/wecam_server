import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login({ onClose }) {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에 로그인 로직을 추가할 수 있습니다.
    navigate('/main');
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Password:
            <input type="password" name="password" required />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
