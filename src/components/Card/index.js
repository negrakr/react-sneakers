import React, { useState, useContext } from 'react'
import AppContext from '../../context'
import styles from './Card.module.scss'

import ContentLoader from "react-content-loader"

function Card({
  id,
  imageUrl,
  title,
  price,
  onPlus,
  onFavorite,
  favorited = false,
  loading = false
}) {
  const { isItemAdded } = useContext(AppContext)
  const [isFavorite, setIsFavorite] = useState(favorited)
  const obj = { id, parentId: id, title, imageUrl, price }

  const handlePlus = () => {
    onPlus(obj)
  }

  const handleFavorite = () => {
    onFavorite(obj)
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={styles.card}>
      {
        loading ? (
          <ContentLoader 
            speed={2}
            width={150}
            height={187}
            viewBox="0 0 150 187"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="150" height="91" /> 
            <rect x="0" y="107" rx="3" ry="3" width="150" height="15" /> 
            <rect x="0" y="126" rx="3" ry="3" width="93" height="15" /> 
            <rect x="0" y="163" rx="8" ry="8" width="80" height="24" /> 
            <rect x="118" y="155" rx="8" ry="8" width="32" height="32" />
          </ContentLoader>
        ) : (
          <>
            {onFavorite && (
              <div className={styles.favorite} onClick={handleFavorite}>
                <img src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'} alt="unliked" />
              </div>
            )}
            <img width={133} height={112} src={imageUrl} alt="sneakers" />
            <h5>{title}</h5>
            <div className={styles.cardPriceAndButton}>
              <div className={styles.cardTextDescr}>
                <span>Цена:</span>
                <b>{price}</b>
              </div>
              {onPlus && (
                <img
                  className={styles.plus}
                  onClick={handlePlus}
                  src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                  alt="plus"
                />
              )}
            </div>
          </>
        )}
    </div>
  )
}

export default Card;