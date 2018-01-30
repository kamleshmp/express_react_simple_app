import React, { Component } from 'react';
import ContactForm from './contact_form';
import { connect } from 'react-redux';
import {getContact, editContact} from '../../actions/contact';
import { bindActionCreators }       from 'redux';

class EditContact extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      contact: {
        name: '',
        lastName: '',
        email: '',
        phone: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    this.props.getContact(this.props.match.params.id);
  }

  handleSubmit(event, data) {
    event.preventDefault();
    this.props.editContact(this.props.match.params.id, data);
    this.props.history.push('/');
  }

  handleChange(value, field) {
    const contact = this.state.contact;
    contact[field] = value;
  }

  render() {
    return (
      <div className="container">
        <ContactForm
        handleSubmit = {this.handleSubmit}
        handleChange = {this.handleChange}
        contact = {this.props.contact}
        type='edit' />
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    contact: state.contact.contact
  }
};


function matchDispatchToProps(dispatch){
  return bindActionCreators({getContact, editContact},dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(EditContact);