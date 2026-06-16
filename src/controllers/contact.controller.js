import Contact from '../models/contact.model.js';

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: "error when fetching contacts", error });
    }
};

export const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (contact) {
            res.json(contact);
        } else {
            res.status(404).json({ message: "name not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "error when fetching contact", error });
    }
};

export const createContact = async (req, res) => {
    try {
        const newContact = new Contact({
            name: req.body.name,
            phone: req.body.phone
        });
        await newContact.save();
        res.status(201).json({ message: "name added", data: newContact });
    } catch (error) {
        res.status(400).json({ message: "failed to add name", error });
    }
};

export const updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, phone: req.body.phone },
            { new: true }
        );
        if (updatedContact) {
            res.json({ message: "name updated", data: updatedContact });
        } else {
            res.status(404).json({ message: "name not found" });
        }
    } catch (error) {
        res.status(500).json({ message: " error when updating contact", error });
    }
};

export const deleteContact = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (deletedContact) {
            res.json({ message: "deleted name" });
        } else {
            res.status(404).json({ message: "name not found" });
        }
    } catch (error) {
        res.status(500).json({ message: " error when deleting contact", error });
    }
};
