import React, { Component } from 'react';
import ContactForm from './contact_form';
import { connect } from 'react-redux';
import { getContact } from '../../actions/contact';
import { addMessage, editMessage, deleteMessage} from '../../actions/message';
import { bindActionCreators }       from 'redux';
import { Link } from 'react-router-dom';
import Modal from 'simple-react-modal';

class ContactDetail extends Component {
  constructor(props, context){
    super(props, context);
    this.closeModal = this.closeModal.bind(this);
    this.openModel = this.openModel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.createMessasgesList = this.createMessasgesList.bind(this);
    this.state = {
      openModel: false,
      contactMessages: [],
      edit: false,
      editMessage: {},
      deleteMsg: false
    }
  }

  componentWillReceiveProps(nextProps){
    let contactMessages = nextProps.contact.contact ? nextProps.contact.contact.Messages : [];

    if(nextProps.newMessage && !this.state.edit && !this.state.deleteMsg) {
      contactMessages.push(nextProps.newMessage.data);
    }

    if(nextProps.editedMsg && this.state.edit) {
      const tmpMessages = _.clone(contactMessages);
      contactMessages = _.map(tmpMessages, (msg)=>{
        if(nextProps.editedMsg.id == msg.id) {
          msg.description = nextProps.editedMsg.description;
        }
        return msg;
      });
    }

    if(nextProps.deletedMsg && this.state.deleteMsg) {
      const tcontactMessages = _.remove(contactMessages, function(n) {
        return n.id == nextProps.deletedMsg;
      });
    }
    this.setState({contactMessages: contactMessages, deleteMsg: false});
  }

  componentWillMount(){
    this.props.getContact(this.props.match.params.id);
  }

  closeModal() {
    this.setState({openModel: false});
  };

  openModel() {
    this.setState({openModel: true, formValid: true, description: '', edit: false});
  };

  handleChange(e){
    this.setState({description: e.target.value, formValid: !e.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.edit) {
      this.props.editMessage(this.state.editMessage.id, {description: this.state.description, contactId: this.state.editMessage.contactId});
    } else {
      this.props.addMessage({description: this.state.description, contactId: this.props.match.params.id});
    }

    this.closeModal();
  }

  editMessage(e, message){
    this.setState({openModel: true, formValid: true, editMessage: message,
      description: message.description, edit: true, formValid: false });
  }

  deleteMessage(e, message){
    this.setState({deleteMsg: true});
    this.props.deleteMessage(message.id);
  }

  createMessasgesList(message) {
    return <tr key={message.id}>
      <td>{message.description}</td>
      <td><a href="javascript:void(0)" onClick={(e) => {this.editMessage(e, message)}}>Edit</a></td>
      <td><a href="javascript:void(0)" onClick={(e) => {this.deleteMessage(e, message)}}>Delete</a></td>
    </tr>
  }

  render() {
    const messages = _.map(this.state.contactMessages, this.createMessasgesList)
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-10">
            <table className="table">
              <thead>
                <tr>
                  <th>Message Description</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {messages}
              </tbody>
            </table>
          </div>
          <div className="col-sm-2">
            <button type="button" onClick={(e)=> {this.openModel()}}>Add Message</button>
          </div>
        </div>
        <Modal id="add-message" show={this.state.openModel} onClose={(e)=> { this.closeModal()}} containerStyle={{width: 600}}>

            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Message Description </label>
                <br/>
                <br/>
                <textarea rows="4" cols="50" className="form-control" id="description" onChange={(e) => {this.handleChange(e)}} value={this.state.description}/>
              </div>
              <button type="submit" className="btn btn-primary" disabled={this.state.formValid}>Submit</button>
            </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contact: state.contact,
    message: state.message.messages,
    deletedMsg: state.message.deletedMsg,
    editedMsg: state.message.editedMsg,
    newMessage: state.message.newMessage
  }
};

function matchDispatchToProps(dispatch){
  return bindActionCreators({getContact, addMessage, editMessage, deleteMessage},dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(ContactDetail);