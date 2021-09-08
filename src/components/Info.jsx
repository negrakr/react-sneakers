import { React, useContext } from 'react'
import AppContext from '../context'
import styles from '../components/Drawer/Drawer.module.scss'

const Info = ({ title, image, description }) => {
  const { setCartOpened } = useContext(AppContext)

  return (
    <div className={styles.drawerEmpty}>
      <img className={styles.cardboard} src={image} alt="empty" />
      <h3>{title}</h3>
      <p>{description}</p>
      <button className={styles.greenButton} onClick={() => setCartOpened(false)}>
        Вернуться назад
        <img src="/img/arrow.svg" alt="arrow" />
      </button>
    </div>
  )
}

export default Info