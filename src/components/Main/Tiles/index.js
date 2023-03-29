import styles from '../Tiles/index.module.css';

const Tiles = (props) => {
  const styleTiles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }

  return (
    <div 
      className={styles.face} 
      style={styleTiles}
      onClick={props.holdDice}
    >
      <h2 className={styles.num}>{props.value}</h2>
    </div>
  )
}

export default Tiles;