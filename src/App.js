import React, { useState, useEffect, useRef } from 'react';
import './style.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function List() {
  const [usersList, setUsersList] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectedUserID, setSelectedUserID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json'
    )
      .then((response) => response.json())
      .then((json) => {
        console.log('Users list loaded');
        setUsersList(json);
      });
  }, []);

  const selectUserHandle = (userID) => {
    console.log('Clicked on user ID: ' + userID);
    setSelectedUserID(userID);
  };

  useEffect(() => {
    console.log('Selected user ID for fetch: ' + selectedUserID);

    setIsLoading(true);
    fetch(
      'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/' +
        selectedUserID +
        '.json'
    ).then((response) => {
      if (response.status !== 200) {
        console.log(
          'Looks like there was a problem. Status Code: ' + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        console.log(data);
        setUserData(json);
        setIsLoading(false);
      });
    });
  }, [selectedUserID]);

  return (
    <ul className="list-group">
      {usersList.map((user) => (
        <li
          className="list-group-item"
          key={user.id}
          onClick={() => selectUserHandle(user.id)}
        >
          {user.id}. {user.name}
        </li>
      ))}
    </ul>
  );
}

function Details() {}

export default function App() {
  return (
    <div className="container">
      <div className="row">
        <h1 className="display-4 mb-4">List and details</h1>
        <div className="col">
          <List />
        </div>
        <div className="col">
          <Details />
        </div>
      </div>
    </div>
  );
}
