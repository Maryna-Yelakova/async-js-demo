function wait(ms, result, shouldReject = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) reject(new Error(`Rejected: ${result}`));
      else resolve(result);
    }, ms);
  });
}

async function demoAll() {
  try {
    const values = await Promise.all([wait(200, "A"), wait(300, "B"), wait(100, "C")]);
    console.log("Promise.all:", values);
  } catch (error) {
    console.log("Promise.all error:", error.message);
  }
}

async function demoAllSettled() {
  const values = await Promise.allSettled([
    wait(100, "A"),
    wait(150, "B", true),
    wait(120, "C"),
  ]);
  console.log("Promise.allSettled:", values);
}

async function demoRace() {
  try {
    const winner = await Promise.race([wait(500, "Slow"), wait(100, "Fast")]);
    console.log("Promise.race winner:", winner);
  } catch (error) {
    console.log("Promise.race error:", error.message);
  }
}

async function demoAny() {
  try {
    const firstFulfilled = await Promise.any([
      wait(100, "X", true),
      wait(200, "Y", true),
      wait(150, "Z"),
    ]);
    console.log("Promise.any first fulfilled:", firstFulfilled);
  } catch (error) {
    console.log("Promise.any AggregateError:", error.errors?.map((e) => e.message));
  }
}

async function main() {
  await demoAll();
  await demoAllSettled();
  await demoRace();
  await demoAny();
}

main();
