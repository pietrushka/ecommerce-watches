import { useRouter } from 'next/router'

export default function PrevPageNavbar () {
  const router = useRouter()

  return (
    <>
      <nav className='sticky top-0 z-30 w-full px-4 py-2 bg-white rounded-b-lg shadow text-primary'>
        <button onClick={() => router.back()} className='block w-10'>
          <svg className='w-full' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
        </button>
      </nav>
    </>
  )
}
