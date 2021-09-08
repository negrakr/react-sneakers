import Card from '../components/Card'

import styles from '../components/Drawer/Drawer.module.scss'

function Home({
  items,
  searchValue,
  setSearchValue,
  onAddToCart,
  onAddToFavorite,
  onChangeSearchInput,
  isLoading
}) {
  const renderItems = () => {
    const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))

    return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ))
  }

  return (
    <div className="content">
      <div className="title-search">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block">
          <img src="/img/search.svg" alt="search" />
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
          {
            searchValue &&
            <img
              onClick={() => setSearchValue('')}
              className={styles.cartItemRemove}
              src="/img/btn-remove.svg"
              alt="clear"
            />
          }
        </div>
      </div>

      <div className="sneakers">          
        {
          renderItems()
        }
      </div>
    </div>
  )
}

export default Home