import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tierInfoModal: false,
      phoneNumber: '',
      validNumber: false,
      username: ''
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
  }

  handleFieldChange ( e ) {
    this.setState({
      [ e.target.id ]: e.target.value
    });
  }

  handlePhoneNumberChange ( e ) {
    this.isValidPhoneNumber (e.target.value);
    this.setState({
      phoneNumber: e.target.value,
    });
  }

  render () {
    // if ( this.props.googleUserData ) {
      return (    
        <div className="signup-form center-text">
          <h3>Get Started</h3>
          <Form horizontal>

            <FormGroup controlId="email">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                onChange={ this.handleFieldChange }
                // value={ this.props.googleUserData.email }
                disabled="true"/>
            </FormGroup>

            <FormGroup controlId="fullName" >
              <ControlLabel>Full Name</ControlLabel>
              <FormControl
                onChange={ this.handleFieldChange }
                // value={ this.props.googleUserData.displayName }
                disabled="true"/>
            </FormGroup>

            <FormGroup 
              controlId="username"
              validationState={ this.state.username.length > 4 ? 'success' : 'error'}>
              <ControlLabel>Username</ControlLabel>
              <FormControl
                onChange={ this.handleFieldChange }/>
              <FormControl.Feedback />
              <HelpBlock>
                { this.state.username.length > 4 ? null : 'Username must have at least 5 characters' }
              </HelpBlock> 
            </FormGroup>

          </Form>
          <Button>Get Lysting!</Button>

        </div>
      );
    
  }
}

export default Signup;