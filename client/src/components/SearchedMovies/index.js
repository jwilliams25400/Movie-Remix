import React, {useState, useEffect} from 'react';
import search from '../../utils/POSTERAPI';

import Auth from "../../utils/auth";
import { useMutation} from "@apollo/client";
import { SAVE_MOVIE } from '../../utils/mutations';

 const SearchedMovies = () => {

  const [searchedMovies,setSearchMovies ] = useState([]);

  const [searchInput, setSearchInput ] = useState('');
  
  const [saveMovie, {error}] = useMutation(SAVE_MOVIE);

  
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    if(!searchInput) {
      return("Please enter a movie title")
    }
    
    try{
      const response = await fetch(POSTERAPI(searchInput));
      
      if (!response) {
        throw new Error("unable to find movie");
      }
      
      const { item } = await response.json();
      
      const movieData = items.map((movie) => ({
        title: informatiomn.Search[i].Title,
        poster: movies.Search[i].Poster
      }));
      
      setSearchMovies(movieData);
      setSearchInput("");
    } catch (err) {
      console.log("unable to load movies")
    }
  };
  

  
  searchMovies = (query) => {
    console.log(query);
    search(query)
    .then(res => this.setState({ result: res.data.data }))
    .catch(err => console.log(err));
  };
  
  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };


    





    
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
  




  
  export default SearchedMovies;