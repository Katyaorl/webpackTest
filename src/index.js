import './scss/style.scss';
import _ from 'lodash';

const cats = require('./api/cats.json');

class List {
    constructor(data) {
        this.favorites = new Set()
        this.list = data
    }

    addFavorite(id) {
        if (!this.favorites.has(id))
            this.favorites.add(id)
    }

    removeFavorite(id) {
        if (this.favorites.has(id))
            this.favorites.delete(id)
    }

    renderList() {
        let list = this.list.map(item => {
            return this.renderItem(item)
        })
        return list;
    }

    renderItem(item) {
        return `<div class="col-md-4">
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
                        <button class="btn-primary" onclick="${this.addFavorite(item.id)}">Избранное</button>
                        <button class="btn-primary" onclick="${this.removeFavorite(item.id)}">Убрать</button>
                    </div>
                </div>
            </div>
`
    }
}

function component() {
    const container = document.createElement('div');
    const row = document.createElement('div');
    let catList = new List(cats);
    container.className = 'container';
    container.appendChild(row);
    row.className = 'row';
    row.innerHTML = catList.renderList();
    console.log(row);
    return container;
}

document.body.appendChild(component());