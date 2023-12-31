const fs = require("fs");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

//mengambil semua data contact
const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

//mengambil data contact sesuai dengan nama
const findContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find((contact) => contact.nama === nama);
  return contact;
};

//nimpa data json
const saveContact = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

//push data pada variable contacts
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContact(contacts);
};

const checkDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
};

//hapus data conctact
const deleteContact = (nama) => {
  const contacts = loadContact();
  const filterContacts = contacts.filter((contact) => contact.nama !== nama);

  saveContact(filterContacts);
};

//edit data contact
const updateContacts = (contactBaru) => {
  const contacts = loadContact();

  const filterContacts = contacts.filter(
    (contact) => contact.nama !== contactBaru.oldNama
  );
  delete contactBaru.oldNama;

  filterContacts.push(contactBaru);
  saveContact(filterContacts);
};

module.exports = {
  loadContact,
  findContact,
  addContact,
  checkDuplikat,
  deleteContact,
  updateContacts,
};
