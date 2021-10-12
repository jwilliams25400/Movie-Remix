import axios from 'axios';

const TRAILERURL1 = process.env.REACT_APP_TRAILERURL;
const TRAILERURL2 = process.env.REACT_APP_TRAILERURL2;
const YOUTUBEAPIKEY = process.env.REACT_APP_YOUTUBEKEY;

export default {
    search(query) {
      return axios.get(`${TRAILERURL1}${query}${TRAILERURL2}${YOUTUBEAPIKEY}`);
    },
  };