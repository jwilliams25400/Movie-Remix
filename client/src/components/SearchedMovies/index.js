import React, {useState, useEffect} from 'react';
import search from '../../utils/POSTERAPI';

import Auth from "../../utils/auth";
import { POSTERAPI } from "../../utils/POSTERAPI";

 const SearchedMovies = () => {

  const [searchedMovies,setSearchMovies ] = useState([]);

  const [searchInput, setSearchInput ] = useState('');
  
  
  
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
  searchMovies = (query) => {
    console.log(query);
    search.()POSTERAPI.search(query)
    .then(res => this.setState({ result: res.data }))
    .catch(err => console.log(err));
  };
  
  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  if(!searchInput) {
    return("Please enter a movie title")
  }

  try{
    const response = await POSTERAPI(searchInput);
    
    if (!response) {
      throw new Error("unable to find movie");
    }
    const { item } = await response.json();

    const movieData = items.map((movie) => ({
      title: information.Search[i]
    }))
  }




    
    function SearchedMovies () {
      return (
        <div className="search-movie container" >
            <div className="row movie">
              <div className="col s6 m7 l12">
                <div className="card-holder">
                  <div className="title-holder">
                    <h8>Title goes here</h8>
                  </div>
                  <div className="card-body">
                  <div className="align-content-center img-display">
                   
                  </div>
                </div>
              </div>
            </div>
           </div>
        </div>
    );
  }
  
  
};
};
  




  
  export default SearchedMovies;