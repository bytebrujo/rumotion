const {getVideoMetadata} = require('@picus/renderer');

// @ts-expect-error cjs
getVideoMetadata(process.argv[2]).then((metadata) => {
	console.log(metadata.codec);
});
