import { useRouter } from 'next/router'
import BlogEntry from "../../components/BlogEntry"
import Layout from "../../components/Layout";

export default function BlogPage() {
  const { slug } = useRouter().query;
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <BlogEntry slug={slug as string} />
        </div>
      </div>
    </Layout>
  )
}
