import Image from 'next/image'
import Link from 'next/link'

const CommitCard = ({ commit }: any) => {
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
      <div>{commit.commit.committer.date}</div>
    </div>
  )
}

export default CommitCard
