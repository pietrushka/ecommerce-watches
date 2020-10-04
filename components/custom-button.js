export default function CustomButton ({ width, children, ...props }) {
  return (
    <button
      className={`${width} py-3 text-lg text-white rounded-full shadow-lg bg-primary focus:outline-none border-primary border-4  clickAnimation hover:bg-secondary hover:text-primary hover:font-bold`}
      {...props}
    >
      {children}
    </button>
  )
}
