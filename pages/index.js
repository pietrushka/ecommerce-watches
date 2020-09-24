import Layout from '../components/layout'
import FullNavbar from '../components/full-navbar'
import Card from '../components/card'

import { getAllWatches } from '../lib/api'

export default function Home ({ watches }) {
  return (
    <>
      <Layout>

        <FullNavbar />
        <div className='flex justify-center py-4'>
          <input type='text' className='w-10/12 max-w-xl px-2 py-4 text-lg text-white placeholder-white border-2 rounded-full shadow-lg outline-none xl:max-w-2xl bg-primary' placeholder='Search here' />
        </div>

        <div className='grid gap-5 px-8 py-8 mx-auto sm:gap-2 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:gap-8 lg:w-10/12'>

          {
            watches.map(({ id, brand, price, model, refCode, imageUrl }) => (
              <Card key={id} id={id} brand={brand} model={model} imageUrl={imageUrl} refCode={refCode} price={price} />
            ))
          }

        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps () {
  const data = await getAllWatches()
  return {
    props: {
      watches: data
    }
  }
}
