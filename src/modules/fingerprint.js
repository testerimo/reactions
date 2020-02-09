'use strict';

import Fingerprint2 from 'fingerprintjs2';

class Fingerprint {
    static get() {
        const options = {
            excludes: {
                fonts: true
            }
        };

        return new Promise((resolve) => Fingerprint2.get(options, resolve));
    }

    static hash() {
        return new Promise((resolve) => {
            if (window.requestIdleCallback) {
                requestIdleCallback(() => {
                    Fingerprint.get().then((components) => {
                        const hash = Fingerprint2.x64hash128(Object.values(components).join(''), 31);
                        resolve(hash);
                    })
                })
            } else {
                setTimeout(function () {
                    Fingerprint.get().then((components) => {
                        const hash = Fingerprint2.x64hash128(Object.values(components).join(''), 31);
                        resolve(hash);
                    });
                }, 500)
            }
        });
    }
}

export default Fingerprint;
