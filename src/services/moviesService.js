import axios from 'axios';
const exp = {}
let response;
const baseUrl = "https://movienode-backend.azurewebsites.net";

exp.searchMovies = async (title, year)  => {
    const url = baseUrl + '/movies/search/?title=' + title
    await axios.get(url, { headers: { year: year } } )
    .then( res => {
        response = res.data;
    }).catch( error => {
        response = error;
        response.message = error.response.data.message
    })
    return response;
}

exp.getMovies = async (page)  => {
    const url = baseUrl + '/movies';
    await axios.get(url, { headers: { page: page } } )
    .then( res => {
        response = res.data;
    }).catch( error => {
        response = error;
        // response.message = error.response.data.message
    })
    return response;
}

exp.replaceInMovie = async (movie, find, replace)  => {
    const url = baseUrl + '/movies/replace';
    await axios.post(url, { movie, find, replace } )
    .then( res => {
        response = res.data;
    }).catch( error => {
        response = error;
        response.message = error.response.data.message
    })
    return response;
}

export default exp;