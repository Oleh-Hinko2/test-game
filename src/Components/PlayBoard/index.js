import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { setWinnersData } from '../../redux/winners';
import { toggleStatusGame, setStatusAgainBtns } from "../../redux/settings";

const constants = {
    format: 'HH:mm; DD MMMM YYYY',
    messageTitle: 'Winner'
}

class PlayBoard extends Component {
    state = {
        randomDivs: [],
        numbersArray: [],
        correctlyСlickedСells: [],
        wronglyСlickedСells: [],
        uniqueNumber: 0,
        finishGame: false,
        startTimer: null,
        timeFinish: false
    }

    divs = []

    componentDidUpdate = (prevProps) => {
        const { currentSettings: { field, delay }, startGame} = this.props;
        const square = field * field
        if (prevProps.currentSettings.field !== field || prevProps.currentSettings.delay !== delay) {
            startGame && this.generateNumber(square)
            this.setState(prevState => {
                return {
                    ...prevState,
                    correctlyСlickedСells: [],
                    wronglyСlickedСells: [],
                }
            })
            startGame && this.setState(prevState => {
                return {
                    ...prevState,
                    finishGame: false
                }
            })
        }
    }

    handleCheckWhoWin = () => {
        const { correctlyСlickedСells, wronglyСlickedСells } = this.state;
        const { currentSettings: { field }, setWinnersData , userName, toggleStatusGame, setStatusAgainBtns } = this.props;
        const square = field*field;
        if (correctlyСlickedСells.length > (square / 2) || wronglyСlickedСells.length > (square / 2)) {
            if(correctlyСlickedСells.length > wronglyСlickedСells.length ) {
                setWinnersData({
                    winner: userName,
                    date: moment().format(constants.format)
                })
                this.setState(prevState => {
                    return {
                        ...prevState,
                        winner: userName
                    }
                })
            } else {
                setWinnersData({
                    winner: "Computer",
                    date: moment().format(constants.format)
                })
                this.setState(prevState => {
                    return {
                        ...prevState,
                        winner: "Computer"
                    }
                })
            }
            toggleStatusGame();
            setStatusAgainBtns();
            this.setState(prevState => {
                return {
                    ...prevState,
                    correctlyСlickedСells: [],
                    wronglyСlickedСells: [],
                    finishGame: true,
                }
            })
        }
    }

    handleClickDiv = index => {
        const { uniqueNumber, correctlyСlickedСells, wronglyСlickedСells, startTimer, finishGame} = this.state;
        const { currentSettings: { field, delay } } = this.props;
        const allowClick = startTimer + delay;
        if (uniqueNumber === index && allowClick >= Date.now()) {
            this.setState(prevState => {
                correctlyСlickedСells.push(uniqueNumber)
                return {
                    ...prevState,
                    correctlyСlickedСells: correctlyСlickedСells
                }
            }, () => {
                this.handleCheckWhoWin();
                !finishGame && this.handleShowRandomDiv(field * field);
            })
        } else {
            wronglyСlickedСells.push(uniqueNumber)
            this.setState(prevState => {
                return {
                    ...prevState,
                    wronglyСlickedСells: wronglyСlickedСells
                }
            }, () => {
                this.handleCheckWhoWin()
                !finishGame && this.handleShowRandomDiv(field * field)
            })
        }

    }

    handleDiv = (field, randomIndex) => {
        const { correctlyСlickedСells, wronglyСlickedСells } = this.state;
        let divs = []
        for (let i = 1; i <= field; i++) {
            if (correctlyСlickedСells.findIndex(item => i === item) > -1) {
                divs.push(
                    <div className='item green' onClick={() => this.handleClickDiv(i)} key={i}></div>
                )
            } else if (wronglyСlickedСells.findIndex(item => i === item) > -1) {
                divs.push(
                    <div className='item red' onClick={() => this.handleClickDiv(i)} key={i}></div>
                )
            } else if (i === randomIndex) {
                divs.push(
                    <div className='item blue' onClick={() => this.handleClickDiv(i)} key={i}></div>
                )
            } else {
                divs.push(
                    <div className='item' onClick={() => this.handleClickDiv(i)} key={i}></div>
                )
            }
        }
        return divs
    }

    randomNumber = field => Math.floor(Math.random() * (field));

    generateRandomNumber = (min, max) => {
        let step1 = max - min + 1;
        let step2 = Math.random() * step1
        let result = Math.floor(step2) + min
        return result
    }

    createArrayOfNumbers = (start, end) => {
        let myArray = [];
        for (let i = start; i <= end; i++) {
            myArray.push(i);
        }
        return myArray;
    }

    generateNumber = field => {
        this.setState(prevState => {
            return {
                ...prevState,
                numbersArray: this.createArrayOfNumbers(1, field)
            }
        }, () => {
            this.handleShowRandomDiv(field)
        })
    }

    handleShowRandomDiv = square => {
        let { numbersArray } = this.state;
        if (!numbersArray.length) {
            this.generateNumber(square)
            this.divs = this.handleDiv(square, 0)
        } else {
            let randomIndex = this.generateRandomNumber(0, numbersArray.length - 1)
            let randomNumber = numbersArray[randomIndex];
            numbersArray.splice(randomIndex, 1)
            this.setState(prevState => {
                return {
                    ...prevState,
                    numbersArray: numbersArray,
                    uniqueNumber: randomNumber,
                    startTimer: Date.now()
                }
            })
            // setTimeout(() => {
            //     this.handleClearTime(randomNumber)
            // }, delay)
            this.divs = this.handleDiv(square, randomNumber)
        }
    }
    
    handleClearTime = randomNumber => {
        const { wronglyСlickedСells, finishGame } = this.state;
        const { currentSettings: { field, delay } } = this.props;
        const square = field*field;
        wronglyСlickedСells.push(randomNumber);
        this.setState(prevState => {
            return {
                ...prevState,
                wronglyСlickedСells: wronglyСlickedСells
            }
        },() => {
            this.handleCheckWhoWin();
        })
        !finishGame && this.handleShowRandomDiv(square, delay);
    }

    render() {
        const { field } = this.props.currentSettings;
        const { finishGame, winner } = this.state;
        return (
            <>
                <div className="message-game">
                    {finishGame && <p>{constants.messageTitle} {winner}</p>}
                </div>
                <div className={`div__container  ${(field === 5 && 'easy') || (field === 10 && 'normal') || (field === 15 && 'hard')}`}>
                    {this.divs}
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    currentSettings: state.settings.currentSettings,
    userName: state.settings.userName,
    startGame: state.settings.startGame,
})

const mapDispatchToProps = {
    setWinnersData,
    toggleStatusGame,
    setStatusAgainBtns
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayBoard);