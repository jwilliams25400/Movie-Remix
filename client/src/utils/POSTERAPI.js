const OMDBURL1 = process.env.REACT_APP_POSTERURL;
const OMDBAPIKEY = process.env.REACT_APP_OMDBKEY;

export const searchAPI = (query) => {
  return fetch(`${OMDBURL1}${query}${OMDBAPIKEY}`);
};
