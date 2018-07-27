import React from 'react';
// import ReactDOM from 'react-dom';
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
    this.socket = socketIOClient('http://localhost:3000');
    
  }
  
  // send() {
  //   const socket = socketIOClient(this.state.endpoint);
  //   socket.emit('add grocery', this.state.groceryList)
  // }

  componentDidMount() {
    this.getGroceries()
    this.socket.on('update list', (data) => {
      console.log('socket data: ', data)
      this.setState({groceryList: data})
    })
  }


  getGroceries() {
    axios.get('/list')
      .then((response) => {
        console.log('grocery list: ', response.data)
        this.setState({groceryList: response.data})
        this.socket.emit('update list', this.state.groceryList)
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
        this.setState({groceryList: [...this.state.groceryList, this.state.groceryItem]})
        this.getGroceries()
        // console.log('done')
        // this.socket.emit('update list', this.state.groceryList)
        console.log('client emitted')
      })
      
  }

  renderDelete(food) {
    // e.preventDefault();
    console.log(food)
    axios.post('/delete', {params: {item: food}})
      .then((response) => {
        // this.socket.emit('update list', this.state.groceryList)
        console.log('client emitted')
        this.getGroceries();
        // this.socket.emit('update list', this.state.groceryList)
      })
      
  }

  // componentWillUnmount() {
  //   this.socket.close()
  // }

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