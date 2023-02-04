import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({image, close}) => {

  useEffect(() => {
    document.addEventListener("keydown", closeModal);
    return () => {
      document.removeEventListener("keydown", closeModal);
    };
  },);

 const closeModal = ({target, currentTarget, code}) => {
  if(target === currentTarget || code === "Escape") {
      close();
  };
 };

  return (
    createPortal( 
    <div className={styles.overlay} onClick={closeModal}>
        <div className={styles.modal} >
         <img src={image} alt='' />
        </div>
    </div>, modalRoot)
    );
};

export default Modal;

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};