import Link from "next/link"
import Layout from "../../components/layout"

export default function InsertProduct() {

    const sendProduct = async event => {
        event.preventDefault();
        const res = await fetch(
            'https://wom28o1ly9.execute-api.eu-central-1.amazonaws.com/local/product',
            {
              body: JSON.stringify({
                name: document.getElementById("name").nodeValue,
                description: document.getElementById("description").nodeValue
              }),
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST'
            }
          )

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