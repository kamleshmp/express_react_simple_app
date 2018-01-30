var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
  models.Message.create({
    contactId: req.body.contactId,
    description: req.body.description
  }).then(function(message) {
    res.json({status: 200, data: message});
  });
});

router.get('/', function(req, res) {
  res.json(200);
});

router.get('/contact/:contact_id/message/:message_id/destroy', function(req, res) {
  models.Message.destroy({
    where: {
      id: req.params.message_id,
      contactId: req.params.contact_id
    }
  }).then(function() {
    res.redirect({status: 200, message: 'destroy successfully'});
  });
});

router.put('/:id', function(req, res) {
  models.Message.update({
    description: req.body.description
  },{
    where: {
      id: req.params.id,
      contactId: req.body.contactId
    }
  }).then(function() {
    models.Message.find({
      where: {
        id: req.params.id
      }
    }).then(function(messsage) {
      res.json({status: 200, data: messsage});
    });
  });
});

router.delete('/:id', function(req, res) {
  models.Message.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(messsage) {
    res.json({status: 200, data: req.params.id});
  });
});

module.exports = router;
