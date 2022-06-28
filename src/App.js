import React, { useState, useEffect, useRef } from 'react';
import './style.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function List() {
  const [usersList, setUsersList] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectedUserID, setSelectedUserID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedUserIDRef = useRef();

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
    console.log('Selected user ID: ' + userID);
    setSelectedUserID(userID);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log('Selected user ID for fetch: ' + selectedUserID);
    selectedUserIDRef.current = selectedUserID;

    setIsLoading(true);
    fetch(
      'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/' +
        selectedUserID +
        '.json'
    )
      .then((response) => response.json())
      .then(
        (json) =>
          new Promise((resolve) => setTimeout(() => resolve(json), 3000))
      )
      .then((json) => {
        if (selectedUserIDRef.current === selectedUserID) {
          setIsLoading(false);
          setUserData(json);
        }
        console.log(userData);
        console.log(
          'User ID=' +
            selectedUserID +
            ' data ' +
            (isLoading ? 'loaded' : 'not loaded')
        );
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
