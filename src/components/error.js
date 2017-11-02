import React from 'react';

class ErrorMsg extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var className=(this.props.msg==='')?'error-wrapper hide':'error-wrapper';
    return (
      <div className={className}>{this.props.msg}</div>
    )
  }
}

export default ErrorMsg;