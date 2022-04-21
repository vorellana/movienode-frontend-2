import Modal from 'react-bootstrap/Modal';
import React from 'react'

function MessageModal( {openModal, setOpenModal, message} ) {
    return (
        <div>
            <Modal show={openModal} onHide={ () => setOpenModal(false) }  centered>
                <Modal.Header closeButton>
                    {/* <Modal.Title>Modal title</Modal.Title> */}
                </Modal.Header>

                <Modal.Body>
                    <div className="d-flex justify-content-center" style={{marginTop: 10}}>
                        {/* <p>{message}</p> */}
                        <h4>{message}</h4>
                    </div>                            
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default MessageModal;