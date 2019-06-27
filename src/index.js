import './scss/style.scss';
import _ from 'lodash';

const cats = require('./api/cats.json')

class List {
    constructor(data) {
        this.favorites = new Set()
        this.list = data
    }

    addFavorite(id) {
        if (!this.favorites.has(id))
            this.favorites.add(id)
        console.log(this.favorites)
    }

    removeFavorite(id) {
        if (this.favorites.has(id))
            this.favorites.delete(id)
        console.log(this.favorites)
    }

    renderList() {
        let list = this.list.map(item => {
            return this.renderItem(item)
        }).join('');
        console.log(this.favorites)
        return list;
    }

    renderItem(item) {
        let btn = (!this.favorites.has(item.id)) ? `<button class="btn btn-group-sm btn-primary add-favorite" data-id="${item.id}">Добавить в избранное</button>` : `<button class="btn btn-group-sm btn-primary remove-favorite" data-id="${item.id}">Убрать из избранного</button>`
        let template = `<div class="col-md-4">
                            <div class="item" data-key="${item.id}">
                                <div class="item__top">
                                    <picture>
                                        <img src="${item.url}" alt="${item.id}">
                                    </picture>
                                </div>
                                <div class="item__bottom">
                                    <ul class="item__list">
                                        <li>id: ${item.id} </li>
                                    </ul>
                                    ${btn}
                                </div>
                            </div>
                        </div>`
        return template
    }
}

(function component() {
    const list = document.createElement('div')
    let catList = new List(cats)
    list.className = 'row'
    list.innerHTML = catList.renderList()
    document.querySelector('#app').appendChild(list)

    document.querySelectorAll('.add-favorite').forEach(item => {
        item.addEventListener('click', () => {
                catList.addFavorite(item.dataset.id)
                list.innerHTML = catList.renderList()
            }
        )
    })
    document.querySelectorAll('.remove-favorite').forEach(item => {
        item.addEventListener('click', () => catList.removeFavorite(item.dataset.id))
    })


})();
