import React from "react"
import Link from "next/link"

import { Lambda } from "../../interfaces"

type Props = {
  data: Lambda
}

const ListItem = ({ data }: Props) => (
  <div>
    <Link href="/lambdas/[funName]" as={`/lambdas/${data.funName}`}>
      <a>{data.funName}</a>
    </Link>
    <p>{data.message}</p>
  </div>
)

export default ListItem
