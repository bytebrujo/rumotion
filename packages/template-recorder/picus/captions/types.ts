import { Caption } from "@picus/captions";

export type CaptionPage = {
  captions: Caption[];
};

export type LayoutedCaptions = {
  segments: CaptionPage[];
};
