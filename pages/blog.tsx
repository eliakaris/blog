import BlogList from "../components/BlogList"
import Layout from "../components/Layout";

export default function BlogPage() {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <BlogList />
        </div>
      </div>
    </Layout>
  )
}
