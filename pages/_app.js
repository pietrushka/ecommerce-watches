import '../styles/index.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {

  const toggleHamburger = () => {
    document.querySelector('#overlay-menu').classList.toggle('translate-y-full')
  }

  const toggleCart = () => {
    document.querySelector('#overlay-cart').classList.toggle('hidden')
  }

  return (
    <div className='relative bg-secondary'>

      <div id='overlay-cart' className='fixed top-0 z-50 flex items-end justify-center hidden w-screen h-screen bg-black bg-opacity-50'>

        <div id='cart-inner' className='w-11/12 mb-4 bg-white rounded-lg'>

          <div className='relative my-1'>
            <h2 className='text-4xl text-center'>Cart</h2>
            <button onClick={toggleCart} className='absolute top-0 right-0 w-1/6 focus:outline-none'>
              <svg className='ml-auto ' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

          </div>


          <div className='flex items-center justify-center'>
            <img className='inline-block object-cover w-1/3' src='https://wkruk.pl/product_picture/square_1024/55a0661afdb58cf2a4076feb7e4b09e3.png' />

            <span className='w-1/3 text-center'>Omega</span>

            <span className='w-1/3 text-center right-4'>$396</span>
          </div>
          <p className='text-center'>Swipe item to remove it</p>
          <div className='flex items-center justify-center w-full my-2 rounded-t-lg '>
            <button className='px-20 py-4 text-lg text-white rounded-full shadow-lg bg-primary focus:outline-none'>Checkout $395</button>
          </div>
        </div>
      </div>
      
      <nav className='sticky top-0 z-30 w-full px-4 py-2 bg-white rounded-b-lg shadow text-primary' >
        <div className='flex items-center justify-between py-1'>

          <button onClick={toggleHamburger} className="px-4 cursor-pointer md:hidden focus:outline-none" id='burger'>
            <svg className="w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href='/'>
            <a>
              <h1 className='p-4 text-xl font-bold'>Sikory.</h1>
            </a>
          </Link>
          
          <button onClick={toggleCart} className="px-4 cursor-pointer md:hidden focus:outline-none" id='burger'>
            <svg className='w-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        
          
        </div>
        
      </nav>
      
      <div id='overlay-menu' className='fixed bottom-0 left-0 right-0 z-20 flex items-center justify-center h-screen transition duration-500 ease-in transform translate-y-full bg-secondary'>
        <ul className='text-2xl'>
        <li className='p-6 text-center'>Favorites</li>
          <li className='p-6 text-center'>About</li>
          <li className='p-6 text-center'>Contact</li>
          <li className='p-6 text-center'>Login</li>
          <li className='p-6 text-center'>Register</li>
        </ul>
      </div>

      <Component className='min-h-screen' {...pageProps} />
    </div>
  ) 
}

export default MyApp
