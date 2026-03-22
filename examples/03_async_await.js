function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchUser() {
  await delay(300);
  return { id: 1, name: "Alex" };
}

async function fetchOrders(userId) {
  await delay(300);
  if (userId == null) throw new Error("Cannot fetch orders without user id");
  return [{ id: 101, total: 42.5 }];
}

async function main() {
  try {
    console.log("Loading...");
    const user = await fetchUser();
    const orders = await fetchOrders(user.id);
    console.log("User:", user);
    console.log("Orders:", orders);
  } catch (error) {
    console.error("Async/await error:", error.message);
  } finally {
    console.log("Done.");
  }
}

main();
