import { NextApiRequest, NextApiResponse } from "next"
import { getlambdaResponse } from "../lib/lambdas"

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const resp = await getlambdaResponse("product/getFromId/" + JSON.parse(_req.body).id) //external API call
  res.json(resp.props.response)
}

export default handler
