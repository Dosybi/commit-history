import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const CommitCard = ({ commit }: any) => {
  const [timeAgo, setTimeAgo] = useState('')

  const WAIT_TIME = 5000

  useEffect(() => {
    const time = setInterval(() => {
      const dateFromAPI = commit.commit.committer.date
      const now = new Date()
      const datefromAPITimeStamp = new Date(dateFromAPI).getTime()
      const nowTimeStamp = now.getTime()
      const microSecondsDiff = Math.abs(datefromAPITimeStamp - nowTimeStamp)
      const minutesDiff = Math.round(microSecondsDiff / (1000 * 60))
      const timeLabel =
        minutesDiff < 60
          ? `${minutesDiff} minutes ago`
          : Math.round(minutesDiff / 60) === 1
          ? `1 hour ago`
          : minutesDiff >= 60 && minutesDiff < 1440
          ? `${Math.round(minutesDiff / 60)} hours ago`
          : Math.round(minutesDiff / 1440) === 1
          ? `1 day ago`
          : `${Math.round(minutesDiff / 1440)} days ago`
      setTimeAgo(timeLabel)
    }, WAIT_TIME)
    return () => clearInterval(time)
  }, [])

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-md">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-xl font-bold">{commit.commit.message}</div>
        <Link className="hover:underline" href={commit.html_url}>
          <div>{commit.sha.slice(0, 8)}</div>
        </Link>
      </div>
      <Link
        className="mb-2 flex w-fit items-center"
        href={commit.author?.html_url}
      >
        <Image
          className="mr-2 rounded-full"
          src={commit.author.avatar_url}
          alt={commit.author.login}
          width={20}
          height={20}
        />
        <div className="text-xs font-bold hover:underline">
          {commit.author.login}
        </div>
      </Link>
      <div>{timeAgo}</div>
      <div>{commit.commit.committer.date}</div>
    </div>
  )
}

export default CommitCard
