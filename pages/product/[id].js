import Head from 'next/head'

import Layout from '../../components/layout'
import FullNavbar from '../../components/full-navbar'

import { getWatchesPaths, getWatchById} from '../../lib/api'

const { API_URL } = process.env


export default function ProductPage ({ watch }) {
  const { brand, model, price, cover, ref } = watch
  const brandAndModel = `${brand} ${model}`
  const imageUrl = `${API_URL}${cover[0].url}`

  return (
    <>
       <Layout>
        <Head>
          <title>{brandAndModel}</title>
        </Head>

        <FullNavbar />

        <div className='relative overflow-hidden shadow-lg'>
          <img className='object-cover w-full' src={imageUrl} />

          <div className='absolute top-0 right-0 flex flex-col justify-center h-full mr-5'>
            <button className='block w-2 h-2 my-1 rounded-full bg-primary focus:outline-none' />
            <button className='block w-2 h-2 my-1 rounded-full bg-primary focus:outline-none' />
            <button className='block w-2 h-2 my-1 rounded-full bg-primary focus:outline-none' />
          </div>
        </div>

        <div className='relative p-4'>

          <h2 className='text-lg cursor-pointer'>{ref}</h2>
          <h1 className='block text-3xl cursor-pointer'>{brandAndModel}</h1>

          <div className='flex items-center justify-center mt-4'>
            <button className='inline-block w-8 h-8 mr-4 bg-blue-700 rounded-full cursor-pointer focus:outline-none' />
            <button className='inline-block w-8 h-8 mr-4 bg-black rounded-full cursor-pointer focus:outline-none' />
            <button className='inline-block w-8 h-8 mr-4 bg-gray-600 rounded-full cursor-pointer focus:outline-none' />
          </div>

          <svg className='absolute top-0 right-0 w-12 mt-4 mr-4 cursor-pointer hover:text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
          </svg>
        </div>

        <div className='flex items-center justify-center w-full my-2 rounded-t-lg '>
          <button className='px-20 py-4 text-lg text-white rounded-full shadow-lg focus:outline-none bg-primary'>{`Add to cart $${price}`}</button>
        </div>

        <div className='p-4'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticPaths () {
  const paths = await getWatchesPaths()

  return { paths, fallback: false }
}

export async function getStaticProps ({ params }) {
  const watch = await getWatchById(params.id)

  return { props: { watch } }
}