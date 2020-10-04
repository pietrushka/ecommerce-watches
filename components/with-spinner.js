export default function WithSpinner ({ isLoading, children }) {
  if (isLoading) {
    return (
      <div className='w-1/3 m-auto'>
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
