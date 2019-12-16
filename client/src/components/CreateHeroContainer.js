import React from 'react';
import { connect } from 'react-redux'
import {
    writingText,
    setImg,
    setShowModal,
    setHeroForUpdate,
    clearProps,
    updateOrCreateHero
} from '../actions/getBd'
import CreateHero from "./CreateHero";


let mapStateToProps = state => ({

    nickname: state.nickname,
    real_name: state.real_name,
    origin_description: state.origin_description,
    superpowers: state.superpowers,
    catch_phrase: state.catch_phrase,
    heroImage: state.heroImage,
    show: state.show,
    _id: state._id,
    filename: state.filename,
    currentPage: state.currentPage,
    method: state.method
})

let mapDispatchToProps = dispatch => ({
    writingText: (text, field) => dispatch(writingText(text, field)),
    updateOrCreateHero: HeroData => dispatch(updateOrCreateHero(HeroData)),
    setImg: (file) => dispatch(setImg(file)),
    setHeroForUpdate: (HeroForUpdate) => dispatch(setHeroForUpdate(HeroForUpdate)),
    setShowModal: (show) => dispatch(setShowModal(show)),
    clearProps: (clear) => dispatch(clearProps(clear)),


})

const CreateHeroContainer = connect(mapStateToProps, mapDispatchToProps)(CreateHero)

export default CreateHeroContainer














































