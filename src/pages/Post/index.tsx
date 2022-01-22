import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation, Storage } from "aws-amplify";

import { getPost } from "../../graphql/queries";
import { GetPostQuery } from "../../API";

import { ButtonContainer, Container } from "./styles";
import { Button } from "aws-amplify-react";

const sanitize = DOMPurify.sanitize;

export default function Post() {
  const params = useParams();
  const [post, setPost] = useState<GetPostQuery["getPost"]>();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    async function loadPost() {
      const { data } = (await API.graphql(
        graphqlOperation(getPost, { id: params.id })
      )) as GraphQLResult<GetPostQuery>;
      const thumbnail = await Storage.get(data?.getPost?.thumbnailKey!);

      setThumbnailUrl(thumbnail);
      setPost(data?.getPost);
    }

    loadPost();
  }, [params.id]);

  function goToHome() {
    navigate("/");
  }

  function goToEditor() {
    navigate("/new-post");
  }

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={goToHome}>Voltar aos posts</Button>
        <Button onClick={goToEditor}>Criar post</Button>
      </ButtonContainer>
      {thumbnailUrl && <img src={thumbnailUrl} alt="thumbnail" />}
      <h1>{post?.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: sanitize(post?.content || "") }}
      />
    </Container>
  );
}
