/* ROOT Component of your App  */

import React, { Component } from 'react'
import logo from './fondicon.png'
import './App.css'
import PictureCard from './components/PictureCard'

import defaultPicture from './components/img/default.jpg'

const Materialize = window.Materialize

const APP_TITLE = 'HD Pictures                 '
//update document title (displayed in the opened browser tab)
document.title = APP_TITLE

//web api utils
import { get, ENDPOINTS } from './utils/api'

//components

class App extends Component {

    /* React state initialization DOCUMENTATION : https://facebook.github.io/react/docs/react-without-es6.html#setting-the-initial-state */

    constructor( props ) {
        super( props )
        this.state = {
            pictures: undefined,
            search: ''
        }

    }



    render() {

        return (
            <div className="App">
                <div className="App-header">
                    <h1>{ APP_TITLE }</h1>
                    <img src={ logo } className="App-logo" alt="logo" />
                </div>
                <div className="App-content">
                    <div className="center-align">
                        <form onSubmit={ this.fetchPicture }>
                            <div className="row" style={ { marginBottom: 0 } }>
                                <div className="input-field col s6 offset-s3">
                                    <input id="cityInput" type="text" value={ this.state.city } onChange={ this.handleChange } />
                                    <label htmlFor="cityInput">Pictures</label>
                                </div>
                            </div>
                            <button type="submit" className="waves-effect waves-light btn">
                                Search
                            </button>
                        </form>
                    </div>
                    <div className="row" style={ { marginTop: 400 } } >
                        <div className="col s12 m6 offset-m3">
                            { this.displayPictureCard() }
                        </div>
                    </div>
                </div>

            </div>
        )
    }



    handleChange = ( event ) => {
        this.setState( {
            pictures: event.target.value
        })
    }


    //will fetch a picture with the name of the city fetched by the weather API

    fetchPicture = async ( event ) => {
        event.preventDefault()
        try {

            const pictures = await get( ENDPOINTS.PIXABAY_API_URL, {
                //YOU NEED TO PROVIDE YOUR "PIXABAY" API KEY HERE (see /utils/api.js file to grab the DOCUMENTATION link)
                key: '4781360-21e53eda7b1a50b9abe41d3df',
                q: this.state.pictures,
                image_type: 'all',
                safesearch: true
            })

            //if we have results


            console.log( pictures )
            this.setState( { pictures: pictures })



        }
        //same default picture is saved if the image request fails
        catch ( error ) {



            Materialize.toast( error, 8000, 'error-toast' )
            console.log( 'Failed fetching picture: ', error )
        }

        return undefined
    }



    //handle display of the received weather object
    displayPictureCard = () => {


        if ( this.state.pictures ) {
            const images = this.state.pictures.hits

            return images.map(
                function ( image ) {
                    return <PictureCard url={ image.webformatURL }
                        tag={ image.tags }
                        comment={ image.comments }
                        like={ image.likes }
                        fav={ image.favorites }
                        dl={ image.downloads }
                        view={ image.views } />
                }
            )
        }

        return null
    }

}

export default App


//ajouter des trucs commentaires, mais aussi lien pour telecharger images
//lien:
//<a href={le LIEN} target="_blank"> telecharger machin </a>