import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/header';
import Contacts from './components/contact/contacts';
import AddContact from './components/contact/add_contact';
import EditContact from './components/contact/edit_contact';
import ContactDetail from './components/contact/contact_detail';

const App = () => (
  <div>
    <Header />
    <Route exact path="/" component={Contacts} />
    <Route exact path="/contact/new" component={AddContact} />
    <Route exact path="/contacts/:id/edit" component={EditContact} />
    <Route exact path="/contacts/:id" component={ContactDetail} />

  </div>
);

export default App;
