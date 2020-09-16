import '../styles/index.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  const toggleHamburger = () => {
    document.querySelector('#overlay-menu').classList.toggle('translate-y-full')
  }

  return (
    <div className='bg-secondary'>
      
      <nav className='sticky top-0 z-30 w-full px-4 py-2 bg-white rounded-b-lg shadow text-primary' >
        <div className='flex items-center justify-between py-1'>

          <button onClick={toggleHamburger} class="px-4 cursor-pointer md:hidden focus:outline-none" id='burger'>
            <svg class="w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href='/'>
            <a>
              <h1 className='p-4 text-xl font-bold'>Sikory.</h1>
            </a>
          </Link>
          
          <div class="px-4 cursor-pointer md:hidden" id='burger'>
            <svg class='w-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        
          
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

      <Component classList='min-h-screen' {...pageProps} />
    </div>
  ) 
}

export default MyApp
