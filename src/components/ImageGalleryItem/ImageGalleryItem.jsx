import { Modal } from 'components/Modal';
import { Component } from 'react';
import { GalleryItem, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  static propTypes = {
    picture: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
  };

  state = {
    showModal: false,
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { showModal } = this.state;
    const { picture, description, largeImage } = this.props;
    return (
      <GalleryItem>
        <Image src={picture} alt={description} onClick={this.openModal} />
        {showModal && (
          <Modal
            onClose={this.closeModal}
            image={largeImage}
            description={description}
          />
        )}
      </GalleryItem>
    );
  }
}
