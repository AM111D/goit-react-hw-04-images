import css from './ButtonLoadMore.module.css';
import PropTypes from 'prop-types';

const ButtonLoadMore = ({ loadMoreImages, disabled }) => {
  return (
    <button
      type="button"
      onClick={loadMoreImages}
      disabled={disabled}
      className={css.btn}
    >
      more
    </button>
  );
};

export default ButtonLoadMore;

ButtonLoadMore.propTypes = {
  loadMoreImages: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
