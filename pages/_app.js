import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'

import {CurrentUserProvider} from '../hooks/useCurrentUser'
import { CartProvider } from '../hooks/useCart'
import { FavoritesProvider } from '../hooks/useFavorites'

import '../styles/index.css'

const { CMS_URL } = process.env

export default function App ({ Component, pageProps }) {
  

  return (
    <CurrentUserProvider>
      <CartProvider>
        <FavoritesProvider>
          <Component {...pageProps} />
        </FavoritesProvider>
      </CartProvider>
    </CurrentUserProvider>
  )
}
