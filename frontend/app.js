'use strict';

import './form/form.styl';
import List from './list';
import Dashboard from './dashboard';
import Users from './users';

let users = new Users();

let form = document.forms[0];


let userList = new List ({
  title: "Пользователи",
  items: []
});

form.appendChild(userList.getElem());

let userDashboard = new Dashboard ({
  title: "Редактирование профиля",
});

form.appendChild(userDashboard.getElem());

document.addEventListener('users-recieved', function(event) {
  userList.updateList(event.detail.value);
});

form.addEventListener('item-updated', function(event) {
  users.updateItem(event.detail.value);
});

form.addEventListener('item-added', function(event) {
  users.addNewItem(event.detail.value);
});

document.addEventListener('users-data-updated', function(event) {
  users.getUsers();
});

form.addEventListener('item-removed', function(event) {
  users.removeItem(event.detail.value);
});

form.addEventListener('item-select', function(event) {
  userDashboard.showProps(event.detail.value);
});

form.addEventListener('submit', function(event) {
  event.preventDefault();
  userDashboard.returnProps();
});

form.addEventListener('item-save', function(event) {
  userList.setProps(event.detail);
});

form.addEventListener('item-new', function(event) {
  userList.clearSelection();
  userList.addNewItem(event.detail);
});

form.addEventListener('cancel-changes', function(event) {
  if (Object.keys(userList.getSelectedElem()).length == 0) {
    userDashboard.clearFields();
  } else {
    userDashboard.showProps(userList.getSelectedElem());
  }
});
