import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ id, tags, webformatURL, largeImageURL, onClick }) {
  return (
    <li className={css.gallery_item} key={id} id={id}>
      <img
        src={webformatURL}
        className={css.gallery_item_image}
        onClick={() => onClick(largeImageURL)}
        alt={tags}
      />
    </li>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
