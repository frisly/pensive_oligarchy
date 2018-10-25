import React, { Component } from 'react';

import Modal from 'react-modal';
import VideoComponent from './VideoComponent';

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

  handleChange = event => {
    this.setVideo(event.target.value);
  };

  render() {
    let { videoIndex } = this.state;
    let { videos } = this.props;
    return (
      <Modal
        className="center z-10 o-100 near-white video-modal br-50"
        isOpen={this.props.open}
        overlayClassName={{
          base: 'dn',
          afterOpen:
            'db flex items-center w-100 h-100 fixed top-0 bottom-0 left-0 right-0 z-0 bg-near-black--o-50',
        }}
        onRequestClose={this.props.close}
        shouldCloseOnEsc={true}>
        <div className="pa3 tc br-50 br-near-white w-100 h-100 flex flex-column items-center">
          <div className="cf w-100 h-100">
            <div className="fl w-100 w-third-ns pa2 ph3" id="video-list">
              <div className="db-ns dn">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    onClick={() => this.setVideo(index)}
                    className="overflow-hidden pa2 ph3 br-pill ba grow mb3 pointer">
                    <div className="nowrap video-option w-100">{video.name}</div>
                  </div>
                ))}
              </div>
              <div className="dn-ns db">
                <select
                  className="input-reset pa2 ph3 br-pill ba grow mb3 pointer w-100 tc bg-near-black near-white"
                  onChange={this.handleChange}
                  value={this.state.videoIndex}>
                  <option key={'null'} value={null}>
                    Select a Video
                  </option>
                  {videos.map((video, index) => (
                    <option key={index} value={index}>
                      {video.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="fl w-100 w-two-thirds-ns w-100 h-100 pa2" id="video-display">
              {videoIndex === null ? (
                <div className="static-gif w-100 h-100" />
              ) : (
                <VideoComponent url={videos[videoIndex].url} />
              )}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default VideoDisplay;
