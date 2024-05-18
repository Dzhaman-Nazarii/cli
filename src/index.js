const contacts = require('./contacts.js');
const {program} = require('commander');
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'id user')
  .option('-n, --name <type>', "name user")
  .option('-e, --email <type>', 'email user')
  .option('-p, --phone <type>', 'phone user');
 
program.parse(process.argv);
const options = program.opts();

async function invokeAction({action, id, name, email, phone}) {
  switch(action) {
    case 'list' :
      const listContacts = await contacts.listContacts();
      return listContacts;
    case 'get' :
      const contact = await contacts.getContactById(id)
      return contact;
    case 'add' :
      const newContact = await contacts.addContact(name, email, phone);
      return newContact;
    case 'update' :
      const updatedContact = await contacts.updatedContact(id, {name, email, phone});
      return updatedContact;
    case 'remove' :
      const deleteContact = await contacts.removeContact(id);
      return deleteContact;
    default :
      throw new Error ('Invalid action');
  }
}

invokeAction(options).then(console.log).catch(console.error)

// contacts.listContacts().then(console.log).catch(console.error);
// contacts.getContactById('rsKkOQUi80UsgVPCcLZZW').then(console.log).catch(console.error);
// contacts.addContact("NEW Raymond", "NEW.ante@vestibul.co.uk", "(133) 914-3792").then(console.log).catch(console.error);
// contacts.updateContact('1DEXoP8AuCGYc1YgoQ6hw', 
//   {
//     name: 'Update Raymond',
//     email: 'update.ante@vestibul.co.uk',
//     phone: '(133) 914-3792'
//   }
// ).then(console.log).catch(console.error);
// contacts.removeContact('rsKkOQUi80UsgVPCcLZZW').then(console.log).catch(console.error);

// invokeAction({action: 'list'}).then(console.log).catch(console.error);