import axios from 'axios'
import { React, useState, useEffect } from 'react'
import Card from '../components/Card'

function Orders() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://610977a3d71b670017639941.mockapi.io/orders')
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
        setIsLoading(false)
      } catch (error) {
        alert('Ошибка при запросе заказов')
        console.error(error)
      }
    })()
  }, [])

  return (
    <div className="content">
      <div className="title-search">
        <h1>Мои заказы</h1>
      </div>

      <div className="sneakers">          
        {
          (isLoading ? [...Array(5)] : orders).map((item, index) => (
            <Card
              key={index}
              loading={isLoading}
              {...item}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Orders