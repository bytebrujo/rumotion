import { Composition } from "picus";
import { Overlay } from "./Overlay";

export const PicusRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Overlay"
        component={Overlay}
        durationInFrames={75}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
