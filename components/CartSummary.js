export default function CartSummary () {
  return (
     <div className='p-2 rounded-b-lg shadow-lg bg-secondary'>
        <h2 className='text-xl text-center'>Cart summary</h2>
        <div className='flex items-center justify-center'>
          <img className='inline-block object-cover w-1/6' src='https://wkruk.pl/product_picture/square_1024/55a0661afdb58cf2a4076feb7e4b09e3.png' />

          <span className='w-1/3 text-center'>Omega</span>

          <span>1pcs</span>

          <span className='w-1/3 text-center right-4'>$396</span>

          <button className='w-1/6 p-3'>
            <svg className='p-1 mr-3 text-gray-100 bg-red-600 rounded-full ' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
  )
}