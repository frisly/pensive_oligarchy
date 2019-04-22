import React, { Component } from 'react';

import Sound from 'react-sound';

import IntroModal from './IntroModal';
import VideoList from './videos';
import VideoModal from './VideoModal';

class App extends Component {
  constructor() {
    super();
    this.state = {
      backgroundAudio: false,
      isOpen: true,
      initialized: false,
      overlay: false,
      width: 0,
      height: 0,
      loading: true,
    };
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ ...this.state, loading: false });
    }, 1000);
    window.addEventListener('resize', this.updateDimensions);
  }

  toggleBackgroundAudio = value => {
    if ([true, false].includes(value)) {
      this.setState({
        ...this.state,
        backgroundAudio: value,
      });
    } else {
      this.setState({
        ...this.state,
        backgroundAudio: !this.state.backgroundAudio,
      });
    }
  };

	toggleMap = value => {
		window.location.href = "https://achangingvalley.com";
	}


  onClick = () => {
    this.toggleModal();
  };

  updateDimensions = () => {
    let w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight || e.clientHeight || g.clientHeight;

    this.setState({ ...this.state, width: x, height: y });
  };

  toggleModal = () => {
    this.setState({ ...this.state, isOpen: !this.state.isOpen });
  };

  initiateExperience = () => {
    this.setState({ ...this.state, isOpen: false, initialized: true });

    setTimeout(() => {
      this.setState({ ...this.state, overlay: true });
    }, 1000);

    setTimeout(() => {
      this.setState({ ...this.state, overlay: false });
    }, 7000);
  };

  render() {
    if (this.state.loading) {
      return <div className="absolute w-100 h-100 landing" />;
    }

    let { isOpen, overlay, initialized, backgroundAudio, mapIsOpen } = this.state;
    return (
      <div className="wrapper w-100 h-100 bg-near-black near-white">
        <div className="pt-main pt-perspective w-100 h-100">
          <div className="flex flex-column items-center">
            <div className="absolute w-100 h-100 landing" />
            <div className="absolute w-100 h-100 tv" />
            <div className="absolute w-100 h-100 vhs" onClick={this.onClick} />
            {initialized && (
              <div
                className={`absolute w-100 h-100 vhs-overlay ${
                  overlay ? ' animated infinite slower flash' : 'dn'
                }`}
                onClick={this.onClick}
              />
            )}
          </div>
          <div
            className={`fixed right-10 top-10 pa2 pointer ttu tracked ${
              backgroundAudio ? '' : 'strike silver'
            }`}
            onClick={() => this.toggleBackgroundAudio()}>
            Audio
          </div>
          <div
            className="fixed right-10 top-2 pa2 pointer ttu tracked"
            onClick={() => this.toggleMap()}>
           Map
          </div>
        </div>

        {!initialized ? (
          <IntroModal open={isOpen} close={this.initiateExperience} />
        ) : (
          <VideoModal
            open={isOpen}
            close={this.toggleModal}
            videos={VideoList}
            toggleBackgroundAudio={this.toggleBackgroundAudio}
          />
        )}
        {backgroundAudio && <Sound url="/audio/background.mp3" playStatus={Sound.status.PLAYING} />}
      </div>
    );
  }
}

export default App;
