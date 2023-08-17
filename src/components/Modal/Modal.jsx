import  { Component } from 'react';
import cl from './Modal.module.css';
import 'basiclightbox/dist/basicLightbox.min.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { imageUrl } = this.props;

    return (
      <div className={cl.modal}>
        <div className={cl.modal_backdrop} onClick={this.handleBackdropClick}>
          <img src={imageUrl} alt="Large"  />
        </div>
      </div>
    );
  }
}


