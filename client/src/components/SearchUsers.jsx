import React from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

class SearchUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      placeholder: 'Search for players by email or username',
      value: '',
      suggestions: [],
      users: []
    };

    this.getUsers = this.getUsers.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this)
  }

  componentDidMount () {
    this.getUsers();
  }

  getUsers () {
    axios.get('/users')
    .then((response) => {
      console.log('all users:', response.data)
      this.setState({users: response.data})
    })
    .catch((err) => {
      console.log(err)
    })
  }

  onChange ( event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  escapeRegexCharacters ( str ) {
    return str.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );
  }
  
  getSuggestions ( value ) {
    const escapedValue = this.escapeRegexCharacters( value.trim() );
    if ( escapedValue === '' ) {
      return [];
    }
  
    const regex = new RegExp( '^' + escapedValue, 'i' );
  
    return this.state.users.filter( user => (
        regex.test ( user.email )
    ));
  }
  
  getSuggestionValue ( suggestion ) {
    return suggestion.email;
  }

  onSuggestionsFetchRequested ({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    });
  }

  renderSuggestion ( suggestion ) {
    return (
      <div>
        {suggestion.email}
      </div>
    )
  }

  render () {

    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search for players...',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest 
        suggestions={ this.state.suggestions }
        onSuggestionsFetchRequested={ this.onSuggestionsFetchRequested }
        onSuggestionsClearRequested={ this.onSuggestionsClearRequested }
        getSuggestionValue={ this.getSuggestionValue }
        inputProps={ inputProps }
        renderSuggestion={ this.renderSuggestion }
        onSuggestionSelected={ () => { return; } }
      />
    );
  }
}

export default SearchUsers;