import { useEffect, useState } from "react";
import { Storage } from "aws-amplify";

type Props = {
  thumbnailKey?: string | null;
  alt: string;
};

export default function S3Image({ thumbnailKey, alt }: Props) {
  const [source, setSource] = useState("");

  useEffect(() => {
    async function loadImage() {
      if (thumbnailKey) {
        const thumbnail = await Storage.get(thumbnailKey);

        setSource(thumbnail);
      }
    }

    loadImage();
  }, [thumbnailKey]);

  return <img src={source} alt={alt} />;
}
