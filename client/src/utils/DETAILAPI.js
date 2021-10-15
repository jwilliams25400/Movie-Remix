require('dotenv').config();

const OMDBURL2 = -process.env.REACT_APP_DETAILURL;
const OMDBAPIKEY = process.env.REACT_APP_OMDBKEY;

export const detailAPI = (query) => {
    return fetch(`${OMDBURL2}${query}${OMDBAPIKEY}`);
};