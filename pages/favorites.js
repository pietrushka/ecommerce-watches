import Head from 'next/head'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

import WithSpinner from '../components/with-spinner'
import Layout from '../components/layout'
import FullNavbar from '../components/full-navbar'
import Card from '../components/card'

const { CMS_URL } = process.env

export default function FavoritesPage () {
  const [isLoading, setIsLoading] = useState(true)
  const token = Cookies.get('token')
  const [favoritesData, setFavoritesData] = useState(null)

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const response = await axios.get(`${CMS_URL}/users/myPopulatedFavorites`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setFavoritesData(response.data.favorites)
        setIsLoading(false)
      } catch (error) {
        console.log(error.response)
      }
    }

    token ? fetchFavs() : Router.push('/login')
  }, [])

  return (
    <Layout>
      <Head>
        <title>Favorites</title>
      </Head>
      <FullNavbar />

      <WithSpinner isLoading={isLoading}>
        <div className='mx-auto'>
          {
            favoritesData && (
              favoritesData.length === 0 ? (
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
                      favoritesData.map(({ id, brand, price, model, refCode, cover, images }) => (
                        <Card key={id} item={{ id, brand, price, model, refCode, cover, images }} />
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
  )
}
