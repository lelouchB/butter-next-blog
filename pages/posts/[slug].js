import Head from "next/head";
import Link from "next/link";
import Butter from "buttercms";
import styled from "styled-components";
const butter = Butter(process.env.BUTTER_CMS_API_TOKEN);
 
const Post = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: 600;
    margin-bottom: 1em;
  }
  h1 {
    font-size: 3rem;
    font-family: Consolas;
    color: #383428;
  }
  ul,
  ol {
    margin-bottom: 1.25em;
 
    li {
      margin-bottom: 0.25em;
    }
  }
 
  p {
    font-family: Georgia, Cambria, "Times New Roman", Times, serif;
    font-size: 1.25em;
    line-height: 1.58;
    margin-bottom: 1.25em;
    font-weight: 400;
    letter-spacing: -0.003em;
  }
 
  img {
    max-width: 100%;
    height: auto;
  }
 
  figcaption {
    font-style: italic;
    text-align: center;
    color: #ccc;
  }
 
  p code {
    padding: 2px 4px;
    font-size: 90%;
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 4px;
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  }
 
  pre {
    display: block;
    padding: 1em;
    margin: 0 0 2em;
    font-size: 1em;
    line-height: 1.4;
    word-break: break-all;
    word-wrap: break-word;
    color: #333333;
    background-color: #f5f5f5;
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  }
`;
const Home = styled.span`
  padding: 0.8rem;
  margin-top: 0.4rem;
  font-size: 1.2rem;
  background-color: #a45dc3;
  border-radius: 2rem;
  width: fit-content;
  font-weight: 500;
  color: white;
  text-decoration: none;
  cursor: pointer;
  :hover {
    background-color: #9a4abc;
  }
`;
const Header = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
 
`;
function Posts({ post }) {
  return (
    <Post>
      <Head>
        <title key={post.title}>{post.title}</title>
      </Head>
      <div>
        <Header>
          <h1> {post.title}</h1>
          <Link href={`/`}>
            <Home>Home </Home>
          </Link>
        </Header>
        <div>
          <main dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
      </div>
    </Post>
  );
}
 
export async function getStaticPaths() {
  const allPosts = await butter.post.list({ page: 1, page_size: 10 });
  const paths = allPosts.data.data.map((post) => ({
    params: { slug: post.slug },
  }));
  return {
    paths,
    fallback: false,
  };
}
 
export async function getStaticProps({ params }) {
  const response = await butter.post.retrieve(params.slug);
  const post = await response.data;
 
  return {
    props: {
      post: post.data,
    },
  };
}
 
export default Posts;
 
