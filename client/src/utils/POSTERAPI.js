require('dotenv').config();
const OMDBURL1 = process.env.REACT_APP_POSTERURL;
const OMDBAPIKEY = process.env.REACT_APP_OMDBKEY;

export const searchAPI = (query) => {
  console.log("Search Api: ",`${OMDBURL1}${query}${OMDBAPIKEY}`)
  return fetch(`${OMDBURL1}${query}${OMDBAPIKEY}`);

};
