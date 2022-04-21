// *** react ***
import React from 'react';

// *** CSS ***
import 'bootstrap/dist/css/bootstrap.css';
import './Menu.css'

// *** components ***
import SearchMovies from '../search-movies/SearchMovies';
import GetMovies from '../get-movies/GetMovies';
import ReplaceInMovie from '../replace-in-movie/ReplaceInMovie';

// *** Main function ***
function Menu() {
    return (
        <div className="col-lg-12">
            <div className="d-flex justify-content-center mb-sm-4">
                <div className="title-mnf">PELÍCULAS</div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mx-auto">
                        <div className="my-1">
                            <SearchMovies/>
                            <GetMovies/>
                            <ReplaceInMovie/>

                            {/* <div className="row row-cols-1 row-cols-md-2 mb-3 text-center">
                                <Characters></Characters>
                                <Planets></Planets>
                            </div>  */}
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    );
}

export default Menu;