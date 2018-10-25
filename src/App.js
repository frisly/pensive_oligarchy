import React, { Component } from 'react';

import Modal from 'react-modal';
import Sound from 'react-sound';

import VideoList from './videos';
import VideoDisplay from './VideoDisplay';
import Map from './Map';

class App extends Component {
  constructor() {
    super();
    this.state = {
      backgroundAudio: true,
      mapIsOpen: false,
      isOpen: false,
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
    }, 500);
    setTimeout(this.toggleModal, 1000);
    window.addEventListener('resize', this.updateDimensions);
  }

  toggleMap = value => {
    this.setState({
      ...this.state,
      mapIsOpen: value ? value : !this.state.mapIsOpen,
    });
  };

  toggleBackgroundAudio = value => {
    console.log(value);
    this.setState({
      ...this.state,
      backgroundAudio: value ? value : !this.state.backgroundAudio,
    });
  };

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
          <Modal
            className="center z-10 o-100 near-white initial-modal br-50"
            isOpen={isOpen}
            overlayClassName={{
              base: 'dn',
              afterOpen:
                'db flex items-center w-100 h-100 fixed top-0 bottom-0 left-0 right-0 z-0 bg-near-black--o-50',
            }}
            onRequestClose={this.initiateExperience}
            shouldCloseOnEsc={true}>
            <div className="pa5-ns pa4-m pa3 tc br-50 br-near-white w-100 h-100 flex flex-column items-center">
              <p className="">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
                excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                officia deserunt mollitia animi, id est laborum et dolorum fuga.
              </p>
              <div
                className="button br2 pa2 mt3 bg-near-white near-black pointer ttu tracked b"
                onClick={this.initiateExperience}>
                Begin or whatnot
              </div>
            </div>
          </Modal>
        ) : (
          <Modal
            className="center z-10 o-100 near-white video-modal br-50"
            isOpen={isOpen}
            overlayClassName={{
              base: 'dn',
              afterOpen:
                'db flex items-center w-100 h-100 fixed top-0 bottom-0 left-0 right-0 z-0 bg-near-black--o-50',
            }}
            onRequestClose={this.toggleModal}
            shouldCloseOnEsc={true}>
            <div className="pa3 tc br-50 br-near-white w-100 h-100 flex flex-column items-center">
              <VideoDisplay videos={VideoList} toggleBackgroundAudio={this.toggleBackgroundAudio} />
            </div>
          </Modal>
        )}
        {backgroundAudio && <Sound url="/audio/background.mp3" playStatus={Sound.status.PLAYING} />}
        {mapIsOpen && <Map toggle={this.toggleMap} videos={VideoList} />}
      </div>
    );
  }
}

export default App;
