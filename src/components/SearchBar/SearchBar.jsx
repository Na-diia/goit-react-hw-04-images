import PropTypes from 'prop-types';
import { useState, memo} from 'react';
import { toast } from 'react-toastify';

import styles from './search-bar.module.css';

const SearchBar = ({onSubmit}) => {
  const [search, setSearch] = useState("");

  const handleChange = ({target}) => {
    const {value} = target;
    setSearch( value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search.trim() === '') {
      toast.warn('Enter words to search for!');
      return;
    }
    onSubmit(search);
  };

  return (<header className={styles.searchBar}>
    <form className={styles.form} onSubmit={handleSubmit}>
      <button type="submit" className={styles.button}>
        <span className={styles.label}>Search</span>
      </button>
      <input
        onChange={handleChange}
        className={styles.input}
        type="text"
        name='search'
        value={search}
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        required
      />
    </form>
  </header>)
};

export default memo(SearchBar);

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

