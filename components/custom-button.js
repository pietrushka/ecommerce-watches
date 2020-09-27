export default function CustomButton ({ width, children, ...props }) {
  return (
    <button
      className={`${width} py-3 text-lg text-white rounded-full shadow-lg bg-primary active:animate-ping focus:outline-none border-primary border-4  clickAnimation`}
      {...props}
    >
      {children}
    </button>
  )
}
