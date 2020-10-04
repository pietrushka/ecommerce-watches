import { useRef, useState } from 'react'

import Card from './card'

export default function ItemsOverview ({ items }) {
  const sortOptRef = useRef(null)
  const [searchBox, setSearchBox] = useState('')
  const [sortValue, setSortValue] = useState('default')

  const handleChange = event => {
    setSortValue(event.target.value)
  }

  const closeDetails = event => {
    sortOptRef.current.removeAttribute('open')
  }

  const searchConditions = item => {
    const searchQuery = searchBox.toLowerCase().trim()
    return item.brand.toLowerCase(searchQuery).includes() || item.model.toLowerCase().includes(searchQuery)
  }
  const searchedItems = items.filter(item => searchConditions(item))

  const sortItems = () => {
    if (sortValue === 'lowestPrice') return searchedItems.sort((item, prevItem) => parseFloat(item.price) - parseFloat(prevItem.price))
    if (sortValue === 'highestPrice') return searchedItems.sort((item, prevItem) => parseFloat(prevItem.price) - parseFloat(item.price))
    return searchedItems
  }

  const sortedItems = sortItems()

  return (
    <>
      <div className='flex justify-center py-4 pb-6' onClick={() => sortOptRef.current.removeAttribute('open')}>
        <input
          type='text'
          className='w-10/12 max-w-xl px-6 py-4 text-lg text-white placeholder-white border-2 rounded-full shadow-lg outline-none xl:max-w-2xl bg-primary'
          placeholder='Search here'
          onChange={(event) => setSearchBox(event.target.value)}
          value={searchBox}
        />
      </div>

      <div className='flex justify-center select-none'>
        <details ref={sortOptRef} className='w-1/2 max-w-sm text-center md:w-1/3 lg:w-1/4 handle-rounded'>
          <summary className='py-1 text-xl rounded-lg outline-none cursor-pointer bg-primary text-secondary'>Sort by</summary>
          <ul onChange={handleChange} className='absolute z-20 w-1/2 max-w-sm p-4 text-lg rounded-b-lg shadow-lg md:w-1/3 lg:w-1/4 bg-secondary'>
            <li>
              <input className='hidden fill-label' type='radio' name='sortValue' value='default' id='default' defaultChecked={sortValue === 'default'} />
              <label onClick={closeDetails} htmlFor='default' className='block w-4/6 p-2 mx-auto my-2 text-center bg-white rounded-lg shadow'>Default</label>
            </li>
            <li>
              <input className='hidden fill-label' type='radio' name='sortValue' value='lowestPrice' id='lowestPrice' />
              <label onClick={closeDetails} htmlFor='lowestPrice' className='block w-4/6 p-2 mx-auto my-2 text-center bg-white rounded-lg shadow'>Lowest price</label>
            </li>
            <li>
              <input className='hidden fill-label' type='radio' name='sortValue' value='highestPrice' id='highestPrice' />
              <label onClick={closeDetails} htmlFor='highestPrice' className='block w-4/6 p-2 mx-auto my-2 text-center bg-white rounded-lg shadow'>Highest price</label>
            </li>
          </ul>
        </details>
      </div>

      <div
        onClick={() => sortOptRef.current.removeAttribute('open')}
        className='grid gap-5 px-8 py-8 pt-10 mx-auto sm:gap-2 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 lg:w-10/12'
      >
        {
          sortedItems.map(({ id, brand, price, model, refCode, cover, images }) => (
            <Card key={id} item={{ id, brand, price, model, refCode, cover, images }} />
          ))
        }

      </div>
    </>
  )
}
