import { React, useContext } from 'react'
import AppContext from '../context'
import Card from '../components/Card'

function Favorites() {
  const { favorites, onAddToFavorite, onAddToCart } = useContext(AppContext)

  return (
    <div className="content">
      <div className="title-search">
        <h1>Мои закладки</h1>
      </div>

      <div className="sneakers">          
        {
          favorites.map((item, index) => (
            <Card
              key={index}
              favorited={true}
              onFavorite={onAddToFavorite}
              onPlus={(obj) => onAddToCart(obj)}
              {...item}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Favorites