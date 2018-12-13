import React, { Component } from 'react';

import ReactMapboxGl from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZnJpc2x5IiwiYSI6ImNqcGtienc4dzAxc3YzeHFtaHIweXBwMGYifQ.JqHNHjD7das_tO6Tmh-9qA',
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
          center={[-117.350373, 34.059083]}
          style="mapbox://styles/frisly/cjplsenk500hs2rjobhp7j2cp"
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
