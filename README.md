# Reactions

Light-weight module for collecting reactions and feedback on a webpage

## Installation

Install with npm

```
npm install @testerimo/reactions
```
or using Yarn

```
yarn add @testerimo/reactions
```

## Usage

1. Connect reaction.js to your page
2. Create `Reactions` instance:

```javascript
new Reactions({ id, parent, title, reactions, counters, onSelect });
```

where

| name      | type                      | description                                                               | required  |
|-----------|---------------------------|---------------------------------------------------------------------------|-----------|
| id        | `number` or `string`      | id of reactions instance (by default based on `window.location.href`)     |           |
| parent    | `string` or `HTMLElement` | parent selector or element instance                                       | true      |
| title     | `string`                  | reactions title                                                           |           |
| reactions | `array[object]`           | list of reaction with type name and icon fields                           | true      |
| counters  | `object`                  | map of counters                                                           | true      |
| onSelect  | `function`                | callback function calls when reaction is selected                         |           |

Example:

```javascript
const options = {
    id: 'reaction-53384',
    parent: document.querySelector('article'),
    title: 'Rate the article',
    reactions: [
        { type: 'great', icon: '🚀' },
        { type: 'normal', icon: '🙂' },
        { type: 'bad', icon: '🤬' },
    ],

    counters: {
        'great': { count: 2394, selected: true },
        'normal': { count: 301 },
        'bad': 27,
    },

    onSelect: (data) => {
        console.log(data);  // { userId: '...' reactionId: '...', selected: '...' }
        db.updateReaction(data);
    }
};

new Reactions(options);
```

### Identify user

To undetify user:

```javascript
Reactions.setUserId(6671);
```

By default module uses id that is created by fingerprintjs2 package

## Further plans

- [ ] Add new types of reactions (i.e. Slack, Github emoji picker & counters)
- [ ] Add methods to support live counters updating

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :)
