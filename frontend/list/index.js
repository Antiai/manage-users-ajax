
import template from './list.pug';
import itemTemplate from './item.pug';

import './list.styl';

export default class List {

  constructor({title, items}) {
    this._title = title;
    this._items = items;
    this.selected = {};

    this._render();

    this._elem.addEventListener('click', this._selectItem.bind(this));
    this._elem.addEventListener('click', this._removeItem.bind(this));
    this._elem.addEventListener('mouseover', this._createDestroyBtn.bind(this));
    this._elem.addEventListener('mouseout', this._removeDestroyBtn.bind(this));

    this._selectItem = this._selectItem.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
    this._removeItem = this._removeItem.bind(this);
    this.setProps = this.setProps.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this._updateList = this._updateItem.bind(this);
  }

  _render() {
    let tmp = document.createElement('div');
    tmp.innerHTML = template({
      title: this._title,
      items: this._items,
    });
    this._elem = tmp.firstElementChild;
  }

  addNewItem(obj) {
    this._items.push(obj);
    this._elem.querySelector('.list__items').insertAdjacentHTML('beforeend', itemTemplate({item: obj}));
  }

  _removeItem(e) {
    if (!e.target.classList.contains('list__item-destroy')) return;
    e.preventDefault();

    this.clearSelection();

    let arr = Array.from(this._elem.querySelectorAll('.list__item'));
    let index = arr.indexOf(e.target.closest('.list__item'));
    this._items.splice(index, 1);

    e.target.closest('.list__item').remove();
  }

  _createDestroyBtn(e) {
    if (!e.target.closest('.list__item')) return;
    let btnElem = e.target.closest('.list__item').querySelector('.list__item-destroy');
    if (btnElem) return;

    let targetItem = e.target.closest('.list__item');
    let box = targetItem.getBoundingClientRect();

    let btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.classList.add('list__item-destroy');
    btn.innerHTML = 'x';
    btn.style.top = box.top + pageYOffset + 2 + 'px';
    btn.style.left = box.left + pageXOffset + targetItem.offsetWidth - 24 + 'px';
    targetItem.appendChild(btn);
  }

  _removeDestroyBtn(e) {
    let target = e.relatedTarget;
    if (target.classList.contains('list__item-destroy')) return;

    let targetItem = e.target.closest('.list__item');
    let btn = this._elem.querySelector('.list__item-destroy');
    if (!btn) return;

    btn.remove();
  }

  _selectItem(e) {
    e.preventDefault();

    if (!e.target.closest('.list__item') || e.target.classList.contains('list__item-destroy')) return;

    this.clearSelection();

    let target = e.target.closest('.list__item');

    target.classList.add('list__item--active');

    let arr = Array.from(document.querySelectorAll('.list__item'));
    let indexOfSelected = arr.indexOf(target);
    this.selected = this._items[indexOfSelected];

    this._elem.dispatchEvent(new CustomEvent('item-select', {
      bubbles: true,
      detail: {
        value: this.selected
      }
    }));
  }

  clearSelection() {
    let collection = document.querySelectorAll('.list__item');
    for (let elm of collection) {
      elm.classList.remove('list__item--active');
    }

    this.selected = {};
  }

  setProps(obj) {
    if (Object.keys(this.selected).length == 0) {
      this.addNewItem(obj);
      return;
    }

    this._updateItem(obj);

    let activeElm = this._elem.querySelector(".list__item--active");

    activeElm.querySelector('.list__firstname').innerHTML = obj.firstname + " ";
    activeElm.querySelector('.list__surname').innerHTML = obj.surname;
  }

  _updateItem(obj) {
    let selectedIndex = this._items.indexOf(this.selected);

    this._items[selectedIndex] = {firstname: obj.firstname, surname: obj.surname};
    this.selected = this._items[selectedIndex];
  }

  getElem() {
    return this._elem;
  }

  getSelectedElem() {
    return this.selected;
  }
}
