import { Fetcher } from "./fetcher"

export async function getlambdaResponse(funName: string) {
  const fetcher = new Fetcher(funName)

  return {
    props: {
      response: await fetcher.getJSONResponse(),
    },
  }
}

export async function getlambdaResponsePOST(funName: string, params: JSON) {
  const fetcher = new Fetcher(funName)

  return {
    props: {
      response: await fetcher.getJSONResponsePOST(params),
    },
  }
}
