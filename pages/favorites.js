import Head from 'next/head'

import { useCart } from '../hooks/useCart'
import Layout from '../components/layout'
import FullNavbar from '../components/full-navbar'
import Card from '../components/card'

export default function FavoritesPage () {
  const { items } = useCart()
  return (
    <Layout>
      <Head>
        <title>Favorites</title>
      </Head>
      <FullNavbar />

      <div className='mx-auto'>

        {
          items.length === 0
            ? (
              <h1 className='my-auto text-3xl text-center text-red-500'>You don't have favorites yet</h1>
            ) : (
              <>
                <h1 className='py-4 text-3xl text-center'>Your favorites</h1>
                <div className='grid gap-5 px-8 py-8 mx-auto sm:gap-2 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:gap-8 lg:w-10/12'>
                  {
                    items.map(({ id, brand, price, model, refCode, imageUrl }) => (
                      <Card key={id} id={id} brand={brand} model={model} imageUrl={imageUrl} refCode={refCode} price={price} />
                    ))
                  }
                </div>
              </>
            )
        }
      </div>

    </Layout>
  )
}
