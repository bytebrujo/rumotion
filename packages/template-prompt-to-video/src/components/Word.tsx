import { makeTransform, scale, translateY } from "@picus/animation-utils";
import { loadFont } from "@picus/google-fonts/BreeSerif";
import { fitText } from "@picus/layout-utils";
import type React from "react";
import { AbsoluteFill, interpolate, useVideoConfig } from "picus";

export const Word: React.FC<{
  enterProgress: number;
  text: string;
  stroke: boolean;
}> = ({ enterProgress, text, stroke }) => {
  const { fontFamily } = loadFont();
  const { width } = useVideoConfig();
  const desiredFontSize = 120;

  const fittedText = fitText({
    fontFamily,
    text,
    withinWidth: width * 0.8,
  });

  const fontSize = Math.min(desiredFontSize, fittedText.fontSize);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: undefined,
        bottom: 350,
        height: 150,
      }}
    >
      <div
        style={{
          fontSize,
          color: "white",
          WebkitTextStroke: stroke ? "20px black" : undefined,
          transform: makeTransform([
            scale(interpolate(enterProgress, [0, 1], [0.8, 1])),
            translateY(interpolate(enterProgress, [0, 1], [50, 0])),
          ]),
          fontFamily,
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
