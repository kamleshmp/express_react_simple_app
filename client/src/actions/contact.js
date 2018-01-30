"use strict";
import Constants   from   "../constants";
import Api         from   "./api";

export const addContact = (data) => {
    return function(dispatch){
      Api.post('/contacts/create', data).then(function(res,err){
        return dispatch({
          type: Constants.ADD_CONTACT,
          payload: res
        });
      });
    }
};

export const deleteContact = (id) => {
    return function(dispatch){
      Api.delete(`/contacts/${id}`).then(function(res,err){
        return dispatch({
          type: Constants.GET_CONTACTS,
          payload: res.data
        });
      });
    }
  };

export const editContact = (id, data) => {
    return function(dispatch){
      Api.put(`/contacts/${id}`, data).then(function(res,err){
        return dispatch({
          type: Constants.GET_CONTACTS,
          payload: res.data
        });
      });
    }
};

export const getContact = (id) => {
    return function(dispatch){
      Api.get(`/contacts/${id}`).then(function(res,err){
        return dispatch({
          type: Constants.GET_CONTACT,
          payload: res.data
        });
      });
    }
};

export const getAllContacts = (data) => {
  return function(dispatch){
    Api.get('/contacts').then(function(res,err){
      return dispatch({
        type: Constants.GET_CONTACTS,
        payload: res.data
      });
    });
  }
};

