const logEl = document.getElementById("log");

function log(message) {
  logEl.textContent += `${message}\n`;
  logEl.scrollTop = logEl.scrollHeight;
}

function clearLog() {
  logEl.textContent = "";
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function runOrderDemo() {
  clearLog();
  log("script start");

  setTimeout(() => log("setTimeout macrotask"), 0);

  Promise.resolve().then(() => log("promise microtask"));
  queueMicrotask(() => log("queueMicrotask"));

  log("script end");
}

async function runSequentialVsParallel() {
  clearLog();

  const task = async (name, ms) => {
    await wait(ms);
    log(`${name} done (${ms}ms)`);
  };

  const s0 = performance.now();
  await task("A", 500);
  await task("B", 700);
  await task("C", 300);
  const sequentialMs = Math.round(performance.now() - s0);
  log(`Sequential total: ${sequentialMs}ms`);

  log("---");

  const p0 = performance.now();
  await Promise.all([task("A", 500), task("B", 700), task("C", 300)]);
  const parallelMs = Math.round(performance.now() - p0);
  log(`Parallel total: ${parallelMs}ms`);
}

async function runErrorFlow() {
  clearLog();

  const risky = async () => {
    await wait(300);
    throw new Error("Simulated async failure");
  };

  try {
    log("Starting risky async operation...");
    await risky();
    log("This line is never reached.");
  } catch (error) {
    log(`Caught error: ${error.message}`);
  } finally {
    log("Finally block executed.");
  }
}

async function runFetchDemo() {
  clearLog();
  log("Fetching data from JSONPlaceholder...");

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const post = await response.json();
    log(`Post id: ${post.id}`);
    log(`Title: ${post.title}`);
    log(`Body: ${post.body}`);
  } catch (error) {
    log(`Fetch failed: ${error.message}`);
    log("Check internet/API availability and try again.");
  }
}

document.getElementById("orderBtn").addEventListener("click", runOrderDemo);
document.getElementById("parallelBtn").addEventListener("click", runSequentialVsParallel);
document.getElementById("fetchBtn").addEventListener("click", runFetchDemo);
document.getElementById("errorBtn").addEventListener("click", runErrorFlow);
document.getElementById("clearBtn").addEventListener("click", clearLog);
