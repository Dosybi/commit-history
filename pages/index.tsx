import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getData } from '../octokit'

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
      {data && (
        <main className="p-8">
          <div>{data[0]?.commit.message}</div>
          <div>{data[0]?.author?.login}</div>
          <div>{data[0]?.author?.avatar_url}</div>
          <div>{data[0]?.author?.html_url}</div>
          <div>{data[0]?.commit.committer.date}</div>
        </main>
      )}
    </div>
  )
}
