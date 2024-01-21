import { getPlaiceholder } from "plaiceholder";

export const getPlaceholder = async (src: string) => {
  const buffer = await fetch(src, {
    next: {
      revalidate: 60,
    },
  }).then(async (res) => Buffer.from(await res.arrayBuffer()));

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};
