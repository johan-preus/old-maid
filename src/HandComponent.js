import React from "react";
import { Component } from "react";
import './Hand.css'

const url = 'PlayingCards/'

function RenderCard({card}){
    return(
        <img src={url + card.image} alt={card.name} />
    )
}

// export default function Hand(props){
//     const hand = props.cards.map(card => {
//         return(
//             <div className="col my-3" key={card.name}>
//                 <RenderCard card={card} />
//             </div>
//         )
//     })
//     return(
//         <div class="row">
//             {hand}
//         </div>
//     )
// }

export default class Hand extends Component {
    constructor(props){
        super(props)
    }
    handleKeydown(event){
        console.log(event);
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeydown);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeydown);
    }
    
    
    render(){
        const hand = this.props.cards.map(card => {
            return(
                <div className="col-1 m-3" key={card.name}>
                    <RenderCard card={card} />
                </div>
            )
        })
        return(
            <div className="row justify-content-center">
                {hand}
            </div>
        )
    }
}