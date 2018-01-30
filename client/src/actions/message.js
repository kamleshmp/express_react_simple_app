"use strict";
import Constants   from   "../constants";
import Api         from   "./api";

export const addMessage = (data) => {
  return function(dispatch){
    Api.post('/messages/create', data).then(function(res,err){
      return dispatch({
        type: Constants.ADD_MESSAGE,
        payload: res
      });
    });
  }
};

export const deleteMessage = (id) => {
  return function(dispatch){
    Api.delete(`/messages/${id}`).then(function(res,err){
      return dispatch({
        type: Constants.DELETE_MESSAGE,
        payload: res.data
      });
    });
  }
};

export const editMessage = (id, data) => {
  return function(dispatch){
    Api.put(`/messages/${id}`, data).then(function(res,err){
      return dispatch({
        type: Constants.EDIT_MESSAGE,
        payload: res.data
      });
    });
  }
};

export const getMessage = (id) => {
  return function(dispatch){
    Api.get(`/messages/${id}`).then(function(res,err){
      return dispatch({
        type: Constants.GET_MESSAGE,
        payload: res.data
      });
    });
  }
};

export const getAllMessages = (contactId) => {
  return function(dispatch){
    Api.get(`messages/${contactId}`).then(function(res,err){
      return dispatch({
        type: Constants.GET_MESSAGES,
        payload: res.data
      });
    });
  }
};

