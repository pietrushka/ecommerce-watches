import { useEffect, useState } from 'react'
import Router from 'next/router'
import Cookies from 'js-cookie'

import Layout from '../components/layout'
import FullNavbar from '../components/full-navbar'
import WithSpinner from '../components/with-spinner'

export default function OrdersPage () {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get('token')
    token ? setIsLoading(false) : Router.push('/login')
  }, [])

  return (
    <>
      <Layout>
        <FullNavbar />
        <WithSpinner isLoading={isLoading}>
          <div>
            orders
          </div>
        </WithSpinner>
      </Layout>
    </>
  )
}
