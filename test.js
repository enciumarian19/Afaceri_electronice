// test();

// function test() {
//     console.log("salut");
// }

// const test = () => {
//     console.log("salut");
// }

// function show() {
//     if (true) {
//         var number1 = 1;
//         let number2 = 2;
//         const number3 = 3;
//     }

//     console.log(number1);
//     console.log(number2);
//     console.log(number3);
// }

// show();

obj = {
    name: "Robert",
    email: "enciumarian19@stud.ase.ro",
}

obj.yearsOld = 25;

obj = {};

console.log(obj);

const arr = [1, 2, 3, 4, 5];

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

arr.forEach((el, index) => {
    console.log(el, index);
});

arr.map((el, index) => {
    return el * 2;
})

for (el in arr) {
    console.log(el);
}

// if (3 == '3') {
//     console.log("same number");
// } else {
//     console.log("not the same number");
// }
