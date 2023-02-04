import PropTypes from 'prop-types';

import styles from './image-item.module.css';

const ImageGalleryItem = ({onClick, bigImg, webImg, tags}) => {
    return (
        <li className={styles.ImageGalleryItem} 
        onClick={() => onClick(bigImg)}>
      <img src={webImg} alt={tags}  className={styles.ImageGalleryItem__image} />
      </li>
    )
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  bigImg: PropTypes.string.isRequired,
  webImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};