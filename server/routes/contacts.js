var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
  models.Contact.create({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone
  }).then(function(contact) {
    res.json({status: 200, data: contact});
  });
});

router.get('/', function(req, res) {
  models.Contact.findAll({
  }).then(function(contacts) {
    res.json({status: 200, data: contacts});
  });
});

router.get('/:id', function(req, res) {
  models.Contact.find({
    include: [{model: models.Message}],
    where: {
      id: req.params.id
    }
  }).then(function(contact) {
    res.json({status: 200, data: contact});
  });
});

router.delete('/:id', function(req, res) {
  models.Contact.destroy({
    where: {
      id: req.params.id
    }
  }).then(function() {
    models.Contact.findAll({
    }).then(function(contacts) {
      res.json({status: 200, message: 'destroy successfully', data: contacts});
    });
  });
});

router.put('/:id', function(req, res) {
  models.Contact.update({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone
  },{
    where: {
      id: req.params.id
    }
  }).then(function(contact) {
    models.Contact.findAll({
    }).then(function(contacts) {
      res.json({status: 200, data: contacts});
    });
  });
});

module.exports = router;
