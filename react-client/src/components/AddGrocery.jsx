import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import socketIOClient from 'socket.io-client'


class AddGrocery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groceryList: [], 
      groceryItem: '',
      endpoint: "http://localhost:3000"
    }
    // this.send = this.send.bind(this)
    this.getGroceries = this.getGroceries.bind(this)
    this.renderInput = this.renderInput.bind(this)
    this.addGrocery = this.addGrocery.bind(this)
    this.socket = socketIOClient('http://localhost:3000')
    // this.socket.on('add grocery', (data) => {
    //   this.setState({groceryList: data})
    // })
  }
  
  // send() {
  //   const socket = socketIOClient(this.state.endpoint);
  //   socket.emit('add grocery', this.state.groceryList)
  // }

  componentDidMount() {
    this.getGroceries()
  }


  getGroceries() {
    axios.get('/list')
      .then((response) => {
        console.log(response.data)
        this.setState({groceryList: response.data})
      })
      .catch((err) => {
        console.log(err)
      })
  }

  renderInput(e) {
    e.preventDefault();
    this.setState({groceryItem: e.target.value})
    console.log('state: ', this.state.groceryItem)
  }



  addGrocery() {
    // e.preventDefault();
    console.log('currentItem: ', this.state.groceryItem)
    axios.post('/list', {params : {item: this.state.groceryItem}})
      .then((response) => {
        this.setState({groceryList: [this.state.groceryItem, ...this.state.groceryList]})
        this.getGroceries()
        // console.log('done')
      })
      // this.socket.emit('send list', this.state.groceryList)
  }

  renderDelete(food) {
    // e.preventDefault();
    console.log(food)
    axios.post('/delete', {params: {item: food}})
      .then((response) => {
        this.getGroceries();
      })
  }

  render() {


    const groceries = this.state.groceryList.map((grocery, idx) => {
      return (
      <div onClick={ () => this.renderDelete(grocery.food) } key={ idx }>
      {grocery.food}
      <img className="foodPic"src='https://images-na.ssl-images-amazon.com/images/I/71gI-IUNUkL._SX522_.jpg'/>
      </div>
      )
    })

    // const socket = socketIOClient(this.state.endpoint);
    // socket.on('add grocery', (groceryList) => {
    //   // this.addGrocery();
    //   this.setState({groceryList: groceryList});
    // })

    return (
      <div>
          <input onChange={ this.renderInput }/>
          <button onClick={ this.addGrocery } >Add Grocery</button>
        <div>
          {groceries}
        </div>
        <h3>{this.state.groceryItem}</h3>
      </div>
    )
  }

}

  export default AddGrocery;