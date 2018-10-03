import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import SearchUsers from './SearchUsers.jsx';
import axios from 'axios';

class Shared extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connections: [],
      modalOpen: false
    }

    this.hideModal = this.hideModal.bind(this);
    this.addConnection = this.addConnection.bind(this);

  }

  handleShareClick() {
    this.setState({modalOpen: true})
  }

  hideModal() {
    this.setState({modalOpen: false})
  }

  addConnection (email) {
    axios.post('/connections', 
      {params: {
        list: this.props.listId,
        email: email
      }})
    .then(() => {
      return;
    })
    .catch((err) => {
      console.log(err);
    })
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

            <SearchUsers addConnection={ this.addConnection }/>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal}>Close!</Button>
          </Modal.Footer>
        </Modal>
    </div>
    )
  }
};

export default Shared;