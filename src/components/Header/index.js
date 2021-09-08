import { React } from 'react'
import { Link } from 'react-router-dom'

import {useCart} from '../../hooks/useCart'

import styles from './Header.module.scss'

function Header(props) {
  const { totalPrice } = useCart()

  return (
    <header>
      <Link to="/" style={{textDecoration: 'none'}}>
        <div className={styles.headerLeft}>
          <img width={40} height={40} src="img/logo.png" alt="logo React Sneakers" />
          <div>
            <h3>React Sneakers</h3>
            <p className={styles.tagline}>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className={styles.headerRight}>
        <li onClick={props.onCartClick} style={{cursor: 'pointer'}}>
          <img width={18} height={18} src="img/cart.svg" alt="Корзина" />
          <span>{totalPrice} руб.</span>
        </li>
        <li>
          <Link to="/favorites">
            <img width={18} height={18} style={{cursor: 'pointer'}} src="img/heart.svg" alt="Закладки" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={18} height={18} src="img/user.svg" alt="Пользователь" />
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header