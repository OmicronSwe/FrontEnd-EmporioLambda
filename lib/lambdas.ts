import { Fetcher } from "./fetcher"

export async function getlambdaResponse(funName: string) {
  const fetcher = new Fetcher(funName)

  return {
    props: {
      response: await fetcher.getJSONResponse(),
    },
  }
}
