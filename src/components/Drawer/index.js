import { React, useState } from 'react'
import axios from 'axios'

import Info from '../Info'
import {useCart} from '../../hooks/useCart'

import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart()
  const [orderId, setOrderId] = useState(null)
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('https://610977a3d71b670017639941.mockapi.io/orders', {
        items: cartItems
      })
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i]
        await axios.delete('https://610977a3d71b670017639941.mockapi.io/cart/' + item.id)
        await delay(1000)
      }
    } catch (error) {
      alert('Ошибка при создании заказа :(')
      console.error(error)
    }
    setIsLoading(false)
  }

  return (
    <div className={`${styles.overlay} ${opened ? styles.visible : ''}`}>
      <div className={styles.drawer}>
        <div className={styles.drawerHead}>
          <h2>Корзина</h2>
          <img className={styles.cartItemRemove} onClick={onClose} src="/img/btn-remove.svg" alt="close" />
        </div>

        {
          items.length > 0 ? (
            <div className={styles.drawerGoods}>
              <div className={styles.items}>
                {
                  items.map((obj) => (
                    <div key={obj.id} className={styles.cartItem}>
                      <div style={{backgroundImage: `url(${obj.imageUrl})`}} className={styles.cartItemPic}></div>
                      <div className={styles.cartItemDescr}>
                        <p>{obj.title}</p>
                        <b>{obj.price} руб.</b>
                      </div>
                      <img onClick={() => onRemove(obj.id)} className={styles.cartItemRemove} src="/img/btn-remove.svg" alt="remove" />
                    </div>
                  ))
                }
              </div>

              <div className={styles.cartTotalBlock}>
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>{totalPrice} руб.</b>
                  </li>
                  <li>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>{Math.ceil(totalPrice * 0.05)} руб.</b>
                  </li>
                </ul>
                <button disabled={isLoading} className={styles.greenButton} onClick={onClickOrder}>
                  Оформить заказ
                  <img src="/img/arrow.svg" alt="arrow" />
                </button>
              </div>
            </div>
          ) : (
            <Info
              title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
              description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке.` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
              image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
            />
          )
        }
      </div>
    </div>
  )
}

export default Drawer;