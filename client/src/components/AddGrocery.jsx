import React from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client'
import Shared from './Shared.jsx';
import { Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';

class AddGrocery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groceryList: [], 
      groceryItem: '',
      list: '',
      list_id: 1,
      lists: []
    }

    this.getGroceries = this.getGroceries.bind(this)
    this.getLists = this.getLists.bind(this)
    this.renderGroceryInput = this.renderGroceryInput.bind(this)
    this.addGrocery = this.addGrocery.bind(this)
    this.renderDelete = this.renderDelete.bind(this)
    this.renderListInput = this.renderListInput.bind(this)
    this.addList = this.addList.bind(this)
    this.renderListId = this.renderListId.bind(this)
    this.socket = socketIOClient();
    
  }
  
  // send() {
  //   const socket = socketIOClient(this.state.endpoint);
  //   socket.emit('add grocery', this.state.groceryList)
  // }

  componentDidMount() {
    this.getGroceries()
    this.getLists()
    this.socket.on('update list', (data) => {
      console.log('socket data: ', data)
      this.setState({groceryList: data})
    })
    // this.socket.on('change list', (data) => {
    //   console.log('socket data for change: ', data)
    //   this.setState({list_id: data})
    // })
  }


  getGroceries() {
    axios.get('/grocery', {params: {list_id:this.state.list_id}})
      .then((response) => {
        console.log('grocery list: ', response.data)
        this.setState({groceryList: response.data})
        this.socket.emit('update list', this.state.groceryList)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getLists() {
    axios.get('/list')
      .then((response) =>  {
        console.log('get list response', response.data)
        this.setState({lists: response.data})
        this.socket.emit('update list', this.state.groceryList)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  renderGroceryInput(e) {
    e.preventDefault();
    this.setState({groceryItem: e.target.value})
  }



  addGrocery(e) {
    e.preventDefault();
    console.log('currentItem: ', this.state.groceryItem)
    axios.post('/grocery', {params : {item: this.state.groceryItem, list_id: this.state.list_id}})
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

  renderListInput(e) {
    e.preventDefault()
    this.setState({list: e.target.value})
  }

  addList() {
    axios.post('/list', {params: {list: this.state.list}})
      .then((response) => {
        console.log(response)
        this.setState({lists: [...this.state.lists, this.state.list]})
        this.getLists()
      })
      .catch((err) => {
        console.log(err)
      })
    
    
  }

  renderListId(e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({list_id: e.target.value}, this.getGroceries)
    console.log("list state: ", this.state.list_id)
    // this.socket.emit('change list', this.state.list_id)
    
    
  }

  // componentWillUnmount() {
  //   this.socket.close()
  // }

  render() {

    const listSelect = this.state.lists.map((list, idx) => {
      return (
        <option key={ idx } value={ idx + 1 }>{ list.list }</option>
      )
    })


    const groceries = this.state.groceryList.map((grocery, idx) => {
      return (
      <div key={ idx }>
      {grocery.food}
      <img className="foodPic"src='http://d16d1dwb6hz1ty.cloudfront.net/wp-content/uploads/2017/03/09020329/How-deos-your-grocery-cart-look-like-pic.jpg'/>
      <button onClick={ () => this.renderDelete(grocery.food) }>Remove</button>
      </div>
      )
    })

    // const socket = socketIOClient(this.state.endpoint);
    // socket.on('add grocery', (groceryList) => {
    //   // this.addGrocery();
    //   this.setState({groceryList: groceryList});
    // })

    return (
      <div className='signup-form'>
      <Shared />
        <div>

          <Form horizontal>

            <FormGroup controlId="groceryItem">
              <ControlLabel>Grocery</ControlLabel>
              <FormControl
                onChange={ this.renderGroceryInput }
                placeholder="Grocery Item"
                />
            </FormGroup>
            <Button 
              type="submit"
              onClick={ this.addGrocery }>
              Add Grocery Item
            </Button>

          </Form>
          
          {/* <input onChange={ this.renderGroceryInput }/>
          <button onClick={ this.addGrocery } >Add Grocery</button> */}
        </div>

        <div>

          <Form horizontal>

            <FormGroup controlId="groceryList">
              <ControlLabel>Grocery List</ControlLabel>
              <FormControl
                onChange={ this.renderListInput }
                placeholder="Grocery List"
                />
            </FormGroup>
            <Button 
              type="submit"
              onClick={ this.addList }>
              Add Grocery List
            </Button>

            </Form>

          {/* <input onChange={ this.renderListInput }/>
          <button onClick={ this.addList }>Add Grocery List</button> */}
          <select onChange={ this.renderListId }>
            { listSelect }
          </select>
        </div>
        <div>
          {groceries}
        </div>
      </div>
    )
  }

}

  export default AddGrocery;