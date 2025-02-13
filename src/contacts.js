const fs = require('node:fs').promises;
const path = require('node:path');
const crypto = require('node:crypto');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function read(){
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
}

async function write(data) {
    return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function listContacts() {
    const data = await read();
    return data;
}
  
async function getContactById(contactId) {
    const data = await read();
    return data.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
    const data = await read();
    const removeContact = data.find((contact) => contact.id === contactId);
    const newData = data.filter((contact) => contact.id !== contactId);
    await write(newData);
    return removeContact;
}

async function addContact(name, email, phone) {
    const data = await read();
    const newContact = {
        id: crypto.randomUUID(),
        name,
        email,
        phone
    }
    data.push(newContact);
    await write(data);
    return newContact.id;
}

async function removeContact(contactId) {
    const data = await read();
    const index = data.findIndex((contact) => contact.id === contactId);
    const newContacts = {
        ...data.slice(0, index),
        ...data.slice(index + 1)
    };
    await write(newContacts);
    return data[index];
}

async function updateContact (contactId, contact) {
    const data = await read();
    const index = data.findIndex((contact) => contact.id === contactId);
    if(index === -1) {
        return undefined;
    }
    
    data[index] = {...contact, id: contactId };

    // const newContacts = [
    //     ...contact.slice(0, index),
    //     { ...contact, id: contactId },
    //     ...data.slice(index + 1)
    // ]

    await write(data);
    return {...contact, id: contactId}
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact
}