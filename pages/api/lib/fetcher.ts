export class Fetcher {
  url: URL

  constructor(funName: string) {
    this.url = new URL(
      "https://" +
        process.env.API_ID +
        ".execute-api." +
        process.env.REGION_API +
        ".amazonaws.com/" +
        process.env.STAGE +
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
    const req = await fetch(this.url.href, {
      body: params,
      mode: "no-cors",
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
