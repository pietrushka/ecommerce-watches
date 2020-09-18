import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className='flex justify-center py-4'>
        <input type="text" className='w-10/12 px-4 py-4 text-lg text-white placeholder-white border-2 rounded-full shadow-lg bg-primary'  placeholder='Search here'>
        </input>
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
      
      <div className='grid gap-5 px-10 py-8 ' >
        
        <div className='bg-white rounded-lg shadow-lg'>
          <div className='relative p-2'>
            <Link href='/product/seiko'>
              <a>
                <h2 className='cursor-pointer'>SRPD53K1</h2>
              </a>
            </Link>
              
            <Link href='/product/seiko'>
              <a>
                <h1 className='block text-2xl cursor-pointer'>Seiko Pepsi</h1>
              </a>
            </Link>


            <button className='inline-block w-6 h-6 my-2 mr-4 bg-blue-700 rounded-full cursor-pointer focus:outline-none'></button>
            <button className='inline-block w-6 h-6 my-2 mr-4 bg-black rounded-full cursor-pointer focus:outline-none'></button>
            <button className='inline-block w-6 h-6 my-2 mr-4 bg-gray-600 rounded-full cursor-pointer focus:outline-none'></button>

            <span className='float-right pr-1 my-1 text-lg align-text-top'>$ 395</span>
            
            <svg className='absolute top-0 right-0 w-10 mt-2 mr-2 cursor-pointer hover:text-red-600' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>

          <div className='overflow-hidden cursor-pointer'>

            <Link href='/product/seiko'>
              <a>
                <img className='' src='https://salonkwadrans.pl/wp-content/uploads/2019/11/Seiko-SRPD53K1-5-Sports-Automatic.png' />
              </a>
            </Link>
          </div>
        </div>      
      
        <div className='bg-white rounded-lg shadow-lg'>
          <div className='relative p-2'>
            <Link href='/product/omega'>
              <a>
                <h2 className='cursor-pointer'>SRPD53K1</h2>
              </a>
            </Link>
              
            <Link href='/product/seiko'>
              <a>
                <h1 className='block text-2xl cursor-pointer'>Seiko Pepsi</h1>
              </a>
            </Link>


            <button className='inline-block w-6 h-6 my-2 mr-4 bg-blue-700 rounded-full cursor-pointer focus:outline-none'></button>
            <button className='inline-block w-6 h-6 my-2 mr-4 bg-black rounded-full cursor-pointer focus:outline-none'></button>
            <button className='inline-block w-6 h-6 my-2 mr-4 bg-gray-600 rounded-full cursor-pointer focus:outline-none'></button>

            <span className='float-right pr-1 my-1 text-lg align-text-top'>$ 395</span>
            
            <svg className='absolute top-0 right-0 w-10 mt-2 mr-2 cursor-pointer hover:text-red-600' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>

          <div className='overflow-hidden cursor-pointer'>

            <Link href='/product/seiko'>
              <a>
                <img className='' src='https://wkruk.pl/product_picture/square_1024/55a0661afdb58cf2a4076feb7e4b09e3.png' />
              </a>
            </Link>
          </div>
        </div>      
      
      </div>
    </>
  )
}
