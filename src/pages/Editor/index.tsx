import { useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { Button, InputRow } from "aws-amplify-react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, Auth, graphqlOperation, Storage } from "aws-amplify";

import { uuidv4 } from "../../utils/uuid";
import { createPost } from "../../graphql/mutations";
import { CreatePostMutation } from "../../API";

import "react-quill/dist/quill.snow.css";
import { Container, ButtonContainer } from "./styles";

type Thumbnail = {
  file: File;
  filename: string;
  fileUrl: string;
};

function Editor() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState<Thumbnail>();

  const navigate = useNavigate();

  function handleContentChange(newContent: string) {
    setContent(newContent);
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleThumbnailChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length === 0) return;

    const file = e.target.files![0];

    setThumbnail({
      file,
      filename: file.name,
      fileUrl: URL.createObjectURL(file),
    });
  }

  async function handlePostCreation() {
    if (!thumbnail) return;

    try {
      const { key } = await Storage.put(uuidv4(), thumbnail.file);
      const user = await Auth.currentAuthenticatedUser();

      const { data } = (await API.graphql(
        graphqlOperation(createPost, {
          input: {
            title,
            content,
            thumbnailKey: key,
            authorName: user.attributes.name,
          },
        })
      )) as GraphQLResult<CreatePostMutation>;

      navigate(`/post/${data?.createPost?.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  function goToHome() {
    navigate("/");
  }

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={goToHome}>Voltar aos posts</Button>
        <Button onClick={handlePostCreation}>Salvar post</Button>
      </ButtonContainer>
      {thumbnail && <img src={thumbnail?.fileUrl} alt="Capa" />}
      <InputRow
        type="file"
        accept="image/png, image/jpeg"
        placeholder="Capa"
        onChange={handleThumbnailChange}
      />
      <InputRow
        placeholder="Título"
        value={title}
        onChange={handleTitleChange}
      />
      <ReactQuill theme="snow" value={content} onChange={handleContentChange} />
    </Container>
  );
}

export default withAuthenticator(Editor);
