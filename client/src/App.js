import React, { Fragment, Component } from 'react';
import { Route, NavLink } from "react-router-dom";
import CreateHeroContainer from "./components/CreateHeroContainer";
import ViewHeroesContainer from "./components/ViewHeroesContainer";
import Navbar from "react-bootstrap/Navbar";
import { setShowModal } from "./actions/getBd";
import { connect } from "react-redux";
import s from "./components/App.module.css"

class App extends Component {

    shows = () => {
        this.props.setShowModal(true)
    };

    render() {
        return (
            <Fragment>
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className={s.item}>
                            <NavLink to={"/api/ViewHeroes"} activeClassName={s.activeLink}>ViewHeroes</NavLink>
                        </div>
                        <div className={s.item}>
                            <NavLink to={"/CreateHero"} onClick={() => this.shows()}
                                activeClassName={s.activeLink}>CreateHero</NavLink>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
                <Route path="/api/ViewHeroes" render={() => <ViewHeroesContainer />} />
                <Route path="/CreateHero" render={() => <CreateHeroContainer />} />
            </Fragment>

        )
    };
}

const mapDispatchToProps = dispatch => ({
    setShowModal: userData => dispatch(setShowModal(userData))
})

const AppWithRedux = connect(
    null,
    mapDispatchToProps
)(App);

export { AppWithRedux as App }

































