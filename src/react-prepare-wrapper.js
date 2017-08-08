import React, { Component } from 'react';

const prepare = (onProps, dissolver) => WrappedComponent => {
  class PreparedWrappedComponent extends Component {
    componentWillMount() {
      onProps.call(this,this.props);
    }
    componentWillReceiveProps(nextProps) {
      onProps.call(this,nextProps);
    }

    componentWillUnmount() {
      if(dissolver) dissolver.call(this,this.props);
    }

    render() {
      return (<WrappedComponent {...this.props} />);
    }
  }
  return PreparedWrappedComponent;
};

export default prepare;
