import React, { Component } from "react";
import Button from "../Button/Button";
import getImages from '../../api/SearchImages'
import Loader from "components/Loader/Loader";
import Modal from '../Modal/Modal'
import cl from './ImageGallery.module.css'


const STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
      per_page: 12,
    modalImageUrl:'',
    errorMessage: null,
    status: STATUS.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.setState(
        {
          images: [],
          page: 1,
          status: STATUS.PENDING
        },
        () => {
          this.fetchImages();
        }
      );
    }
  }

  handleLoadMore = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
        status: STATUS.PENDING,
      }),
      () => {
        this.fetchImages();
      }
    );
  };

  handleImageClick = (imageURL) => {
  this.setState({ showModal: true, modalImageUrl: imageURL });
};

  handleCloseModal = () => {
    this.setState({ modalImageUrl: '', showModal: false });
  };

  fetchImages = async () => {
    try {
      const response = await getImages({
        searchQuery: this.props.query,
        page: this.state.page,
        per_page: this.state.per_page,
      });
      this.setState((prevState) => ({
        images: [...prevState.images, ...response.hits],
        status: STATUS.RESOLVED,
      }));
    } catch (error) {
      console.error(error);
      this.setState({ errorMessage: "Error loading images" });
    }
  };

  render() {
  const { images, status, showModal, modalImageUrl} = this.state;
  const showLoadMoreButton = images.length > 0;

  if (status === STATUS.PENDING) {
    return <Loader />;
  }

  return (
    <div>
      {status === STATUS.RESOLVED && (
        <div>
          {images.length > 0 ? (
            <div>
                          <ul className={cl.gallery}>
                {images.map((image) => (
                    <li key={image.id} className={cl.gallery_item}>
                    <img
                      src={image.webformatURL}
                      alt={image.id}
                      width="300"
                      height="250"
                      onClick={() => this.handleImageClick(image.largeImageURL)}
                    />
                  </li>
                ))}
              </ul>
              {showLoadMoreButton && <Button onSubmit={this.handleLoadMore} />}
              {showModal && <Modal imageUrl={modalImageUrl} onClose={this.handleCloseModal} />}
            </div>
          ) : (
            <p>No images to display</p>
          )}
        </div>
      )}
    </div>
  );
}
}