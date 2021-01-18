import Link from "next/link";
import styled from "styled-components";
 
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 480px;
  flex-direction: column;
  text-align: center;
  background-color: #f5f4f0;
  padding: 1rem;
  margin: 1rem;
  border-radius: 25px;
  h3 {
    font-family: Roboto;
    font-weight: 600;
    font-size: 2rem;
    color: #2f4f4f;
    text-decoration: none;
    cursor: pointer;
  }
  img {
    max-width: 300px;
  }
  span {
    font-weight: 100;
    color: #606060;
    margin-top: -1.5rem;
    font-family: monospace;
  }
  p {
    font-size: 1.15em;
    line-height: 1.58;
    font-weight: 400;
    letter-spacing: -0.003em;
  }
`;
 
const ButtonWrapper = styled.button`
  padding: 0.8rem;
  margin-top: 0.4rem;
  font-size: 1.2rem;
  background-color: #a45dc3;
  border-radius: 1.5rem;
  width: fit-content;
  font-weight: 500;
  color: white;
  text-decoration: none;
  cursor: pointer;
  :hover {
    background-color: #9a4abc;
  }
`;
export default function PostContainer({
  title,
  slug,
  featured_image,
  alt,
  date,
  summary,
}) {
  const publishedDate = new Date(date);
  return (
    <Container>
      <img src={featured_image} alt={alt} />
 
      <Link href={`/posts/${slug}`}>
        <h3>{title}</h3>
      </Link>
      <span> {publishedDate.toDateString()}</span>
      <p>{summary}</p>
      <Link href={`posts/${slug}`}>
        <ButtonWrapper>Read More</ButtonWrapper>
      </Link>
    </Container>
  );
}
 
 
