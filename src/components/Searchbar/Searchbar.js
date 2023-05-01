import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';
// import PropTypes from 'prop-types';

function Searchbar({ onSubmit }) {
  console.log(onSubmit);
  const [imagesName, setImagesName] = useState('');

  const handleNameChange = event => {
    console.log(event);
    setImagesName(event.currentTarget.value.toLowerCase());
  };
  console.log(imagesName);

  const handleSubmit = event => {
    event.preventDefault();

    if (imagesName.trim() === '') {
      return toast.error('напиши что искать!');
    }
    onSubmit(imagesName);
    console.log(onSubmit(imagesName));

    setImagesName('');
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>GO</span>
        </button>

        <input
          value={imagesName}
          onChange={handleNameChange}
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
