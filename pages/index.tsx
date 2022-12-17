import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getData } from '../octokit'

import CommitCard from '../components/CommitCard'

export default function Home() {
  const [data, setData] = useState<any[]>([])
  const fetchedData = getData()
  useEffect(() => {
    fetchedData.then((data: any) => setData(data.data))
  }, [])

  return (
    <div>
      <Head>
        <title>Commit History</title>
        <meta name="description" content="Commit History" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto max-w-2xl p-6">
        {data &&
          data.map((commit: any) => {
            return <CommitCard commit={commit} key={commit.sha} />
          })}
      </main>
    </div>
  )
}
