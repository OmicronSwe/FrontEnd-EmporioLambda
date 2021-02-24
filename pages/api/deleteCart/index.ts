import { NextApiRequest, NextApiResponse } from "next"
import { getlambdaResponseDELETE } from "../lib/lambdas"

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const resp = await getlambdaResponseDELETE("cart/" + _req.body) //external API call
  res.json(resp.props.response)
}

export default handler
