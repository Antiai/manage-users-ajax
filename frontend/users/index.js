export default class Users {
  constructor() {
    this.usersArr = [];

    this.getUsers();

    this.updateItem = this.updateItem.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  getUsers() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://test-api.javascript.ru/v1/ershov/users', true);
    xhr.send();
    xhr.onload = e => {
      this.usersArr = JSON.parse(xhr.responseText);
      document.dispatchEvent(new CustomEvent('users-recieved', {
        bubbles: true,
        detail: {
          value: this.usersArr
        }
      }));
    }
  }

  addNewItem(obj) {
    let body = JSON.stringify({ fullName: obj.fullName, email: obj.email });
    let xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://test-api.javascript.ru/v1/ershov/users', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(body);
  }

  removeItem(id) {
    let xhr = new XMLHttpRequest();
    let string = 'http://test-api.javascript.ru/v1/ershov/users/' + id;
    xhr.open("DELETE", string, true);
    xhr.send();
  }

  updateItem(obj) {
    let body = JSON.stringify({ fullName: obj.fullName, email: obj.email });
    console.log(obj);
    console.log(body);
    let xhr = new XMLHttpRequest();
    let string = 'http://test-api.javascript.ru/v1/ershov/users/' + obj._id;
    xhr.open("PATCH", string, true);
    xhr.send(body);

    xhr.onload = e => {
      console.log(JSON.parse(xhr.responseText));
    }
  }
}
