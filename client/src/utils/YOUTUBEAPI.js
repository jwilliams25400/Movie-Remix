require('dotenv').config();

const TRAILERURL1 = process.env.REACT_APP_TRAILERURL;
const TRAILERURL2 = process.env.REACT_APP_TRAILERURL2;
const YOUTUBEAPIKEY = process.env.REACT_APP_YOUTUBEKEY;

export const trailerAPI = (query) => {
      return fetch(`${TRAILERURL1}${query}${TRAILERURL2}${YOUTUBEAPIKEY}`);
};