import { LoadSkia } from "@shopify/react-native-skia/src/web";
import { registerRoot } from "picus";

(async () => {
  await LoadSkia();
  const { PicusRoot } = await import("./Root");
  registerRoot(PicusRoot);
})();
