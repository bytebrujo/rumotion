import {
  renderMediaOnLambda,
  speculateFunctionName,
} from "@picus/lambda/client";
import type { RenderResponse } from "./types";
import { z } from "zod";
import { CompositionProps } from "~/picus/schemata";
import { DISK, RAM, REGION, TIMEOUT } from "~/picus/constants.mjs";

export const renderVideo = async ({
  serveUrl,
  composition,
  inputProps,
  outName,
  metadata,
}: {
  serveUrl: string;
  composition: string;
  inputProps: z.infer<typeof CompositionProps>;
  outName: string;
  metadata: Record<string, string> | null;
}): Promise<RenderResponse> => {
  if (
    !process.env.AWS_ACCESS_KEY_ID &&
    !process.env.PICUS_AWS_ACCESS_KEY_ID
  ) {
    throw new TypeError(
      "Set up Picus Lambda to render videos. See the README.md for how to do so.",
    );
  }
  if (
    !process.env.AWS_SECRET_ACCESS_KEY &&
    !process.env.PICUS_AWS_SECRET_ACCESS_KEY
  ) {
    throw new TypeError(
      "The environment variable PICUS_AWS_SECRET_ACCESS_KEY is missing. Add it to your .env file.",
    );
  }

  const { renderId, bucketName } = await renderMediaOnLambda({
    region: REGION,
    functionName: speculateFunctionName({
      diskSizeInMb: DISK,
      memorySizeInMb: RAM,
      timeoutInSeconds: TIMEOUT,
    }),
    serveUrl,
    composition,
    inputProps,
    codec: "h264",
    downloadBehavior: {
      type: "download",
      fileName: outName,
    },
    metadata,
  });

  return {
    renderId,
    bucketName,
    functionName: speculateFunctionName({
      diskSizeInMb: DISK,
      memorySizeInMb: RAM,
      timeoutInSeconds: TIMEOUT,
    }),
    region: REGION,
  };
};
