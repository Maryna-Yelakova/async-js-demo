function task(name, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${name} finished in ${ms}ms`);
      resolve(name);
    }, ms);
  });
}

async function runSequential() {
  console.time("sequential");
  await task("A", 500);
  await task("B", 700);
  await task("C", 400);
  console.timeEnd("sequential");
}

async function runParallel() {
  console.time("parallel");
  await Promise.all([task("A", 500), task("B", 700), task("C", 400)]);
  console.timeEnd("parallel");
}

async function main() {
  console.log("\n--- Sequential ---");
  await runSequential();

  console.log("\n--- Parallel ---");
  await runParallel();
}

main();
