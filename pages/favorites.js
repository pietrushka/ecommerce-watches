import Head from 'next/head'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import WithSpinner from '../components/with-spinner'
import Layout from '../components/layout'
import FullNavbar from '../components/full-navbar'
import Card from '../components/card'

import { useFavorites } from '../hooks/useFavorites'

export default function FavoritesPage () {
  const [isLoading, setIsLoading] = useState(true)
  const { favorites } = useFavorites()

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) Router.push('/')
    console.log(favorites)
    if (token && (favorites)) setIsLoading(false)
  }, [favorites])

  return (
    <Layout>
      <Head>
        <title>Favorites</title>
      </Head>
      <FullNavbar />

      <WithSpinner isLoading={isLoading}>

        <div className='mx-auto'>
          {
            favorites.length === 0
              ? (
                <div className='py-16'>
                  <h1 className='text-3xl text-center text-red-500'>You don't have favorites yet</h1>
                </div>
              ) : (
                <>
                  <div className='flex justify-center py-4'>
                    <h1 className='inline text-3xl text-center border-b-2 border-primary'>Your favorites</h1>
                  </div>
                  <div className='grid gap-5 px-16 py-8 mx-auto sm:gap-2 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:gap-8 lg:w-10/12'>
                    {
                      favorites.map(({ id, brand, price, model, refCode, imageUrl }) => (
                        <Card key={id} item={{ id, brand, price, model, refCode, imageUrl }} />
                      ))
                    }
                  </div>
                </>
              )
          }
        </div>
      </WithSpinner>

    </Layout>
  )
}
