// username regex challenge (FCC)
// https://stackoverflow.com/questions/60301125/why-my-regex-does-not-match-the-username-constraints

// let username = "JackOfAllTrades";
let username = "J%4";
// let userCheck = /[a-zA-Z]([a-zA-Z]+\d*|\d\d+)/; // Change this line
let userCheck = /^(?:[a-zA-Z]{2,}\d*|[a-zA-Z]\d{2,})$/; // Change this line
// let userCheck = /^[a-zA-Z](?:[a-zA-Z]+\d*|\d{2,})$/; // Change this line
let result = userCheck.test(username);

console.log(result)