console.log('script start');
console.log(
  'queueMicrotask explanation:' +
    ' it schedules a callback in the microtask queue,' +
    ' which runs after current sync code and before the next macrotask (like setTimeout).'
);

setTimeout(() => {
  console.log('setTimeout macrotask');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('promise microtask 1');
  })
  .then(() => {
    console.log('promise microtask 2');
  });

queueMicrotask(() => {
  console.log('queueMicrotask callback (microtask: high priority queue)');
});

console.log('script end');













/*
Expected order:
1) script start
2) script end
3) promise microtask 1
4) queueMicrotask callback (order with 3 can vary by insertion timing)
5) promise microtask 2
6) setTimeout macrotask
*/
