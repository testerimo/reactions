'use strict';

import $ from '../modules/dom.js';

class Option {
    constructor(type, icon, count = 0, selected = false) {
        this._type = type;
        this._icon = icon;
        this._count = (count >= 0) ? count : 0;
        this._selected = selected;
        this._element = null;
    }

    static get CSS() {
        return {
            option: 'reactions__option',
            selected: 'reactions__option--selected',
            button: 'reactions__button',
            icon: 'reactions__icon',
            count: 'reactions__count'
        };
    }

    get type() {
        return this._type;
    }

    get count() {
        return this._count;
    }

    set count(value) {
        if (value >= 0 && value !== this._count) {
            this._count = value;

            if (this._element) {
                this._element.lastElementChild.textContent = this._count.toLocaleString();
            }
        }
    }

    get selected() {
        return this._selected;
    }

    get element() {
        return this._element;
    }

    toggleSelection() {
        this._selected = !this._selected;

        if (this._element) {
            this._element.classList.toggle(this.constructor.CSS.selected);
        }
    }

    render() {
        const { CSS } = this.constructor;

        const option = $.make('div', CSS.option, { 'data-type': this._type });

        if (this._selected) {
            option.classList.add(CSS.selected);
        }

        const button = $.make('div', CSS.button);
        const icon = $.make('div', CSS.icon);
        const count = $.make('span', CSS.count, null, this._count.toLocaleString());
        icon.innerHTML = this._icon;

        button.append(icon);
        option.append(button, count);

        this._element = option;

        return option;
    }
}

export default Option;
