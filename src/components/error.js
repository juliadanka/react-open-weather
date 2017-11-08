import React from 'react';

class ErrorMsg extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const className=(this.props.msg==='')?'error error--hide':'error';
    return (
      <div className={className}>{this.props.msg}</div>
    )
  }
}

export default ErrorMsg;