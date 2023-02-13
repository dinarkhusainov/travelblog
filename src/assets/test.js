let api = {};
let user = "Vasya";
let data = {text: "ololo"};
function foo(a, u, data) {
    a.setUser(user)
    function bar(u, data) {
        console.log(data.text, u)
    }
    bar(data, u);
}
foo(api, user, data);