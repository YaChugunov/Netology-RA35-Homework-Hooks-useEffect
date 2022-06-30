import React, { useState, useEffect, useRef } from 'react';
import './style.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function Details(props) {
  const [isLoading, setIsLoading] = useState(false);
  const userData = useRef(null);
  const userDataDetails = useRef(null);

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
      // Обрабатываем ответ
      response.json().then(function (data) {
        Object.assign(userData, data);
        Object.assign(userDataDetails, data.details);
        setIsLoading(false);
        console.log(userData);
      });
    });
  }, [props.userID]);

  return (
    <div className="card" key={userData.id}>
      <img src={userData.avatar} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">
          {userData.id}. {userData.name}
        </h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{userDataDetails.city}</li>
          <li className="list-group-item">{userDataDetails.company}</li>
          <li className="list-group-item">{userDataDetails.position}</li>
        </ul>
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
        {selectedUserID !== null ? <Details userID={selectedUserID} /> : ''}
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
