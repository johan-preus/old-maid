import React, { Component } from 'react'
import { connect } from 'react-redux'
import { newGame, dealCards } from './redux/actionCreators'
import Hand from './HandComponent'
import Players from './PlayersComponent'
import DrawCards from './DrawCardsComponent'
import OpponentTurn from './OpponentTurn.js'

const mapStateToProps = state => {
    return {
        game: state.game,
        isWinner: state.isWinner,
        isLoser: state.isLoser
    }
}

const mapDispatchToProps = {
    newGame,
    dealCards,
}

class Main extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event){
        event.preventDefault()
        this.props.newGame(event.target.numPlayers.value)
    }

    render(){
        const Loading = () => {
            return (
                <div className="container">
                <form className="mt-3" onSubmit={this.handleSubmit}>
                    <label className="form-label" htmlFor="numPlayers">Number of Players</label>
                    <select className="form-select" id="numPlayers" name="numPlayers">
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <input className="btn btn-primary" type="submit" value="New Game" />
                </form>
                </div>
            )
        }
        const ReadyToDeal = () => {
            return(
                <div className="container">
                    <p>Num Players: {this.props.game.numPlayers}</p>
                    <button className="btn btn-primary" onClick={() => {
                        this.props.dealCards()
                        this.forceUpdate()
                    }}>Deal Cards</button>
                </div>
            )
        }
        const GameInProgress = () => {
            if(this.props.isWinner){
                console.log('winner');
                return(
                <div className="container">
                    <h1>You Win!!</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label className="form-label" htmlFor="numPlayers">Number of Players</label>
                        <select className="form-select" id="numPlayers" name="numPlayers">
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <input className="btn btn-primary" type="submit" value="New Game" />
                    </form>
                </div>
                )
            }
            if(this.props.isLoser){
                console.log('you lose');
                return(
                <div className="container">
                    <h1>You Lose!</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label className="form-label" htmlFor="numPlayers">Number of Players</label>
                        <select className="form-select" id="numPlayers" name="numPlayers">
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <input className="btn btn-primary" type="submit" value="New Game" />
                    </form>
                </div>
                )
            }
            if(this.props.game.currentTurn){
                return(
                    <React.Fragment>
                        <OpponentTurn />
                        <div className="container">
                            <p>Num Players: {this.props.game.numPlayers}</p>
                            <Players players={this.props.game.players} />
                            <Hand cards={this.props.game.players[0].cards}/>
                            <form onSubmit={this.handleSubmit}>
                                <label className="form-label" htmlFor="numPlayers">Number of Players</label>
                                <select className="form-select" id="numPlayers" name="numPlayers">
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                                <input className="btn btn-primary" type="submit" value="New Game" />
                            </form>
                            <button className="btn btn-primary mt-5" onClick={() => this.forceUpdate()}>Next Turn</button>
                        </div>
                    </React.Fragment>
                )
            }
            return(
                <div className="container">
                    <p>Num Players: {this.props.game.numPlayers}</p>
                    <Players players={this.props.game.players} />
                    <Hand cards={this.props.game.players[0].cards}/>
                    <DrawCards mainComponent={this} />
                    <form onSubmit={this.handleSubmit}>
                        <label className="form-label" htmlFor="numPlayers">Number of Players</label>
                        <select className="form-select" id="numPlayers" name="numPlayers">
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <input className="btn btn-primary" type="submit" value="New Game" />
                    </form>
                    <button className="btn btn-primary mt-5" onClick={() => this.forceUpdate()}>Next Turn</button>
                </div>
            )
        }
        if(this.props.game){
            if(this.props.game.players[0] !== undefined){
                return(
                    <GameInProgress />
                )
            } else {
                return (
                    <ReadyToDeal />
                )
            }
        }
        return (
            <Loading />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)