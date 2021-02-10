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
}
