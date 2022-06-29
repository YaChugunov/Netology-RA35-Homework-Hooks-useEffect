import React, { useState, useEffect, useRef } from 'react';
import './style.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function Details(props) {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('ID выбранного пользователя для запроса: ' + props.userID);

    setIsLoading(true);
    fetch(
      'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/' +
        props.userID +
        '.json'
    ).then((response) => {
      if (response.status !== 200) {
        console.log(
          'Проблема загрузки данных. Статус ошибки: ' + response.status
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
  }, [props.userID]);

  return (
    <div className="card">
      <img src="https://i.pravatar.cc/300" className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{userData.name}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

function List(props) {
  const [selectedUserID, setSelectedUserID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectUserHandle = (userID) => {
    console.log('Выбран пользователь с ID: ' + userID);
    setSelectedUserID(userID);
  };

  return (
    <div className="row">
      <h1 className="display-4 mb-4">List and details</h1>
      <div className="col">
        <ul className="list-group">
          {props.usersList.map((user) => (
            <li
              className="list-group-item"
              key={user.id}
              onClick={() => selectUserHandle(user.id)}
            >
              {user.id}. {user.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="col">
        <Details userID={selectedUserID} />
      </div>
    </div>
  );
}

export default function App() {
  const [usersList, setUsersList] = useState([]);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json'
    )
      .then((response) => response.json())
      .then((json) => {
        console.log('Список пользователей загружен');
        setUsersList(json);
      });
  }, []);

  return (
    <div className="container">
      <List usersList={usersList} />
    </div>
  );
}
