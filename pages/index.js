import Layout from '../components/layout'
import FullNavbar from '../components/full-navbar'

import { getAllWatches } from '../lib/api'
import WatchesOverview from '../components/watches-overview'

export default function Home ({ watches }) {
  return (
    <>
      <Layout>

        <FullNavbar />

        <WatchesOverview watches={watches} />

      </Layout>
    </>
  )
}

export async function getServerSideProps () {
  const data = await getAllWatches()
  return {
    props: {
      watches: data
    }
  }
}
