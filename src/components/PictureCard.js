import React, { Component } from 'react'

import './PictureCard.css'

class PictureCard extends Component {
    //au cas où on veut afficher aussi des commentaires etc : const{url, comments....}=this.props

    render() {
        const {url, tag, comment, like, fav, dl, view} = this.props

        return (

            <body>
                <div class="row">
                    <div class="col s12 m7">
                        <div class="card">
                            <div class="card-image">
                                <img alt="url" src={ url } />
                            </div>
                            <div className="title">
                                { tag }
                            </div>
                            <div className="description">
                                Comments : { comment } |
            Likes : { like } |
            Favorites : { fav } |
            Downloads : { dl } |
            Views : { view }
                                <br></br>
                                <hr color="lightslategray" size="5"></hr>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>

            </body>

        )
    }
}

export default PictureCard