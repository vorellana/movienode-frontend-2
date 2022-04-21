// *** React ***
import React, { useState } from 'react'

// *** CSS ***
import './ReplaceInMovie.css'

// *** Services ***
import moviesService from '../../services/moviesService'

// *** Components ***
import LoaderModal from '../modals/LoaderModal';
import MessageModal from '../modals/MessageModal';

// *** Main function ***
function ReplaceInMovie(){

    // *** useState ***
    const [movies, setMovies] = useState([]);
    const [openLoaderModal, setOpenLoaderModal] = useState(false);
    const [openMessageModal, setOpenMessageModal] = useState(false);
    const [movie, setMovie] = useState('');
    const [find, setFind] = useState('');
    const [replace, setReplace] = useState('');

    const [messageModal, setMessageModal] = useState('');

    // *** Call services***
    const replaceInMovie = async () => {
        setMovies([]);
        setOpenLoaderModal(true);
        const res = await moviesService.replaceInMovie(movie, find, replace)
        setOpenLoaderModal(false);
        setMessageModal(res.message);
        setOpenMessageModal(true);
        debugger
        if (res.data){
            setMovies(res.data);
        } 
    }

    const replaceText = async () => {
        await replaceInMovie();
    }

    // *** Render functions ***    
    const listMovies = movies.map((item, index) =>
        <tr key={index}>
            <td>{item.imdbID}</td>
            <td>{item.Title}</td>
            <td>{item.previousPlot}</td>
            <td>{item.currentPlot}</td>
        </tr>
    );

    return(
    <div>
        <div className="col">
            <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                    <h4 className="my-0 fw-normal">Buscar y reemplazar</h4>
                </div>
                <div className="card-body" style={{paddingTop:"1px"}}>
                    <div class="form-row mb-3">
                        <div class="form-group col-md-3">
                            <input type="text" class="form-control"
                            placeholder="Película" values={movie} onChange= {e => setMovie(e.target.value)} />
                        </div>
                        <div class="form-group col-md-3">
                            <input type="text" class="form-control"  
                            placeholder="Buscar" values={find} onChange= {e => setFind(e.target.value)} />
                        </div>
                        <div class="form-group col-md-3">
                            <input type="text" class="form-control"  
                            placeholder="Reemplazar" values={replace} onChange= {e => setReplace(e.target.value)} />
                        </div>                        
                        <div class="form-group col-md-3">
                            <button type="button" class="btn btn-primary float-right" 
                                onClick={replaceText} style={{width:"200px"}}>Reemplazar</button>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Cód. Imdb</th>
                                    <th>Película</th>
                                    <th>Trama (plot) anterior</th>
                                    <th>Trama (plot) nuevo</th>
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

export default ReplaceInMovie;