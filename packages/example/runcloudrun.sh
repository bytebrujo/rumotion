set -e
cd ..
cd compositor
bun build.ts --cloudrun
cd ..
cd cloudrun
bun run make
bun run makeruntime
cd container
ARTIFACT_REGISTRY_ENV=development node submit.mjs
cd ..
cd ..
cd example
bunx picus cloudrun services rmall -f
bunx picus cloudrun sites create --site-name=testbed
ARTIFACT_REGISTRY_ENV=development bunx picus cloudrun services deploy --cpuLimit=4.0
bunx picus cloudrun render testbed OffthreadRemoteVideo --log=verbose
