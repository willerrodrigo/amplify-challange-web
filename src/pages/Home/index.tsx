import { API, graphqlOperation } from "aws-amplify";
import { Button } from "aws-amplify-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraphQLResult } from "@aws-amplify/api-graphql";

import S3Image from "../../components/S3Image";

import { getBlog } from "../../graphql/queries";
import { GetBlogQuery } from "../../API";

import {
  BlogTitle,
  ButtonContainer,
  Container,
  HighlightPost,
  Post,
  PostsContainer,
} from "./styles";

export default function Home() {
  const [blog, setBlog] = useState<GetBlogQuery["getBlog"]>();

  const navigate = useNavigate();

  useEffect(() => {
    async function loadBlog() {
      const { data } = (await API.graphql(
        graphqlOperation(getBlog, { id: process.env.REACT_APP_BLOG_ID })
      )) as GraphQLResult<GetBlogQuery>;

      setBlog(data?.getBlog);
    }

    loadBlog();
  }, []);

  function goToEditor() {
    navigate("/new-post");
  }

  function goToPost(id?: string) {
    id && navigate(`/post/${id}`);
  }

  const [firstPost, ...posts] = blog?.posts?.items || [];

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={goToEditor}>Criar post</Button>
      </ButtonContainer>

      <BlogTitle>{blog?.name}</BlogTitle>

      {firstPost && (
        <HighlightPost onClick={() => goToPost(firstPost.id)}>
          <S3Image
            thumbnailKey={firstPost.thumbnailKey}
            alt={`Capa do post ${firstPost.title}`}
          />
          <h2>{firstPost.title}</h2>
        </HighlightPost>
      )}

      <PostsContainer>
        {posts.map((post) => (
          <Post key={post?.id} onClick={() => goToPost(post?.id)}>
            {post && (
              <S3Image
                thumbnailKey={post.thumbnailKey}
                alt={`Capa do post ${post.title}`}
              />
            )}
            <h4>{post?.title}</h4>
            <span>{post?.authorName}</span>
          </Post>
        ))}
      </PostsContainer>
    </Container>
  );
}
