import React from 'react';
import { Modal, Button, Form, Image } from "react-bootstrap";

const CreateHero = (props) => {

    const onChangeInput = (e) => {
        e.preventDefault();
        props.writingText(e.target.value, e.target.name)

    };

    const handleSubmit = () => {

        props.updateOrCreateHero(
            {
                nickname: props.nickname,
                real_name: props.real_name,
                origin_description: props.origin_description,
                superpowers: props.superpowers,
                catch_phrase: props.catch_phrase,
                heroImage: props.heroImage,
                _id: props._id,
                currentPage: props.currentPage,
                method: props.method
            }
        );
        props.clearProps();
    };

    const handleImageChange = (e) => {
        props.setImg(e.target.files[0]);

        const reader = new FileReader();
        reader.onload = function () {
            const dataURL = reader.result;
            const output = document.getElementById('output');
            output.src = dataURL;
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    const handleClose = () => {
        props.clearProps();
        props.setShowModal(false)
    };

    return (
        <div>
            <Modal backdrop={false} show={props.show} onHide={() => handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Create your SuperHero</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>SuperHero Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="nickname"
                            value={props.nickname}
                            onChange={(e) => onChangeInput(e)} />

                        <Image id='output' variant="top"
                            src={`//localhost:4000/uploads/${props.filename || "noImg.png"}`}
                            fluid />
                        <Form.Label>Real Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="real_name"
                            value={props.real_name}
                            onChange={(e) => onChangeInput(e)} />
                        <Form.Label>Origin Description</Form.Label>
                        <Form.Control as="textarea"
                            rows="3"
                            name="origin_description"
                            value={props.origin_description}
                            onChange={(e) => onChangeInput(e)} />
                        <Form.Label>SuperPowers</Form.Label>
                        <Form.Control as="textarea"
                            rows="3"
                            name="superpowers"
                            value={props.superpowers}
                            onChange={(e) => onChangeInput(e)} />

                        <Form.Label>Catch Phrase</Form.Label>
                        <Form.Control as="textarea"
                            rows="3"
                            name="catch_phrase"
                            value={props.catch_phrase}
                            onChange={(e) => onChangeInput(e)} />
                        <input type="file" name="filename"
                            onChange={(e) => handleImageChange(e)}
                        />
                        {
                            (props._id) ?
                                <Button variant="success" onClick={() => handleSubmit()}
                                >Change</Button>
                                :
                                <Button variant="primary" onClick={() => handleSubmit()}
                                >Create
                                </Button>

                        }
                    </Form>
                </Modal.Body>
            </Modal>


        </div>

    )
};
export default CreateHero