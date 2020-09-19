
import '../styles/index.css'

function MyApp ({ Component, pageProps }) {
  return (
    <div className='relative min-h-screen bg-secondary'>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
