set -e
cd ..
cd ..
bunx turbo run make --filter=@picus/lambda
cd packages/lambda
bun run makeruntime
cd ..
cd example
bunx picus lambda functions rmall -f
bunx picus lambda functions deploy --memory=2048 --disk=10000
bunx picus lambda sites create --site-name=testbed-v6 --log=verbose --enable-folder-expiry
bunx picus lambda render testbed-v6 NewVideo --log=verbose --delete-after="1-day" --api-key=rm_pub_9a996d341238eaa34e696b099968d8510420b9f6ba4aa0ee
