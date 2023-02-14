import { Component } from 'react';
import { nanoid } from 'nanoid';
import { FaRegAddressBook, FaSearch } from 'react-icons/fa';
import {
  ContactList,
  ContactForm,
  Section,
  Container,
  HeaderSection,
  Header1,
  Header2,
  Input,
  Search,
  Notification,
} from './reexport';

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

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = data => {
    const { contacts } = this.state;

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert(`${data.name} is already in your contacts! Try to find in search.`);
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

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const filtered =
      filter && contacts.length
        ? contacts.filter(({ name }) =>
            name.trim().toLowerCase().includes(filter.trim().toLowerCase())
          )
        : contacts;
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  };

  render() {
    const { contacts } = this.state;
    const filteredContacts = this.getFilteredContacts();

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
              onChange={this.handleChangeFilter}
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
