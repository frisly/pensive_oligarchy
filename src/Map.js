import React, { Component } from 'react';

import ReactMapboxGl from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiY29nbml0aXZlcmVmbGV4IiwiYSI6ImNpczUxZWFqcDA5d2EyenAxb3RvdHNmNmgifQ.3svWwUzt3UwvZkjGk_EdcQ',
  scrollZoom: true,
  touchZoomRotate: false,
  attributionControl: false,
  dragRotate: false,
});

class MapModal extends Component {
  constructor() {
    super();
    this.state = {
      videoIndex: null,
    };
  }

  handleChange = event => {
    this.setVideo(event.target.value);
  };

  render() {
    let { videoIndex } = this.state;
    let { videos } = this.props;
    return (
      <div className="w-100 h-100">
        <Map
          className="w-100 h-100"
          containerStyle={{ width: '100vw', height: '100vh' }}
          pitch={[30]}
          center={[-117.39642, 34.06317]}
          style="mapbox://styles/cognitivereflex/cjn3ttbla085g2sk48j42e8pu"
        />
        <div
          className="fixed top-1 right-1 pa2 pointer ttu tracked near-black"
          onClick={() => this.props.toggle(false)}>
          Exit
        </div>
      </div>
    );
  }
}

export default MapModal;
