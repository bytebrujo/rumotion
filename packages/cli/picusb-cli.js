#!/usr/bin/env bun
const {cli} = require('./dist/index');

// Just like "picus", but it uses Bun
cli()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
