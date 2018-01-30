import React, { Component } from 'react';
import ContactForm from './contact_form';
import { connect } from 'react-redux';
import {getContact, addContact, deleteContact, getAllContacts} from '../../actions/contact';
import { bindActionCreators }       from 'redux';

class AddContact extends Component {
  constructor(props, context){
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event, data) {
    event.preventDefault();
    this.props.addContact(data);
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="container">
        <ContactForm
        handleSubmit = {this.handleSubmit}
        handleChange = {this.handleChange} />
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    contact: state.connect
  }
};


function matchDispatchToProps(dispatch){
  return bindActionCreators({addContact},dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(AddContact);