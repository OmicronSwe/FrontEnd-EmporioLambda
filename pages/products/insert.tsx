import Link from "next/link"
import Layout from "../../components/layout"

import { getlambdaResponsePOST } from "../../lib/lambdas";

export default function InsertProduct() {

    const sendProduct = async (event) => {
        event.preventDefault()
        const stringJson = JSON.stringify({
          name: event.target.name.value,
          description: event.target.description.value
        });

        const res = await getlambdaResponsePOST("product",stringJson);

        //const result = await res.json();
        //console.log(result);
    }

    return (
    <Layout title="Insert Product">
        <h1>Hello 👋 </h1>
        <p>Insert a new product below:</p>
        <form onSubmit={sendProduct}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" autoComplete="Name of the product" required />
            <label htmlFor="description">Description</label>
            <input id="description" name="description" type="text" autoComplete="Description of the product" required />
            <button type="submit">Insert</button>
        </form>
        <p>
        <Link href="/">
            <a>Go home!</a>
        </Link>
        </p>
    </Layout> )
}