const { add } = require('./app');

if (add(5, 10) === 15) {
    console.log("Test Passed");
    process.exit(0);
} else {
    console.log("Test Failed");
    process.exit(1);
}
