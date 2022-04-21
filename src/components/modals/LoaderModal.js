import Modal from 'react-bootstrap/Modal';
import React from 'react'

function LoaderModal( {openModal, setOpenModal} ) {
    return (
        <div>
            <Modal show={openModal} onHide={ () => setOpenModal(false) }  centered>
                <Modal.Body>
                    <div className="d-flex justify-content-center" style={{marginTop: 50}}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Cargando...</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center" style={{marginTop: 10}}>
                        <p>Consultando...</p>
                    </div>                            
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default LoaderModal;