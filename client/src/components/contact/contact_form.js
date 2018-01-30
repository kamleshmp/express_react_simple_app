import React, { Component } from 'react';

class ContactForm extends Component {
  constructor(props, context){
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);

    this.state = {contact: {
        name: '',
        lastName: '',
        email: '',
        phone: ''
      },
      formErrors: {email: '', phone: ''},
      emailValid: false,
      phoneValid: false,
      formValid: false
    }
  }

  handleChange(e, field){
    const contact = this.state.contact;
    contact[field] = e.target.value
    this.setState(contact);
    const value = e.target.value;
    this.setState({[field]: value},
                () => { this.validateField(field, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'phone':
        var phoneno = /^\d{10}$/;
        phoneValid = value.match(phoneno)
        fieldValidationErrors.phone = phoneValid ? '': ' number is invalid, use 10 digit';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    phoneValid: phoneValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.phoneValid});
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.type == 'edit') {
      this.setState({contact: {name: nextProps.contact.name,
        lastName: nextProps.contact.lastName,
        email: nextProps.contact.email,
        phone: nextProps.contact.phone,
      }, emailValid: true, phoneValid: true, formValid: true});
    }
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.handleSubmit(event, this.state.contact);
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  validationErrors(formErrors){
    return Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <div key={i} className="alert alert-danger">{fieldName} {formErrors[fieldName]}</div>
        )
      } else {
        return '';
      }
    })
  }

  render() {
    return (
      <div className="container">

          {this.validationErrors(this.state.formErrors)}

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" onChange={(e) => {this.handleChange(e, 'name')}} value={this.state.contact.name}/>
          </div>
          <div className="form-group">
            <label>Last name:</label>
            <input type="text" className="form-control" onChange={(e) => {this.handleChange(e, 'lastName')}} value={this.state.contact.lastName}/>
          </div>
           <div className="form-group">
            <label>Email:</label>
            <input type="text" className="form-control" onChange={(e) => {this.handleChange(e, 'email')}} value={this.state.contact.email}/>
          </div>
           <div className="form-group">
            <label>Phone:</label>
            <input type="text" className="form-control" onChange={(e) => {this.handleChange(e,'phone')}} value={this.state.contact.phone}/>
          </div>

          <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Submit</button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
