export default function SliderArrow ({ direction, handlerFunction, children }) {
  return (
    <div className={`absolute ${direction}-0 top-0 flex justify-center items-center w-2/12 h-full`}>
      <button onClick={() => handlerFunction(direction)} className='w-12 h-12 mx-4 my-1 bg-white border-4 rounded-full border-primary focus:outline-none'>
        {children}
      </button>
    </div>
  )
}
