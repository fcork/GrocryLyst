import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import SearchUsers from './SearchUsers.jsx';

class Shared extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connections: [],
      modalOpen: false
    }
    this.hideModal = this.hideModal.bind(this);
  }

  handleShareClick() {
    this.setState({modalOpen: true})
  }

  hideModal() {
    this.setState({modalOpen: false})
  }

  render () {
    return (
      <div>
      <Button onClick={ () => this.setState({ modalOpen: true })}>
      Shared This List With Roommates
      </Button>
      <Modal
          show={this.state.modalOpen}
          onHide={this.hideModal}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Search for friends
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SearchUsers />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
    </div>
    )
  }
};

export default Shared;