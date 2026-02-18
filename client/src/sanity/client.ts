import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "lzf33uqu",
  dataset: "production",
  apiVersion: "2026-02-04",
  useCdn: true,
});
