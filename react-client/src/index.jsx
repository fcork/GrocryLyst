import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import axios from 'axios';
import AddGrocery from './components/AddGrocery.jsx';
// import socketIOClient from 'socket.io-client'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      groceryList: ['apples, bananas'], 
    }
    // this.addGrocery = this.addGrocery.bind(this)
    // this.getGroceries = this.getGroceries.bind(this)
  }

  // componentDidMount() {
  //   // this.getGroceries();
  // }

  // send() {
  //   const socket = socketIOClient(this.state.endpoint);
  //   socket.emit('client action', this.state.color)
  // }

  // getGroceries() {
  //   axios.get('/list')
  //     .then((response) => {
  //       console.log(response.data)
  //       this.setState({groceryList: response})
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  // addGrocery(e) {
  //   e.preventDefault();
  //   console.log(e.target.value)
  //   axios.post('/list', {params : {item: e.target.value}})
  //     .then((response) => {
  //       this.setState({groceryList: [...groceryList, e.target.value]})
  //     })
  // }

  render () {
    return (<div>
      <h1>Grocery List</h1>
      <AddGrocery />
      {/* <List items={this.state.items}/> */}
      {/* <button>Add Grocery</button> */}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));