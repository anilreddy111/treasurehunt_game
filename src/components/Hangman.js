import React, { Component } from 'react';
import './Hangman.css';
import { randomWord } from './words';

import step0 from "./images/0.jpg";
import step1 from "./images/1.jpg";
import step2 from "./images/2.jpg";
import step3 from "./images/3.jpg";
import step4 from "./images/4.jpg";
import step5 from "./images/5.jpg";
import step6 from "./images/6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [step0, step1, step2, step3, step4, step5, step6]
  }

  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord()
    }
  }

  handleGuess = e => {
    let letter = e.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.answer.includes(letter) ? 0 : 1)
    }));
  }

  guessedWord() {
    return this.state.answer.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
      <button
        className='btn btn-lg btn-primary m-2'
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord()
    });
  }

  render() {
    const gameOver = this.state.mistake >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer.answer;
    let gameStat = this.generateButtons();

    if (isWinner) {
      gameStat = "You Won!!!"
      localStorage.setItem("mistakes", this.state.mistake);
      window.location.pathname = "won";
    }

    if (gameOver) {

      gameStat = "You Lost!!!"
      window.location.pathname = "lost";
    }

    return (
      <div className="Hangman m-5">
        <h3 className='text-info'>Guess the word correctly to escape from the Island with treasure otherwise, you will be hanged</h3>

        <div className="float-right text-center display-6 text-danger">Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}</div>
        <div className="text-center">
          <img src={this.props.images[this.state.mistake]} alt=""/>
        </div>
        <div className="text-center">
        <p className='display-6'>QUESTION TO OPEN THE TREASURE</p>
          <p className='display-6 text-success'>{this.state.answer.question}:</p>
          <p>
            {!gameOver ? this.guessedWord() : this.state.answer.answer}
          </p>
          <p>{gameStat}</p>
          {/* <button className='btn btn-info' onClick={this.resetButton}>Reset</button> */}
        </div>
      </div>
    )
  }
}

export default Hangman;