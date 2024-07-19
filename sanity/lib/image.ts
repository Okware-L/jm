import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "../env";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

//const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return imageBuilder.image(source);
}
