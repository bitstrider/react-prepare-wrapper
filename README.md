# react-prepare-wrapper

a higher order component / wrapper for executing a task when a component mounts or receives props

## Installation

```sh
npm install react-prepare-wrapper --save-dev
```

## Usage

Here's a way to use this with the `connect` wrapper from `react-redux` to create a kind of **'smart container'** that can auto-fetch missing state data:

```javascript
import React, {Component} from 'react';
import {connect} from 'react-redux';
import prepare from 'react-prepare-wrapper'

import {fetchThings} from 'actions/app'
import {selectThings} from 'selectors/app'
import {ThingsCard, LoadingSpinner} from 'components/app'

const mstp = state => ({
    things: selectThings(state)
})

const onProps = props => {
    const {things, dispatch} = props
    if(!things) {
        dispatch(fetchThings())
    }
}

@connect(mstp)
@prepare(onProps)
export default class ThingsContainer extends Component {

    render() {
        const {things} = this.props
        return (
            <div className="things">
                {things ?
                    <ThingsCard things={things} />
                    : <LoadingSpinner />
                }
            </div>
        );
    }
}

```

When a `ThingsContainer` is mounted with an empty global state, it dispatches an action to fetch `things` and meanwhile renders `<LoadingSpinner/>`. After `things` is successfully fetched and merged into the global state via a reducer, the component will be rerendered with `<ThingsCard/>`.

## Dev Dependencies

- [babel-cli](https://github.com/babel/babel/tree/master/packages): Babel command line.
- [babel-core](https://github.com/babel/babel/tree/master/packages): Babel compiler core.
- [babel-eslint](https://github.com/babel/babel-eslint): Custom parser for ESLint
- [babel-preset-es2015](https://github.com/babel/babel/tree/master/packages): Babel preset for all es2015 plugins.
- [babel-preset-react](https://github.com/babel/babel/tree/master/packages): Babel preset for all React plugins.
- [babel-preset-stage-0](https://github.com/babel/babel/tree/master/packages): Babel preset for stage 0 plugins
- [babel-register](https://github.com/babel/babel/tree/master/packages): babel require hook
- [eslint](https://github.com/eslint/eslint): An AST-based pattern checker for JavaScript.
- [eslint-config-rackt](https://github.com/rackt/eslint-config-rackt): Shareable eslint config for rackt repos
- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react): React specific linting rules for ESLint
- [react](https://github.com/facebook/react): React is a JavaScript library for building user interfaces.
- [react-dom](https://github.com/facebook/react): React package for working with the DOM.
- [rimraf](https://github.com/isaacs/rimraf): A deep deletion module for node (like `rm -rf`)


## License

ISC
