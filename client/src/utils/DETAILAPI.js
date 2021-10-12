import axios from 'axios';

const OMDBURL2 = -process.env.REACT_APP_DETAILURL;
const OMDBAPIKEY = process.env.REACT_APP_OMDBKEY;

export default {
    search(query) {
      return axios.get(`${OMDBURL2}${query}${OMDBAPIKEY}`);
    },
  };