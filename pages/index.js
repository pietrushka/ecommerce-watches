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
          <input type='text' className='w-10/12 px-4 py-4 text-lg text-white placeholder-white border-2 rounded-full shadow-lg bg-primary' placeholder='Search here' />
        </div>

        <div className='flex items-center py-4 justify-evenly'>
          <div className='category'>
          Rolex
          </div>
          <div className='category'>
          Omega
          </div>
          <div className='category'>
          Seiko
          </div>
        </div>

        <div className='grid gap-5 px-10 py-8 '>

          {
            watches.map(({ id, brand, price, model, cover, refCode }) => (
              <Card key={id} id={id} brand={brand} model={model} imageUrl={cover[0].url} refCode={refCode} price={price} />
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
