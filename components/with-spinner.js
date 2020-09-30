export default function WithSpinner ({ isLoading, children }) {
  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-1/3 mx-auto'>
        <img src='watch.gif' />
      </div>
    )
  } else {
    return (
      <>
        {children}
      </>
    )
  }
}
