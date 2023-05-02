import React from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
// import PropTypes from 'prop-types';

function ImagesGallery({ images, onClick }) {
  console.log(images);
  // const handleImageClick = largeImageURL => {
  //   onClick(largeImageURL);
  // };

  return (
    <ul className={css.imageGallery}>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            id={id}
            tags={tags}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClick={handleImageClick}
          />
        );
      })}
    </ul>
  );
}

export default ImagesGallery;

// ImagesGallery.propTypes = {
//   images: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       tags: PropTypes.string.isRequired,
//       webformatURL: PropTypes.string.isRequired,
//       largeImageURL: PropTypes.string.isRequired,
//     })
//   ),
//   onClick: PropTypes.func.isRequired,
// };
