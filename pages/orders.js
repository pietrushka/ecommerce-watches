import Head from 'next/head'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

import WithSpinner from '../components/with-spinner'
import Layout from '../components/layout'
import FullNavbar from '../components/full-navbar'
import OrderItem from '../components/order-item'

const { CMS_URL } = process.env

export default function OrdersPage () {
  const [isLoading, setIsLoading] = useState(true)
  const [ordersData, setOrdersData] = useState(null) // array
  const token = Cookies.get('tokenSikory')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const responseOrdersIds = await axios.get(`${CMS_URL}/users/getMyOrders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setOrdersData(responseOrdersIds.data.orders)
        setIsLoading(false)
      } catch (error) {
        console.log(error.response)
      }
    }

    token ? fetchOrders() : Router.push('/login')
  }, [])

  return (
    <>
      <Layout>
        <Head>
          <title>Orders</title>
        </Head>

        <FullNavbar />
        <WithSpinner isLoading={isLoading}>
          <div className='w-11/12 mx-auto'>
            {
              ordersData && (
                ordersData.length === 0 ? (
                  <div className='py-16'>
                    <h1 className='text-3xl text-center text-red-500'>You don't have orders yet</h1>
                  </div>
                ) : (
                  <>
                    <div className='flex justify-center py-4'>
                      <h1 className='inline text-3xl text-center border-b-2 border-primary'>Your orders</h1>
                    </div>
                    <div className='flex flex-col items-center justify-center w-full'>
                      {
                        ordersData.map(order => (
                          <OrderItem key={order.id} order={order} />
                        ))
                      }
                    </div>
                  </>
                )
              )
            }
          </div>
        </WithSpinner>
      </Layout>
    </>
  )
}
