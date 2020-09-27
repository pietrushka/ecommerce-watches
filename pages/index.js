import Layout from '../components/layout'
import FullNavbar from '../components/full-navbar'

import { getAllItems } from '../lib/api'
import ItemsOverview from '../components/items-overview'

export default function Home ({ items }) {
  return (
    <>
      <Layout>

        <FullNavbar />

        <ItemsOverview items={items} />

      </Layout>
    </>
  )
}

export async function getServerSideProps () {
  const data = await getAllItems()
  return {
    props: {
      items: data
    }
  }
}
