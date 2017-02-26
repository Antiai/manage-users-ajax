import template from './dashboard.pug';

import './dashboard.styl';

export default class Dashboard {

  constructor({title}) {
    this._title = title;

    this._render();

    this.fields = Array.from(this._elem.querySelectorAll('.dashboard__input'));

    this.showProps = this.showProps.bind(this);
    this.returnProps = this.returnProps.bind(this);
    this.clearFields = this.clearFields.bind(this);

    this._elem.addEventListener('click', this._selectInputText.bind(this));
    this._elem.addEventListener('click', this._addItem.bind(this));
    this._elem.addEventListener('click', this._cancelChanges.bind(this));
  }

  _render() {
    let tmp = document.createElement('div');
    tmp.innerHTML = template({
      title: this._title,
    });
    this._elem = tmp.firstElementChild;
  }

  _selectInputText(e) {
    if (e.target.classList.contains('dashboard__input')) {
      e.target.select();
    }
  }

  showProps(selectedObj) {
    let valuesArr = [];

    for (let key in selectedObj) {
      valuesArr.push(selectedObj[key]);
    }

    let index = 0;

    for (let field of this.fields) {
      index = this.fields.indexOf(field);
      field.value = valuesArr[index];
    }

    this.fields[0].focus();
    this.fields[0].select();
  }

  returnProps() {
    if (!this.fields[0].value || !this.fields[1].value) return

    this._elem.dispatchEvent(new CustomEvent('item-save', {
      bubbles: true,
      detail: {
        firstname: this.fields[0].value,
        surname: this.fields[1].value
      }
    }));
  }

  _addItem(e) {
    if (!this.fields[0].value || !this.fields[1].value) return;

    if (!e.target.classList.contains('dashboard__add')) return;

    this._elem.dispatchEvent(new CustomEvent('item-new', {
      bubbles: true,
      detail: {
        firstname: this.fields[0].value,
        surname: this.fields[1].value
      }
    }));
  }

  _cancelChanges(e) {
    if (!this.fields[0].value || !this.fields[1].value) return;

    if (!e.target.classList.contains('dashboard__cancel')) return;

    this._elem.dispatchEvent(new CustomEvent('cancel-changes', {
      bubbles: true
    }));
  }

  clearFields() {
    for (let field of this.fields) {
      field.value = "";
    }
  }

  getElem() {
    return this._elem;
  }
}
