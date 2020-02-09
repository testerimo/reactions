'use strict';

import Option from './option.js';

import $ from '../modules/dom.js';
import Storage from '../modules/storage.js';
import Identifier from '../modules/identifier.js';
import Fingerprint from '../modules/fingerprint.js';

class Reactions {
    constructor(options) {
        this._init(options);

        this.element = this._render();
        this._loadStyles();
        this._loadEvents();
        this._mount();
    }

    static get CSS() {
        return {
            reactions: 'reactions',
            title: 'reactions__title',
            container: 'reactions__container'
        };
    }

    static setUserId(id) {
        Identifier.set('userId', id);
    }

    _init(options) {
        if (!Identifier.get('userId')) {
            Fingerprint.hash().then(this.constructor.setUserId);
        }

        this.id = options.id || Identifier.make(window.location.href);

        this.parent = (options.parent instanceof HTMLElement)
            ? options.parent
            : $.find(options.parent);

        if (options.title) {
            this.title = options.title;
        }

        this.options = Object.create(null);

        let hasSelected = false;

        for (const reaction of options.reactions) {
            const { type, icon } = reaction;

            const counter = options.counters[type];

            let count = 0;
            let selected = false;

            if (typeof counter === 'object') {
                count = counter.count;
                selected = (counter.selected === true);

                if (!hasSelected && selected) {
                    hasSelected = true;
                }
            } else {
                count = counter;
            }

            if (selected) {
                Storage.setReaction(this.id, type);
            }

            this.options[type] = new Option(type, icon, count, selected);
        }

        if (!hasSelected) {
            const type = Storage.getReaction(this.id) || false;

            if (type) {
                this.options[type].count++;
                this.options[type].toggleSelection();
            }
        }

        if (typeof options.onSelect === 'function') {
            this.onSelect = options.onSelect
        }
    }

    _loadStyles() {
        const style = require(`../styles/reactions.css`); // eslint-disable-line no-undef
        $.make('style', null, { textContent: style.toString() });
    }

    _loadEvents() {
        this._clickHandler();
    }

    _clickHandler() {
        $.listen(this.element, 'click', (event) => {
            const optionElement = event.target.closest(`.${Option.CSS.option}`);

            if (optionElement) {
                const { type } = optionElement.dataset;

                const newOption = this.options[type];
                let prevOption = null;

                for (const type in this.options) {
                    if (this.options[type].selected) {
                        prevOption = this.options[type];
                        break;
                    }
                }

                const data = {
                    userId: Identifier.get('userId'),
                    reactionsId: this.id,
                    selected: (newOption !== prevOption) ? type : null
                };

                this.onSelect(data);

                this._toggleOption(newOption, prevOption);

                if (data.selected) {
                    Storage.setReaction(this.id, type);
                } else {
                    Storage.removeReaction(this.id);
                }
            }
        });
    }

    _toggleOption(newOption, prevOption) {
        if (newOption !== prevOption) {
            newOption.count++;
            newOption.toggleSelection();
        }

        if (prevOption) {
            prevOption.count--;
            prevOption.toggleSelection();
        }
    }

    _mount() {
        if (this.parent) {
            this.parent.append(this.element);
        } else {
            throw new Error('Parent element not found');
        }
    }

    _render() {
        const { CSS } = this.constructor;

        const reactionsAttributes = (this.id) ? { id: this.id } : null;
        const reactions = $.make('div', CSS.reactions, reactionsAttributes);
        const container = $.make('div', CSS.container);

        if (this.title) {
            const title = $.make('div', CSS.title, null, this.title);
            reactions.append(title);
        }

        const options = [];

        for (const type in this.options) {
            options.push(this.options[type].render());
        }

        container.append(...options);
        reactions.append(container);

        return reactions;
    }
}

export default Reactions;
