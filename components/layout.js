export default function Layout ({ children, color }) {
  return (
    <>
      <div className={`flex flex-col min-h-screen ${color}`}>
        {children}
      </div>
    </>
  )
}
