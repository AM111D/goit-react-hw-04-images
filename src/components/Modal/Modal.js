import css from './Modal.module.css';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function Modal({ images, selectedImage, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        onClose();
      }
    });
  }, [selectedImage, onClose]);

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal}>
        <img src={selectedImage} alt={images.tags} />
      </div>
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      selectedImage: PropTypes.string,
    })
  ),
  onClick: PropTypes.func.isRequired,
  selectedImage: PropTypes.string,
};
