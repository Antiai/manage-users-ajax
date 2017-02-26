'use strict';

import './form/form.styl';
import List from './list';
import Dashboard from './dashboard';

let form = document.forms[0];

let userList = new List ({
  title: "Пользователи",
  items: [{
    firstname: "Василий",
    surname:  "Иванов"
  }, {
    firstname: "Петр",
    surname:  "Васильев"
  }, {
    firstname: "Иван",
    surname:  "Сидоров"
  }]
});

form.appendChild(userList.getElem());

let userDashboard = new Dashboard ({
  title: "Редактирование профиля",
  list: userList
});

form.appendChild(userDashboard.getElem());

//При выборе элемента в userList генерится событие
//item-select и в userDashboard передаются имя и фамилия
//выделенного пользователя и отображаютсяв полях userDashboard

form.addEventListener('item-select', function(event) {
  userDashboard.showProps(event.detail.value);
});

//При нажатии на "Cохранить" генерим событие item-save, в котором
//передаем значения полей

form.addEventListener('submit', function(event) {
  event.preventDefault();
  userDashboard.returnProps();
});

//Когда поймали item-save на форме, записываем полученные значения
//в выделенный элемент списка. Если нет выделенного элемента,
//создается новый пользователь.

form.addEventListener('item-save', function(event) {
  userList.setProps(event.detail);
});

//При нажатии на "Новый пользователь'' в userDashboard
//генерится событие item-new, в котором также передаются
//значения полей.
//При поимке события item-new передаем детали события в userList
//и добавляем нового пользователя

form.addEventListener('item-new', function(event) {
  userList.clearSelection();
  userList.addNewItem(event.detail);
});

//При нажатии на "Отмена" в userDashboard генерится событие
//cancel-changes. И если в userList был выбран один из элементов,
// то изменения в полях сбрасываются на исходные значения элемента.
//Если ни один пользователь не выбран, значения полей обнуляются

form.addEventListener('cancel-changes', function(event) {
  if (Object.keys(userList.getSelectedElem()).length == 0) {
    userDashboard.clearFields();
  } else {
    userDashboard.showProps(userList.getSelectedElem());
  }
});
