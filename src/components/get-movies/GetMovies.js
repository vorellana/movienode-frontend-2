// *** React ***
import React, { useEffect, useState, useCallback } from 'react'

// *** CSS ***
import './GetMovies.css'

// *** Services ***
import moviesService from '../../services/moviesService'

// *** Components ***
import LoaderModal from '../modals/LoaderModal';
import ReactPaginate from 'react-paginate';

// *** Main function ***
function Planets(){

    // *** useState ***
    const [movies, setMovies] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [activePage, setActivePage] = useState(0);
    const itemsPerPage = 5;
    const [openLoaderModal, setOpenLoaderModal] = useState(false);

    // *** useCallback ***
    const getMovies =  useCallback( async (page) => {
        setMovies([]);
        setOpenLoaderModal(true);
        let res = await moviesService.getMovies(page);
        setPageCount(res.pages);
        // setPageCount(Math.ceil(res.count / itemsPerPage));
        setOpenLoaderModal(false);
        setMovies(res.data);
    }, [])        
    // }, [searchText])

    // *** useEffect ***

    useEffect(() => {
        async function fetchData() {
            await getMovies(1);
        }
        fetchData();
    }, [getMovies]);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      }, [itemOffset, itemsPerPage]);

    // *** Call services***

    // *** Other functions ***
    // Invoke when user click to request another page.
    const handlePageClick = async (event) => {
        const newOffset = event.selected * itemsPerPage % movies.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
        await getMovies(event.selected + 1);
    };

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
                    <h4 className="my-0 fw-normal">Todas las películas</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
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

                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <ReactPaginate
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={2}
                            pageCount={pageCount}
                            previousLabel="<"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                            forcePage={activePage}
                        />
                    </div>
                </div>
            </div>
        </div>

        <LoaderModal
            openModal={openLoaderModal}
            setOpenModal={setOpenLoaderModal}
        />

    </div>
    )
}

export default Planets;