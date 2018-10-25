import React, { Component } from 'react';

import VimeoPlayer from 'react-player';

class VideoComponent extends Component {
  constructor() {
    super();
    this.state = { loading: true };
  }

  onReady = () => {
    this.setState({ loading: false });
  };

  render() {
    let { loading } = this.state;
    return (
      <div className={`${loading && 'static-gif '} w-100 h-100`}>
        <VimeoPlayer
          onReady={this.onReady}
          url={this.props.url}
          width="100%"
          height="100%"
          playing={true}
        />
      </div>
    );
  }
}

export default VideoComponent;
