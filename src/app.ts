const [command] = process.argv.slice(2);

if (command === "set") {
  console.log("You like set?");
} else if (command === "get") {
  console.log("You like to get cake?");
}
