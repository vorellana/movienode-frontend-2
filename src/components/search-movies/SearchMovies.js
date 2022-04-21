// *** React ***
import React, { useState } from 'react'

// *** CSS ***
import './SearchMovies.css'

// *** Services ***
import moviesService from '../../services/moviesService'

// *** Components ***
import LoaderModal from '../modals/LoaderModal';
import MessageModal from '../modals/MessageModal';

// *** Main function ***
function SearchMovies(){

    // *** useState ***
    const [movies, setMovies] = useState([]);
    const [openLoaderModal, setOpenLoaderModal] = useState(false);
    const [openMessageModal, setOpenMessageModal] = useState(false);
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [messageModal, setMessageModal] = useState('');

    // *** Call services***
    const getMovies = async () => {
        setMovies([]);
        setOpenLoaderModal(true);
        const res = await moviesService.searchMovies(title, year);
        setOpenLoaderModal(false);
        setMessageModal(res.message);
        setOpenMessageModal(true);
        if (res.data){
            setMovies([res.data]);
        } 
    }

    const search = async () => {
        await getMovies();
    }

    // *** Render functions ***    
    const listMovies = movies.map((item, index) =>
        <tr key={index}>
            <td>{item.Title}</td>
            <td>{item.Year}</td>
            <td>{item.Released}</td>
            <td>{item.Genre}</td>
            <td>{item.Director}</td>
            <td>{item.Actors}</td>
            <td>{item.Ratings}</td>
            <td>{item.Plot}</td>
        </tr>
    );

    return(
    <div>
        <div className="col">
            <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                    <h4 className="my-0 fw-normal">Buscador de películas</h4>
                </div>
                <div className="card-body" style={{paddingTop:"1px"}}>
                    <div class="form-row mb-3">
                        <div class="form-group col-md-4">
                            <input type="text" class="form-control"
                            placeholder="Título" values={title} onChange= {e => setTitle(e.target.value)} />
                        </div>
                        <div class="form-group col-md-4">
                            <input type="text" class="form-control"  
                            placeholder="Año" values={year} onChange= {e => setYear(e.target.value)} />
                        </div>
                        <div class="form-group col-md-4">
                            <button type="button" class="btn btn-primary float-right" 
                                onClick={search} style={{width:"200px"}}>Buscar</button>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Año</th>
                                    <th>Lanzamiento</th>
                                    <th>Género</th>
                                    <th>Director</th>
                                    <th>Actores</th>
                                    <th>Ratings</th>
                                    <th>Trama</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listMovies}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <LoaderModal
            openModal={openLoaderModal}
            setOpenModal={setOpenLoaderModal}
        />

        <MessageModal
            openModal={openMessageModal}
            setOpenModal={setOpenMessageModal}
            message={messageModal}
        />
    </div>
    )
}

export default SearchMovies;