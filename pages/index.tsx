import { Octokit } from '@octokit/rest'
import Head from 'next/head'
import { useEffect, useState, useCallback } from 'react'
import { setTimeout } from 'timers'

import CommitCard from '../components/CommitCard'
import Button from '../components/elements/Button'

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
})

export default function Home() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLOading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const getData = async () => {
    setIsLOading(true)
    const res = await octokit
      .request('GET /repos/{owner}/{repo}/commits', {
        owner: 'Dosybi',
        repo: 'commit-history',
      })
      .then((res) => {
        setTimeout(() => {
          setData(res.data)
          setIsLOading(false)
        }, 3000)
      })
      .catch((error) => {
        setErrorMessage(`Could not get data: ${error}`)
        setIsLOading(false)
      })
    return res
  }

  useEffect(() => {
    getData()
  }, [])

  const refreshCommitsList = () => {
    getData()
  }

  return (
    <div>
      <Head>
        <title>Commit History</title>
        <meta name="description" content="Commit History" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto max-w-2xl p-6">
        <h1 className="mb-2 text-xl font-bold">Commits history</h1>
        {!isLoading &&
          data.map((commit: any) => {
            return <CommitCard commit={commit} key={commit.sha} />
          })}
        <Button
          isLoading={isLoading}
          label="Refresh"
          handleClick={refreshCommitsList}
        />
        {isLoading && <h1 className="mb-2 text-xl font-bold">Loading...</h1>}
        {errorMessage && (
          <h1 className="mb-2 text-xl font-bold">{errorMessage}</h1>
        )}
      </main>
    </div>
  )
}
