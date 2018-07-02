const API_ROOT = `http://localhost:3001/api/v1`;

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json'
};

const token = localStorage.getItem('token');

const getPaintings = () => {
  return fetch(`${API_ROOT}/paintings/`, { headers: headers }).then(res =>
    res.json()
  );
};

const login = data => {
  return fetch(`${API_ROOT}/auth`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const getCurrentUser = () => {
  console.log('about to fetch the token is:', token);
  return fetch(`${API_ROOT}/current_user`, {
    headers: {
      Authorization: token
    }
  }).then(res => res.json());
};

export default {
  auth: {
    login,
    getCurrentUser
  },
  paintings: {
    getPaintings
  }
};
