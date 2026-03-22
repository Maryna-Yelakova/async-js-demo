// Simulates an async DB/API call in callback style: cb(error, result)

function getUserCb(userId, cb) {
  setTimeout(() => cb(null, { id: userId, name: "Alex" }), 200);
}

function getOrdersCb(userId, cb) {
  setTimeout(() => cb(null, [{ id: 101, userId }, { id: 102, userId }]), 200);
}

function getOrderDetailsCb(orderId, cb) {
  setTimeout(() => cb(null, { orderId, total: orderId === 101 ? 35 : 20 }), 200);
}

function runCallbackHellExample() {
  return new Promise((resolve) => {
    console.log("\n=== 1) Callback Hell Example ===");

    getUserCb(1, (userErr, user) => {
      if (userErr) {
        console.error("User error:", userErr.message);
        return resolve();
      }

      getOrdersCb(user.id, (ordersErr, orders) => {
        if (ordersErr) {
          console.error("Orders error:", ordersErr.message);
          return resolve();
        }

        getOrderDetailsCb(orders[0].id, (detailsErr, firstOrderDetails) => {
          if (detailsErr) {
            console.error("Details error:", detailsErr.message);
            return resolve();
          }

          console.log("User:", user);
          console.log("Orders:", orders);
          console.log("First order details:", firstOrderDetails);
          console.log("Notice how nesting keeps growing: callback hell.");
          resolve();
        });
      });
    });
  });
}

// Promise versions of the same operations
function getUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: userId, name: "Alex" }), 200);
  });
}

function getOrders(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([{ id: 101, userId }, { id: 102, userId }]), 200);
  });
}

function getOrderDetails(orderId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ orderId, total: orderId === 101 ? 35 : 20 }), 200);
  });
}

function runPromiseExample() {
  console.log("\n=== 2) Same Flow With Promises ===");
  return getUser(1)
    .then((user) => {
      console.log("User:", user);
      return getOrders(user.id);
    })
    .then((orders) => {
      console.log("Orders:", orders);
      return getOrderDetails(orders[0].id);
    })
    .then((details) => {
      console.log("First order details:", details);
    })
    .catch((error) => {
      console.error("Promise error:", error.message);
    });
}

async function runAsyncAwaitExample() {
  console.log("\n=== 3) Same Flow With async/await ===");
  try {
    const user = await getUser(1);
    const orders = await getOrders(user.id);
    const details = await getOrderDetails(orders[0].id);

    console.log("User:", user);
    console.log("Orders:", orders);
    console.log("First order details:", details);
  } catch (error) {
    console.error("Async/await error:", error.message);
  }
}

async function main() {
  await runCallbackHellExample();
  await runPromiseExample();
  await runAsyncAwaitExample();
}

main();
