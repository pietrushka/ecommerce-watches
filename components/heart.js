import { useState, useEffect, useContext } from 'react'

import AppContext from '../context/app-context'
import { useFavorites } from '../hooks/useFavorites'

export default function Heart ({ itemId, size }) {
  const { isAuthenticated } = useContext(AppContext)
  const [isFavorite, setFavorite] = useState(false)
  const { favorites, addFavorite, removeFavorite } = useFavorites()

  useEffect(() => {
    if (favorites.length === 0) return setFavorite(false)

    const isFavExist = favorites.find(favorite => favorite === itemId)
    isFavExist ? setFavorite(true) : setFavorite(false)
  }, [favorites])

  const handleHeartClick = () => {
    isAuthenticated
      ? isFavorite ? removeFavorite(itemId) : addFavorite(itemId)
      : window.alert('You must be logged in')
  }

  return (
    <>
      <button onClick={handleHeartClick}>
        <svg className={`${isFavorite && 'fill-current text-red-600'} absolute top-0 right-0 w-${size} mt-2 mr-2 cursor-pointer hover:text-red-600`} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
        </svg>
      </button>
    </>
  )
}
