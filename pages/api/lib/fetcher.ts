export class Fetcher {
  url: URL

  constructor(funName: string) {
    this.url = new URL( //creates the URL based on enviroment variables and the function name
      "https://" +
        process.env.NEXT_PUBLIC_API_ID +
        ".execute-api." +
        process.env.NEXT_PUBLIC_REGION_API +
        ".amazonaws.com/" +
        process.env.NEXT_PUBLIC_STAGE +
        "/" +
        funName
    )
  }

  async getJSONResponse(): Promise<any> {
    const req = await fetch(this.url.href)
    const data = await req.json()

    return data
  }

  async getJSONResponsePOST(params): Promise<any> {
    console.log(this.url.href)
    console.log(params)
    const req = await fetch(this.url.href, {
      body: params,
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
    const data = await req.json()

    return data
  }

  async getJSONResponseDELETE(): Promise<any> {
    const req = await fetch(this.url.href, {
      body: null,
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
    const data = await req.json()

    return data
  }
}
