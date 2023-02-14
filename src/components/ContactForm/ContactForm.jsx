import { Component } from 'react';
import PropTypes from 'prop-types';
import { FaPhoneAlt, FaUserAlt } from 'react-icons/fa';

import { AddContactForm, FormBtn } from './ContactForm.styled';
import { Input, Label } from 'components/common/Input/Input.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;

    //submitFn - функция прокинутая из App потому что тут надо только собрать данные из формы (name, number), а обработать и дальше использовать в общем документе (чтоб в список можно было добавить), пожтому вся логика работы с ними в функции handleSubmit in App.jsx
    this.props.submitFn({ name, number });
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <AddContactForm onSubmit={this.handleSubmit}>
        <Label htmlFor="name">
          <FaUserAlt />
        </Label>
        <Input
          onChange={this.handleChange}
          value={name}
          type="text"
          name="name"
          id="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <Label htmlFor="number">
          <FaPhoneAlt />
        </Label>
        <Input
          onChange={this.handleChange}
          value={number}
          type="tel"
          name="number"
          id="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <FormBtn type="submit">Add contact</FormBtn>
      </AddContactForm>
    );
  }
}

ContactForm.propTypes = {
  submitFn: PropTypes.func.isRequired,
};
