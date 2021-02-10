import * as React from "react"

import { Lambda } from "../../interfaces"

type ListDetailProps = {
  item: Lambda
}

const ListDetail = ({ item: lambda }: ListDetailProps) => (
  <div>
    <h1>Detail for {lambda.funName}</h1>
    <p>message: {lambda.message}</p>
  </div>
)

export default ListDetail
