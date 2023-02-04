import PropTypes from 'prop-types';

import styles from './button.module.css';

const Button = ({onClick}) => {

  return (
    <div className={styles.wrap}>
    <button type="button" className={styles.Button} onClick={() => onClick()}>Load more</button>
    </div>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};