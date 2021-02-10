import * as React from "react"
import ListItem from "./listItem"
import { Lambda } from "../../interfaces"

type Props = {
  items: Lambda[]
}

const List = ({ items }: Props) => (
  <ul>
    {items.map((item) => (
      <li key={item.funName}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
)

export default List
