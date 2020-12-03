import {CurrentUserProvider} from '../hooks/useCurrentUser'
import { CartProvider } from '../hooks/useCart'
import { FavoritesProvider } from '../hooks/useFavorites'

import '../styles/index.css'

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
