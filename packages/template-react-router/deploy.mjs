import {
  deploySite,
  getOrCreateBucket,
  deployFunction,
} from "@picus/lambda";
import dotenv from "dotenv";
import path from "path";
import {
  RAM,
  TIMEOUT,
  SITE_NAME,
  DISK,
  REGION,
} from "./app/picus/constants.mjs";

dotenv.config({quiet: true});

if (!process.env.AWS_ACCESS_KEY_ID && !process.env.PICUS_AWS_ACCESS_KEY_ID) {
  console.log(
    'The environment variable "PICUS_AWS_ACCESS_KEY_ID" is not set.',
  );
  console.log("Lambda renders were not set up.");
  console.log(
    "Complete the Lambda setup: at https://www.picus.dev/docs/lambda/setup",
  );
  process.exit(0);
}
if (
  !process.env.AWS_SECRET_ACCESS_KEY &&
  !process.env.PICUS_AWS_SECRET_ACCESS_KEY
) {
  console.log(
    'The environment variable "PICUS_PICUS_AWS_SECRET_ACCESS_KEY" is not set.',
  );
  console.log("Lambda renders were not set up.");
  console.log(
    "Complete the Lambda setup: at https://www.picus.dev/docs/lambda/setup",
  );
  process.exit(0);
}

console.log("Selected region:", REGION);

process.stdout.write("Deploying Lambda function... ");

const { alreadyExisted, functionName } = await deployFunction({
  createCloudWatchLogGroup: true,
  memorySizeInMb: RAM,
  region: REGION,
  diskSizeInMb: DISK,
  timeoutInSeconds: TIMEOUT,
});
console.log(functionName, alreadyExisted ? "(already existed)" : "(created)");

process.stdout.write("Ensuring bucket... ");
const { bucketName, alreadyExisted: bucketAlreadyExisted } =
  await getOrCreateBucket({ region: REGION });
console.log(
  bucketName,
  bucketAlreadyExisted ? "(already existed)" : "(created)",
);

process.stdout.write("Deploying site... ");
const { serveUrl } = await deploySite({
  siteName: SITE_NAME,
  bucketName,
  entryPoint: path.join(process.cwd(), "app/picus/index.ts"),
  region: REGION,
});
console.log(serveUrl);

console.log();
console.log("You now have everything you need to render videos!");
console.log("Re-run this command when:");
console.log("  1) you changed the video template");
console.log("  2) you changed config.mjs");
console.log("  3) you upgraded Picus to a newer version");
