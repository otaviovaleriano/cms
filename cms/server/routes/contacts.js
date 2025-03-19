const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const sequenceGenerator = require('./sequenceGenerator');

// GET all contacts (Populates the group property)
router.get('/', (req, res, next) => {
    Contact.find()
        .populate('group')
        .then(contacts => {
            res.status(200).json(contacts);
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

// POST a new contact
router.post('/', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId("contacts");

    const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        group: req.body.group || []
    });

    contact.save()
        .then(createdContact => {
            res.status(201).json({
                message: 'Contact added successfully',
                contact: createdContact
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

// PUT (Update) an existing contact
router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
        .then(contact => {
            if (!contact) {
                return res.status(404).json({
                    message: 'Contact not found'
                });
            }

            contact.name = req.body.name;
            contact.email = req.body.email;
            contact.phone = req.body.phone;
            contact.imageUrl = req.body.imageUrl;
            contact.group = req.body.group || [];

            return Contact.updateOne({ id: req.params.id }, contact);
        })
        .then(result => {
            res.status(204).json({
                message: 'Contact updated successfully'
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

// DELETE a contact
router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
        .then(contact => {
            if (!contact) {
                return res.status(404).json({
                    message: 'Contact not found'
                });
            }

            return Contact.deleteOne({ id: req.params.id });
        })
        .then(result => {
            res.status(204).json({
                message: "Contact deleted successfully"
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

module.exports = router;
