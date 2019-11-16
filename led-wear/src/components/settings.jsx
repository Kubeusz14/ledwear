import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function Settings(){
 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
 
        return ( 
            <>
                <Button variant="primary" onClick={handleShow}>Settings</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Settings</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" onClick={handleClose}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
         );
    }

export default Settings;