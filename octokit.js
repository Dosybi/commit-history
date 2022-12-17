import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: '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',
})

export const getData = async () => {
  const res = await octokit
    .request('GET /repos/{owner}/{repo}/commits', {
      owner: 'Dosybi',
      repo: 'commit-history',
    })
    // .then((res) => res)
    // .then((res) => console.log(res.data))
    .catch((error) => console.log(`Could not get data: ${error}`))

  return res
}

// export const data = getData.resolve(res)
