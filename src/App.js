import React, { useState, useEffect, useRef } from 'react';
import './style.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function Details(props) {
  const userDataRef = useRef(null);
  const userDataDetailsRef = useRef(null);

  useEffect(() => {
    console.log('ID выбранного пользователя для запроса: ' + props.userID);

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
      response.json().then(function (jsonData) {
        console.log('Карточка пользователя загружена');
        console.log('jsonData', jsonData);
        Object.assign(userDataRef, jsonData);
        Object.assign(userDataDetailsRef, jsonData.details);
        console.log('userDataRef', userDataRef);
      });
    });
  }, [props.userID]);

  return (
    <div className="card" key={userDataRef.id}>
      <img src={userDataRef.avatar} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">
          {userDataRef.id}. {userDataRef.name}
        </h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{userDataDetailsRef.city}</li>
          <li className="list-group-item">{userDataDetailsRef.company}</li>
          <li className="list-group-item">{userDataDetailsRef.position}</li>
        </ul>
      </div>
    </div>
  );
}

function List(props) {
  const [selectedUserID, setSelectedUserID] = useState(null);

  const selectUserHandle = (userID) => {
    setSelectedUserID(userID);
    console.log('Выбран пользователь с ID: ' + userID);
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
    ).then((response) => {
      if (response.status !== 200) {
        console.log(
          'Проблема загрузки данных. Статус ошибки: ' + response.status
        );
        return;
      }
      response.json().then(function (jsonData) {
        console.log('Список пользователей загружен');
        setUsersList(jsonData);
      });
    });
  }, []);

  return (
    <div className="container">
      <List usersList={usersList} />
    </div>
  );
}
