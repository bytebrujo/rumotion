compositions=($(npx picus compositions src/index.ts -q))


for composition in "${compositions[@]}"
do
  echo $composition
  npx picus render src/index.ts $composition $composition.mp4
done
