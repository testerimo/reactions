'use strict';

class Storage {
    constructor() {
        this._storage = null;
        this._init();
    }

    isReaction(id) {
        return Boolean(this._storage.userSelects[id]);
    }

    getReaction(id) {
        return this._storage.userSelects[id];
    }

    setReaction(id, type) {
        this._storage.userSelects[id] = type;
        this._update();
    }

    removeReaction(id) {
        delete this._storage.userSelects[id];
        this._update();
    }

    _init() {
        const rawStorage = localStorage.getItem('__reactionsData__');

        if (rawStorage) {
            this._storage = JSON.parse(rawStorage);
        } else {
            this._storage = {
                userSelects: {},
                data: {}
            };
        }
    }

    _update() {
        localStorage.setItem('__reactionsData__', JSON.stringify(this._storage));
    }
}

export default new Storage();
