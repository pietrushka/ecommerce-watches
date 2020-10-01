import { useState } from 'react'
import SliderArrow from './slider-arrow'
import SliderDots from './slider-dots'

export default function ImageSlider ({ images }) {
  const [imageIdx, setImageIdx] = useState(0)
  const imagesUrls = images.map(image => image.url)

  const arrowHandler = direction => {
    direction === 'left'
      ? imageIdx === 0 ? setImageIdx(images.length - 1) : setImageIdx(imageIdx - 1)
      : imageIdx === (images.length - 1) ? setImageIdx(0) : setImageIdx(imageIdx + 1)
  }

  return (
    <div className='relative overflow-hidden shadow-lg'>
      <div className='relative overflow-hidden'>
        <img className='object-cover w-full' src={imagesUrls[imageIdx]} />
      </div>

      <SliderArrow direction='left' handlerFunction={arrowHandler}>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
        </svg>
      </SliderArrow>

      <SliderArrow direction='right' handlerFunction={arrowHandler}>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
        </svg>
      </SliderArrow>

      <SliderDots handlerFunction={(idx) => setImageIdx(idx)} currentIdx={imageIdx} />
    </div>

  )
}
