import Head from "next/head";
import Butter from "buttercms";
import styled from "styled-components";
import PostContainer from "../components/PostContainer";
 
const butter = Butter(process.env.BUTTER_CMS_API_TOKEN);
 
const Container = styled.main`
  h1 {
    font-size: 3rem;
    font-family: Consolas;
    margin-bottom: 1em;
    color: #383428;
    margin: 0;
  }
  h2 {
    font-family: Cambria;
    font-weight: 600;
    color: #808080;
  }
`;
const Post = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
 
 
export default function Home({ posts }) {
  return (
    <Container>
      <Head>
        <title>NextJS Blog with Butter CMS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>NextJS Blog with ButterCMS</h1>
      <h2>Latest Posts</h2>
      <Post>
        {posts.data.map((post) => (
          <PostContainer
            key={post.slug}
            title={post.title}
            featured_image={post.featured_image}
            alt={post.featured_image_alt}
            slug={post.slug}
            summary={post.summary}
            date={post.published}
          />
        ))}
      </Post>
    </Container>
  );
}
 
export async function getStaticProps() {
  const response = await butter.post.list({ page: 1, page_size: 10 });
  const posts = await response.data;
 
  return {
    props: {
      posts,
    },
  };
}
 
