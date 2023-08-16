import React, { Component } from 'react';
import cl from './Searchbar.module.css'

export default class Searchbar extends Component {
  state = {
    query: '',
    page: 1,
    per_page: 10,
  };

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      alert('Enter photo description');
      return;
    }
    const { onSubmit } = this.props;
    onSubmit(this.state.query);

    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={cl.searchbar}>
        <form className={cl.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={cl.button}>
            <span className={cl.button_label}>Search</span>
          </button>

          <input
            className={cl.input}
            type="text"
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}