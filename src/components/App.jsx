import React, { Component } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";

export class App extends Component {
  state = {
    query: "",
  };

  handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (query) => {
    this.setState({
      query: query,
    });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} value={this.state.query} />
        <ImageGallery query={this.state.query} images={this.state.images} />
      </div>
    );
  }
}