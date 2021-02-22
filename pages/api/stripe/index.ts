import { NextApiRequest, NextApiResponse } from "next"
import { getlambdaResponsePOST } from "../lib/lambdas"

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const resp = await getlambdaResponsePOST("charge", _req.body)
  res.json(resp.props.response)
}

export default handler
