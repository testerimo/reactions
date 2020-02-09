'user strict';

import { x64hash128 } from 'fingerprintjs2';

const ids = {};

class Identifier {
    static set(key, str) {
        ids[key] = str;
    }

    static get(key) {
        return ids[key];
    }

    static make(str) {
        return Identifier.hash(str);
    }

    static compare(str, hash) {
        return Identifier.hash(str) === hash;
    }

    static hash(str) {
        return x64hash128(str, 31);
    }
}

export default Identifier;
