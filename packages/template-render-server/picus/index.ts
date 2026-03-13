// This is your entry file! Refer to it when you render:
// npx picus render <entry-file> HelloWorld out/video.mp4

import { registerRoot } from "picus";
import { PicusRoot } from "./Root";

registerRoot(PicusRoot);
