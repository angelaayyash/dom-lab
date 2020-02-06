let form = document.querySelector("form");

class Contact {
  constructor(name, email, phone, relation) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.relation = relation;
  }
  toString() {
    return `${this.name} <${this.email}>`;
  }
}
// addressbook class
class AddressBook {
  constructor() {
    this.contacts = [];
  }
  //   methods
  add = function(name, email, phone, relation) {
    let myNewContact = new Contact(name, email, phone, relation);
    this.contacts.push(myNewContact);
  };
  deleteAt = function(index) {
    this.contacts.splice(index, 1);
  };

  getAt(index) {
    return this.contacts[index];
  }

  findContactByName(name) {
    for (let contact of this.contacts) {
      if (contact.name === name) {
        return contact;
      }
    }
  }
  findContactsByRelation(relation) {
    let contactsToReturn = [];
    for (let contact of this.contacts) {
      if (contact.relation === relation) {
        return contact;
      }
    }
    return contactsToReturn;
  }

  searchContacts(text) {
    return this.contacts.filter(contact => {
      for (let property in contact) {
        if (contact[property].includes(text)) {
          return contact;
        }
      }
    });
  }
}
// instance an AddressBook Object
let addressBook = new AddressBook();
// add contacts to the address book instance
addressBook.add("Amal Ayyash", "aayyash@gmail.com", "248.444.8258", "mother");
addressBook.add("Eddie Ayyash", "ayyashe@gmail.com", "248.444.0385", "father");
addressBook.add("David Ayyash", "dayyash@gmail.com", "313.444.9150", "brother");
addressBook.add(
  "Amanda Ayyash",
  "mandaayyash@gmail.com",
  "734.444.9150",
  "sister"
);
addressBook.add(
  "Alicia Ayyash",
  "aliciaayy@gmail.com",
  "313.444.2921",
  "sister"
);
console.log(addressBook);

function display() {
  let counter = 0;
  let container = document.querySelector(".contact-container");
  container.innerHTML = "";
  for (let contact of addressBook.contacts) {
    let card = document.createElement("div");
    let name = document.createElement("p");
    name.innerText = `Name: ${contact.name}`;
    let email = document.createElement("p");
    email.innerText = `Email: ${contact.email}`;
    let phone = document.createElement("p");
    phone.innerText = `Phone: ${contact.phone}`;
    let relation = document.createElement("p");
    relation.innerText = `Relation: ${contact.relation}`;
    let icon = document.createElement("i");
    icon.classList.add("fas", "fa-trash");
    icon.setAttribute("index-number", `${counter}`);
    card.append(name, email, phone, relation, icon);
    counter++;
    container.append(card);
    card.setAttribute("class", "contact-card");
  }
}
display();

form.addEventListener("submit", e => {
  e.preventDefault();
  const formData = new FormData(form);
  addressBook.add(
    formData.get("name"),
    formData.get("email"),
    formData.get("phone"),
    formData.get("relation")
  );
  form.reset;
  display();
});

let cardsContainer = document.querySelector(".contact-container");
cardsContainer.addEventListener("click", deleted);

function deleted(e) {
  if (e.target.className === "fas fa-trash") {
    let trashIndex = e.target.getAttribute("index-number");
    addressBook.deleteAt(trashIndex);
    display();
  }
}
