import { Still } from "picus";
import { myCompSchema, PreviewCard } from "./PreviewCard";

export const PicusRoot: React.FC = () => {
  return (
    <>
      <Still
        id="PreviewCard"
        component={PreviewCard}
        width={1200}
        height={627}
        schema={myCompSchema}
        defaultProps={{
          title: "Welcome to Picus" as const,
          description: "Edit Video.tsx to change template" as const,
          color: "#0B84F3" as const,
        }}
      />
    </>
  );
};
