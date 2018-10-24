import React, { Component } from 'react';

import VimeoPlayer from 'react-player';

class VideoDisplay extends Component {
  constructor() {
    super();
    this.state = {
      videoIndex: null,
    };
  }

  setVideo = index => {
    this.setState({ videoIndex: index });
    if (index !== null) {
      this.props.toggleBackgroundAudio(false);
    } else {
      this.props.toggleBackgroundAudio(false);
    }
  };

  componentWillUnmount() {
    this.props.toggleBackgroundAudio(true);
  }

  render() {
    let { videoIndex } = this.state;
    let { videos } = this.props;
    return (
      <div className="cf w-100 h-100">
        <div className="fl w-third pa2 ph3" id="video-list">
          {videos.map((video, index) => (
            <div
              key={index}
              onClick={() => this.setVideo(index)}
              className="overflow-hidden pa2 br-pill ba grow mb2 pointer">
              <span className="nowrap video-option">{video.name}</span>
            </div>
          ))}
        </div>
        <div className="fl w-two-thirds w-100 h-100 pa2" id="video-display">
          {videoIndex === null ? (
            <div className="static-gif w-100 h-100" />
          ) : (
            <VimeoPlayer
              url={videos[videoIndex].url}
              width="100%"
              height="100%"
              playerOptions={{ autoplay: true, byline: false, title: false }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default VideoDisplay;
