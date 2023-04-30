import { createPortal } from 'react-dom';
import { Overlay, ModalImage } from './Modal.styled';
import { Component } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscape);
  }

  onEscape = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { image, description } = this.props;
    return createPortal(
      <Overlay onClick={this.onOverlayClick}>
        <ModalImage>
          <img src={image} alt={description} />
        </ModalImage>
      </Overlay>,
      modalRoot
    );
  }
}
