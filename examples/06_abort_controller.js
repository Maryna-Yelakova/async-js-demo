function fakeRequest({ signal, ms = 2000 }) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      resolve("Request completed");
    }, ms);

    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new Error("Request aborted"));
    });
  });
}

async function main() {
  const controller = new AbortController();
  const { signal } = controller;

  setTimeout(() => controller.abort(), 700);

  try {
    const result = await fakeRequest({ signal, ms: 2000 });
    console.log(result);
  } catch (error) {
    console.log("Abort example:", error.message);
  }
}

main();
