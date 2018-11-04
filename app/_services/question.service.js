import config from 'config';
import { logout } from './user.service';

export const questionService = {
  post,
  getAll,
  upvote,
  downvote,
};

function post(username, title, content) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, title, content }),
  };

  return fetch(`${config.apiUrl}/questions/post`, requestOptions)
    .then(handleResponse)
    .then(question => {
      // if (question.id) {
      //   localStorage.setItem('user', JSON.stringify(user));
      // }

      return question;
    });
}

function getAll() {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${config.apiUrl}/questions`, requestOptions).then(handleResponse);
}

function upvote(id) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  };
  console.log("question service calling backend");
  return fetch(`${config.apiUrl}/questions/upvote`, requestOptions)
    .then(handleResponse)
    .then(question => {
      return question;
    });
}

function downvote(id) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  };

  return fetch(`${config.apiUrl}/questions/downvote`, requestOptions)
    .then(handleResponse)
    .then(question => {
      return question;
    });
}


function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
