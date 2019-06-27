import './scss/style.scss';

const cats = require('./api/cats.json');

class List {
  constructor(data) {
    this.favorites = new Set();
    this.list = data;
  }

  addFavorite(id) {
    if (!this.favorites.has(id)) {
      this.favorites.add(id);
    }
    console.log(this.favorites);
  }

  removeFavorite(id) {
    if (this.favorites.has(id)) {
      this.favorites.delete(id);
    }
    console.log(this.favorites);
  }

  renderList() {
    const row = document.createElement('div');
    row.classList.add('row');
    this.list.forEach(item => {
      row.appendChild(this.renderItem(item));
    });
    return row;
  }

  renderItem(item) {
    const div = document.createElement('div');
    div.classList.add('col-md-4');
    div.innerHTML = `
        <div class="item">
            <div class="item__top">
                <picture>
                    <img src="${item.url}" alt="${item.id}">
                </picture>
            </div>
            <div class="item__bottom">
                <ul class="item__list">
                    <li>id: ${item.id} </li>
                </ul>
                <button class="btn-primary js-fav">Избранное</button>
                <button class="btn-primary js-del">Убрать</button>
            </div>
        </div>`;
    div
      .querySelector('.js-fav')
      .addEventListener('click', () => this.addFavorite(item.id));
    div
      .querySelector('.js-del')
      .addEventListener('click', () => this.removeFavorite(item.id));
    return div;
  }
}

(function component() {
  const container = document.createElement('div');
  container.className = 'container';
  let catList = new List(cats);
  container.appendChild(catList.renderList());
  document.body.appendChild(container);
})();
