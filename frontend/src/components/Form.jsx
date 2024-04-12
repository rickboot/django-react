import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import LoadingIndicator from '../pages/LoadingIndicator';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import '../styles/Form.css';

Form.propTypes = {
  method: PropTypes.string.isRequired,
  apiRoute: PropTypes.string.isRequired,
};

function Form({ method, apiRoute }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === 'login' ? 'Login' : 'Register';

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(apiRoute, { username, password });
      if (method === 'login') {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <h1>{name}</h1>
      <input
        className='form-input'
        value={username}
        type='text'
        onChange={(e) => setUsername(e.target.value)}
        placeholder='username'
      />
      <input
        className='form-input'
        value={password}
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        placeholder='password'
      />
      {loading && <LoadingIndicator />}
      <button className='form-button'>{name}</button>
    </form>
  );
}

export default Form;
