import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContactForm from './contact_form';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import {getContact, addContact, deleteContact, getAllContacts} from '../../actions/contact';
import { bindActionCreators }       from 'redux';
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router';

class Contacts extends Component {
    mixins: [Navigation]

  constructor(props, context){
    super(props, context);
    this.deleteContact = this.deleteContact.bind(this);
    this.showContacts = this.showContacts.bind(this);
    this.editContact = this.editContact.bind(this);
  }

  componentDidMount(){
    this.props.getAllContacts();
  }

  deleteContact(e, id){
    e.preventDefault();
    this.props.deleteContact(id);
  }

  editContact(e, id){
    e.preventDefault();
    this.props.history.push(`/contacts/${id}/edit`);
  }

  showContacts(contact) {
     return <tr key={contact.id}>
        <td>{contact.name}</td>
        <td>{contact.lastName}</td>
        <td>{contact.email}</td>
        <td>{contact.phone}</td>
        <td><a href="javascript:void(0)" onClick={(e) => {this.editContact(e, contact.id)}}>Edit</a></td>
        <td><a href="javascript:void(0)" onClick={(e) => {this.deleteContact(e, contact.id)}}>Delete</a></td>
        <td><Link to={'/contacts/'+contact.id}>Show Details</Link></td>
      </tr>
  }
  render() {
    const contacts = _.map(this.props.contacts, this.showContacts)
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Show Details</th>
            </tr>
          </thead>
          <tbody>
            {contacts}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state = {}, ownProps) => {
  return {
    contacts: state.contact.contacts
  }
};

function matchDispatchToProps(dispatch){
  return bindActionCreators({getContact: getContact,
  addContact, deleteContact, getAllContacts},dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Contacts);