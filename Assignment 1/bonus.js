var createCounter = function(init) {
    let current = init;

    function increment() {
        current += 1;
        return current;
    }

    function decrement() {
        current -= 1;
        return current;
    }

    function reset() {
        current = init;
        return current;
    }

    return {
        increment: increment,
        decrement: decrement,
        reset: reset
    };
};



  const counter = createCounter(5)
  counter.increment(); // 6
  counter.reset(); // 5
  counter.decrement(); // 4