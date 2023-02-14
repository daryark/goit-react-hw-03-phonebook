// import { Component } from 'react';
// import { ContactForm } from './ContactForm/ContactForm';
// import { ContactList } from './ContactList/ContactList';
// import { Filter } from './Filter/Filter';

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   handleFormSubmit = data => {
//     console.log('this is data', data);
//     this.setState({
//       contacts: [data, ...this.state.contacts],
//     });
//   };

//   filter = e => {
//     console.log(e.target.value);
//   };
//   // deleteContact = e => {
//   //   this.setState(prevState => )({
//   //     contacts: prevState.contacts.filter(({id} => id !== e.currentTarget.elements.id))
//   //   })
//   // };

//   render() {
//     return (
//       <>
//         <h1>Phone book</h1>
//         <ContactForm onSubmit={this.handleFormSubmit} />

//         <h2>Contacts</h2>
//         <Filter onChangeEvent={this.filter} filter={this.state.filter} />
//         <ContactList
//           contacts={this.state.contacts}
//           deleteContact={this.deleteContact}
//         />
//       </>
//     );
//   }
// }

import { Component } from 'react';
import { nanoid } from 'nanoid';
import { FaRegAddressBook, FaSearch } from 'react-icons/fa';

import { ContactList } from '../ContactList/ContactList';
import { ContactForm } from '../ContactForm/ContactForm';

import { Header1, Header2 } from '../common/Header/Header.styled';
import { Input, Search } from 'components/common/Input/Input.styled';
import { Section, Container, HeaderSection } from './App.styled';
import { Notification } from 'components/common/Notification/Notification.styled';

//!!!!!!!!WRITE PROPTYPES

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmit = data => {
    const { contacts } = this.state;

    if (contacts.some(contact => contact.name === data.name)) {
      alert(`${data.name} is already in your contacts!`);
      return;
    }

    this.setState({
      contacts: [...contacts, { ...data, id: nanoid() }],
    });
  };

  handleClickDelete = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  filter = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts =
      filter && contacts.length
        ? contacts.filter(({ name }) =>
            name.trim().toLowerCase().includes(filter.trim().toLowerCase())
          )
        : contacts;

    return (
      <>
        <HeaderSection>
          <Container>
            <Header1>
              <FaRegAddressBook /> Phonebook
            </Header1>
          </Container>
        </HeaderSection>

        <Section>
          <Container>
            <ContactForm submitFn={this.handleSubmit} />
            <Header2>Contacts</Header2>
            <Search htmlFor="filter">
              <FaSearch />
            </Search>
            <Input
              type="text"
              name="filter"
              id="filter"
              onChange={this.filter}
            />
            {!contacts.length ? (
              <Notification>
                You don't have contacts yet, add somebody!
              </Notification>
            ) : (
              <ContactList
                deleteContact={this.handleClickDelete}
                filter={filteredContacts}
              />
            )}
          </Container>
        </Section>
      </>
    );
  }
}
