import React, { Component } from 'react';
import Modal from 'react-modal';

class IntroModal extends Component {
  render() {
    return (
      <Modal
        className="center z-10 o-100 near-white initial-modal br-50"
        isOpen={this.props.open}
        overlayClassName={{
          base: 'dn',
          afterOpen:
            'db flex items-center w-100 h-100 fixed top-0 bottom-0 left-0 right-0 z-0 bg-near-black--o-50',
        }}
        onRequestClose={this.props.close}
        shouldCloseOnEsc={true}>
        <div className="pa5-ns pa4-m pa3 tc br-50 br-near-white w-100 h-100 flex flex-column items-center">
          <p className="">
           Welcome home
          </p>
          <div
            className="button br2 pa2 mt3 bg-near-white near-black pointer ttu tracked b"
            onClick={this.props.close}>
            Begin or whatnot
          </div>
        </div>
      </Modal>
    );
  }
}

export default IntroModal;
