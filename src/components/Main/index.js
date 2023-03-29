import React from 'react';
import {nanoid} from "nanoid";
import Confetti from 'react-confetti';
import styles from './index.module.css';
import Tiles from './Tiles/index.js';


const Main = () => {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(tile => tile.isHeld)
    const firstValue = dice[0].value;
    const allSameValue = dice.every(tile => tile.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice])

  function generateNewTile() {
    return {
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewTile());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(tile => {
        return tile.isHeld ?
          tile :
          generateNewTile()
      }));
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  const diceElements = dice.map(tile => (
    <Tiles 
      key={tile.id} 
      value={tile.value} 
      isHeld={tile.isHeld}
      holdDice={() => holdDice(tile.id)}
    />
  ))

  function holdDice(id) {
    setDice(oldDice => oldDice.map(tile => {
      return tile.id === id ? 
        {...tile, isHeld: !tile.isHeld} :
        tile
    }))
  }

  return (
    <main className={styles.main}>
      {tenzies && <Confetti />}
      <h1 className={styles.title}>Tenzies</h1>
      <p className={styles.instructions}>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className={styles.container}>
        {diceElements}
      </div>
      <button 
        className={styles.roll}  
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default Main;