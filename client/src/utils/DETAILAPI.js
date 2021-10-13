import axios from 'axios';

const OMDBURL2 = -process.env.REACT_APP_DETAILURL;
const OMDBAPIKEY = process.env.REACT_APP_OMDBKEY;

export const searchAPI = (query) => {
      return fetch(`${OMDBURL2}${query}${OMDBAPIKEY}`);
  };