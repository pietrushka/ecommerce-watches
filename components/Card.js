import Link from 'next/link'


export default function Card ({id, brand, model, price, imageUrl, refCode}) {
  const {API_URL} = process.env
  console.log(price)
  
  return (
    <div className='bg-white rounded-lg shadow-lg'>
    <div className='relative p-2'>
            <Link href={`/product/${id}`}>
              <a>
                <img src={API_URL + imageUrl} />
              </a>
            </Link>

            <Link href={`/product/${id}`}>
              <a>
                <h2 className='cursor-pointer'>{refCode}</h2>
              </a>
            </Link>
              
            <Link href={`/product/${id}`}>
              <a>
                <h1 className='block text-2xl cursor-pointer'>{`${brand} ${model}`}</h1>
              </a>
            </Link>

  <span className='float-right pr-1 my-1 text-lg align-text-top'>{`$ ${price}`}</span>
            
            <svg className='absolute top-0 right-0 w-10 mt-2 mr-2 cursor-pointer hover:text-red-600' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          </div>
  )
}