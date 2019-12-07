const app = require("./app");
const PORT = process.env.PORT || 3030;

console.log("port", PORT); 

app.listen(PORT, () => {
    console.log(`Server running at: ${PORT}/`);
});