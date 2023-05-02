import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import FetchImageApi from 'services/image-api';
import ImagesLoader from './Loader/Loader';
import ImageSearchError from './ImagesError/ImagesError';
import ImagesGallery from './ImageGallery/ImageGallery';
import ButtonLoadMore from './Button/ButtonLoadMore';
import Modal from './Modal/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function App() {
  const [imagesName, setImagesName] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!imagesName) {
      return;
    }
    setStatus(Status.PENDING);
    setLoading(true);

    const delay = setTimeout(() => {
      FetchImageApi(imagesName)
        .then(images => {
          console.log(images);
          return images.length < 12
            ? (setImages(images),
              setStatus(Status.RESOLVED),
              setIsButtonDisabled(true))
            : (setImages(images),
              setStatus(Status.RESOLVED),
              setIsButtonDisabled(false));
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        })
        .finally(() => setLoading(false));
    }, 1000); // 1-секундная задержка

    return () => clearTimeout(delay); // очистка таймера при изменении зависимостей
  }, [imagesName]);

  const loadMoreImages = () => {
    setLoading(true);
    setIsButtonDisabled(true);
    setPage(page + 1);
  };

  useEffect(() => {
    if (!imagesName) {
      return;
    }
    const fetchData = async () => {
      try {
        const newImages = await FetchImageApi(imagesName, page + 1);
        const allImages = [...images, ...newImages];
        setImages(allImages);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setStatus(Status.REJECTED);
      }
      setIsButtonDisabled(false);
      setLoading(false);
    };

    setIsButtonDisabled(true);
    fetchData();
  }, [page]);

  const handleOpenModal = largeImageURL => {
    setShowModal(true);
    setSelectedImage(largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (status === Status.PENDING) {
    return <ImagesLoader />;
  }
  if (status === Status.REJECTED) {
    return <ImageSearchError message={error.message} />;
  }
  if (status === Status.RESOLVED) {
    if (images.length === 0) {
      return <p>По запросу "{imagesName}" ничего не найдено</p>;
    }
  }

  return (
    <div>
      <Searchbar onSubmit={setImagesName} />
      <ImagesGallery images={images} onClick={handleOpenModal} />
      {!isButtonDisabled && (
        <ButtonLoadMore
          loadMoreImages={loadMoreImages}
          disabled={isButtonDisabled}
        />
      )}
      {showModal && (
        <Modal
          onClose={handleCloseModal}
          images={images}
          onClick={handleCloseModal}
          selectedImage={selectedImage}
        />
      )}

      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
