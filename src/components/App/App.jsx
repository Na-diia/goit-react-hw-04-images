import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import  SearchBar  from "../SearchBar/SearchBar";
import  ImageGallery  from "components/ImageGallery/ImageGallery";
import  Modal  from 'components/Modal/Modal';
import  Button  from "components/Button/Button";
import  Loader  from "components/Loader/Loader";
import { fetchImage } from "services/fetch-image";

import styles from './App.module.css';

export const App = () => {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('idle');
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    setStatus('pending');
   if(search) {
     const lookForImages = async() => {
      try {
       setLoading(true);
       const searchValue = search.trim().toLowerCase();
       const data = await fetchImage(searchValue, page);
       if (data.hits.length === 0) {
         toast.warn(`Sorry! We didn't find anything, change your request!`);
         return;
       }
       setImages(data.hits);
       setStatus('resolved');
       setTotalHits(data.totalHits); 
        return;
      } catch (error) {
        setStatus('rejected');
        setError(error.message);
        setImages(null);
        toast.error('Ops! Something went wrong!');
      } finally {
        setLoading(false);
      };
    };
    lookForImages();
  };   
  }, [search, page]);
 
const searchImages = (query) => {
  if(query === search) {
    toast.warn('This is the same query!');
    return;
  } setSearch(query);
  setImages([]);
  setPage(1);
};

const loadMore = () => {
  setPage(prevPage => prevPage +1);
};

const showImage = bigImageURL => {
  setLargeImageURL(bigImageURL);
  setShowModal(true);
};

const closeModal = ()=> {
  setShowModal(false);
  setLargeImageURL(null);
};

 return (
    <div className={styles.App}>
      <SearchBar onSubmit={searchImages}/>
      {!error && <ImageGallery images={images} showImage={showImage}/>}
      {loading && <Loader />}
      {showModal  && <Modal close={closeModal} image={largeImageURL}/>}
      {totalHits > 12 &&  status !== 'pending' && images.length !== 0 && (<Button onClick={loadMore}/>)}
       <ToastContainer autoClose={2000}/>
    </div>
  );
};