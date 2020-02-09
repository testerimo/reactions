'use strict';

class DOM {
    static id(elementId) {
        return document.getElementById(elementId);
    }

    static find(selector, element = document) {
        return element.querySelector(selector);
    }

    static findAll(selector, element = document) {
        return element.querySelectorAll(selector);
    }

    static make(tagName, classNames = null, attributes = null, ...children) {
        const element = document.createElement(tagName);

        if (Array.isArray(classNames)) {
            element.classList.add(...classNames);
        } else if (typeof classNames === 'string') {
            element.classList.add(classNames);
        }

        if (attributes) {
            for (const [name, value] of Object.entries(attributes)) {
                element.setAttribute(name, value);
            }
        }

        if (children.length) {
            element.append(...children);
        }

        return element;
    }

    static listen(element, event, handler) {
        element.addEventListener(event, handler);
    }
}

export default DOM;
