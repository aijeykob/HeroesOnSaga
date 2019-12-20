import React, { Fragment, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import { Card, Row } from "react-bootstrap";
import CreateHeroContainer from "./CreateHeroContainer";
import { NavLink } from "react-router-dom";

const ViewHeroes = (props) => {

    useEffect(() => {
        props.paginationStart(1)
    }, [])

    const selectHeroForUpdate = (e) => {
        const selectedHero = props.HeroesArray.find(el => el._id === e.target.id)
        props.setHeroForUpdate(selectedHero)
        props.setShowModal(true)
    };
    const selectHeroForDelete = (e) => {
        props.deleteHero(e.target.id, e.target.name, props.currentPage);
    };

    const paginationButton = (e) => {
        props.paginationStart(e.target.id)
    };


    return (
        <Fragment>
            <Row className="justify-content-md-center ">

                {

                    props.HeroesArray.map(el => {
                        return (
                            <Card key={el._id} style={{ width: '18rem' }}>

                                <Card.Body>
                                    <Card.Title className="text-center">{el.nickname}</Card.Title>
                                    <Card.Img height="200" variant="top"
                                        src={`//localhost:4000/uploads/${el.filename || "noImg.png"}`} />
                                    <Button variant="success" id={el._id}
                                        onClick={(e) => selectHeroForUpdate(e)}>Edit</Button>
                                    <Button variant="danger" id={el._id} name={el.filename}
                                        onClick={(e) => selectHeroForDelete(e)}>Delete</Button>
                                </Card.Body>

                            </Card>
                        )
                    })
                }
            </Row>

            <Row className="justify-content-md-center my-4">
                {
                    [...Array(props.totalPages)].map((el, i) => {

                        return (
                            <NavLink key={i} to={'/api/ViewHeroes?page=' + (i + 1)}>
                                <Button id={i + 1} key={i} onClick={(e) => paginationButton(e)}>{i + 1}</Button>
                            </NavLink>
                        )
                    })
                }
            </Row>

            <CreateHeroContainer />

        </Fragment>
    )
}


export default ViewHeroes