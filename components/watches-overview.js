import { useState } from 'react'

import Card from '../components/card'

export default function WatchesOverview ({ watches }) {
  const [searchBox, setSearchBox] = useState('')
  const [sortValue, setSortValue] = useState('default')

  const handleChange = event => {
    setSortValue(event.target.value)
  }

  const searchConditions = watch => {
    const searchQuery = searchBox.toLowerCase().trim()
    return watch.brand.toLowerCase(searchQuery).includes() || watch.model.toLowerCase().includes(searchQuery)
  }
  const searchedWatches = watches.filter(watch => searchConditions(watch))

  const sortWatches = () => {
    if (sortValue === 'lowestPrice') return searchedWatches.sort((watch, prevWatch) => parseFloat(watch.price) - parseFloat(prevWatch.price))
    if (sortValue === 'highestPrice') return searchedWatches.sort((watch, prevWatch) => parseFloat(prevWatch.price) - parseFloat(watch.price))
    return searchedWatches
  }

  const sortedWatches = sortWatches()
  return (
    <>
      <div className='flex justify-center py-4'>
        <input
          type='text'
          className='w-10/12 max-w-xl px-2 py-4 text-lg text-white placeholder-white border-2 rounded-full shadow-lg outline-none xl:max-w-2xl bg-primary'
          placeholder='Search here'
          onChange={(event) => setSearchBox(event.target.value)}
          value={searchBox}
        />
      </div>

      <div className='flex justify-center py-4'>
        <details className='w-1/4 text-center handle-rounded'>
          <summary className='text-xl rounded-lg outline-none cursor-pointer bg-primary text-secondary'>Sort by</summary>
          <ul onChange={handleChange} className='absolute z-20 w-1/4 p-4 text-lg rounded-b-lg shadow-md bg-secondary'>
            <li>
              <input className='hidden fill-label' type='radio' name='sortValue' value='default' id='default' defaultChecked={sortValue === 'default'} />
              <label htmlFor='default' className='block w-4/6 p-2 mx-auto my-2 text-center bg-white rounded-lg shadow'>Default</label>
            </li>
            <li>
              <input className='hidden fill-label' type='radio' name='sortValue' value='lowestPrice' id='lowestPrice' />
              <label htmlFor='lowestPrice' className='block w-4/6 p-2 mx-auto my-2 text-center bg-white rounded-lg shadow'>Lowest price</label>
            </li>
            <li>
              <input className='hidden fill-label' type='radio' name='sortValue' value='highestPrice' id='highestPrice' />
              <label htmlFor='highestPrice' className='block w-4/6 p-2 mx-auto my-2 text-center bg-white rounded-lg shadow'>Highest price</label>
            </li>
          </ul>
        </details>
      </div>

      <div className='grid gap-5 px-8 py-8 mx-auto sm:gap-2 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:gap-8 lg:w-10/12'>
        {
          sortedWatches.map(({ id, brand, price, model, refCode, imageUrl }) => (
            <Card key={id} id={id} brand={brand} model={model} imageUrl={imageUrl} refCode={refCode} price={price} />
          ))
        }

      </div>
    </>
  )
}
