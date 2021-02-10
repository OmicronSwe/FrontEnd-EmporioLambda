import { NextApiRequest, NextApiResponse } from "next"
import { sampleLambdaData } from "../../../utils/sample-data"

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleLambdaData)) {
      throw new Error("Cannot find lambda data")
    }

    res.status(200).json(sampleLambdaData)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
