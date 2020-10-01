export default function SliderDots ({ handlerFunction, currentIdx }) {
  const ImageBtn = ({ idx }) => <button onClick={() => handlerFunction(idx)} className={`block w-4 h-4 mx-2 my-1 bg-white border-4 rounded-full border-primary focus:outline-none ${currentIdx === idx && 'bg-primary'}`} />

  return (
    <div className='absolute bottom-0 flex justify-center w-full h-10'>
      <ImageBtn idx={0} />
      <ImageBtn idx={1} />
      <ImageBtn idx={2} />
    </div>

  )
}
