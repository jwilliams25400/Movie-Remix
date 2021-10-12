import axios from 'axios';

const OMDBURL1 = process.env.REACT_APP_POSTERURL;
const OMDBAPIKEY = process.env.REACT_APP_OMDBKEY;

export default {
  search(query) {
    return axios.get(`${OMDBURL1}${query}${OMDBAPIKEY}`);
  },
};
