import Head from 'next/head';

export default function Layout ({ children, color, alignCenter }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.webp" />
      </Head>
      <div className={`flex flex-col min-h-screen ${color} ${alignCenter && 'items-center'}`}>
        {children}
      </div>
    </>
  )
}
