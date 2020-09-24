export default function Layout ({ children, color, alignCenter }) {
  return (
    <>
      <div className={`flex flex-col min-h-screen ${color} ${alignCenter && 'items-center'}`}>
        {children}
      </div>
    </>
  )
}
