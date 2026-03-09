/* ----------------------part 1---------------------- */

// 1. Convert the string "123" to a number and add 7. (0.5 Grade)
// • Output Example: 130
// let num = "123";
// let result = 7 + +num;
// console.log(result); // 130

// 2. Check if the given variable is falsy and return "Invalid" if it is. (0.5 Grade)
// • Input Example: 0
// • Output Example: "Invalid"
// function check(value) {
//     if (!value) {
//         return"Invalid"
//     } else {
//         return"Valid"
//     }
// }
// console.log(check(0));//Invalid
// console.log(check(10));//Valid

// 3. Use for loop to print all numbers between 1 and 10, skipping even numbers using continue (0.5 Grade)
// • Output Example:1, 3, 5, 7, 9
// for (let i = 1; i <= 10; i++) {
//   if (i % 2 == 0) {
//     continue;
//   } else {
//     console.log(i);// 1  3  5  7  9
//   }
// }

// 4. Create an array of numbers and return only the even numbers using filter method. (0.5 Grade)
// • Input Example: [1, 2, 3, 4, 5]
// • Output Example: [2,4]
// let evenNum = [1,2,3,4,5].filter(n => n % 2 == 0);
// console.log(evenNum); // [2,4]

// 5. Use the spread operator to merge two arrays, then return the merged array. (0.5 Grade)
// • Input Example: [1, 2, 3], [4, 5, 6]
// • Output Example: [1, 2, 3, 4, 5, 6]
// let Arr1 = [1, 2, 3];
// let Arr2 = [4, 5, 6];
// let Arr3 = Arr1.concat(Arr2);
// console.log(Arr3); //[1, 2, 3, 4, 5, 6]

// 6. Use a switch statement to return the day of the week given a number (1 = Sunday ...., 7 = Saturday). (0.5 Grade)
// • Input Example: 2
// • Output Example: “Monday”
// let NumOfDay = 2;
// switch (NumOfDay) {
//   case 1:
//     console.log("Sunday");
//     break;
//   case 2:
//     console.log("Monday");
//     break;
//   case 3:
//     console.log("Tuseday");
//     break;
//   case 4:
//     console.log("Wensday");
//     break;
//   case 5:
//     console.log("Thursday");
//     break;
//   case 6:
//     console.log("Friday");
//     break;
//   case 7:
//     console.log("Saterday");
//     break;

//   default:
//     break;
// }

// 7. Create an array of strings and return their lengths using map method (0.5 Grade)
// • Input: ["a", "ab", "abc"]
// • Output Example: [1, 2, 3]
// let Arr = ["a", "ab", "abc"]
// let lengths = Arr.map(n=> n.length)
// console.log(lengths); //[1, 2, 3]

// 8. Write a function that checks if a number is divisible by 3 and 5. (0.5 Grade)
// • Input Example: 15
// • Output Example: “Divisible by both”
// function check(num) {
//     if (num%3 ===0 && num%5 ===0) {
//         return "Divisible by both"
//     } else  {
//         return " Not Divisible"
//     }
// }
// console.log(check(15)); //Divisible by both

// 9. Write a function using arrow syntax to return the square of a number (0.5 Grade)
// • Input Example: 5
// • Output Example: 25
// const square = (n) => {
//   return n * n;
// };
// console.log(square(5)); //25

// 10.Write a function that destructures an object to extract values and returns a formatted string. (0.5 Grade)
// • Input Example: const person = {name: 'John', age: 25}
// • Output Example: 'John is 25 years old'
// let name = "John";
// let age = 20;
// console.log(`${name} is ${age} years old`); //john is 20 years old

// 11.Write a function that accepts multiple parameters (two or more) and returns their sum. (0.5 Grade)
// • Input Example: 1, 2, 3, 4, 5
// • Output Example: 15
// function sum(...nums) {
//   return nums.reduce((total, num) => total + num);
// }
// console.log(sum(1, 2, 3, 4, 5)); //15

// 12. Write a function that returns a promise which resolves after 3 seconds with a 'Success' message. (0.5 Grade)
// • Output Example: “Success”
// function doTask() {
//   return new Promise((result) => {
//     setTimeout(() => {
//       result("Success");
//     }, 3000);
//   });
// }
// doTask().then(message => console.log(message));


// 13. Write a function to find the largest number in an array. (0.5 Grade)
// • Input Example: [1, 3, 7, 2, 4]
// • Output Example: 7
// let Arr = [1, 3, 7, 2, 4];
// let check = function () {
//   let LargeNum = Arr[0];
//   for (let i = 0; i < Arr.length; i++) {
//     if (Arr[i] > LargeNum) {
//       LargeNum = Arr[i];
//     }
//   }
//   return LargeNum;
// };
// console.log(check(Arr)); //7

// 14. Write a function that takes an object and returns an array containing only its keys. (0.5 Grade)
// • Input Example: name: "John", age: 30}
// • Output Example: ["name", "age"]
// let employee ={
//     name:"John",
//     age:20,
//     gender:"male",
//     fav:[`music` , `programming`]
// }
// console.log(Object.keys(employee)); //[ 'name', 'age', 'gender', 'fav' ]
// console.log(Object.values(employee)); //[ 'John', 20, 'male', [ 'music', 'programming' ] ]
// console.log(Object.entries(employee)); //[ [ 'name', 'John' ], [ 'age', 20 ],......]

// 15. Write a function that splits a string into an array of words based on spaces. (0.5 Grade)
// • Input: "The quick brown fox"
// • Output: ["The", "quick", "brown", "fox"]
// let string = "The quick brown fox";
// let arr = string.split(" ");
// console.log(arr); //[ 'The', 'quick', 'brown', 'fox' ]

/* ----------------------part 2---------------------- */

// 1. What is the difference between forEach and for...of? When would you use each?
//  forEach:
//  هي method جاهزة بتتستخدم مع Array فقط وبتنفّذ اللوب على كل العناصر ومش بعرف استخدم معاها break أو continue بتبقى مناسبة لما أكون عايز أمرّ على العناصر منغير ما اوقف
// for...of:
//  بتتستخدم مع أي حاجه Arrays, Strings وأقدر أستخدم معاها break و continue  كمان بتشتغل مع async/await  وهي احسن من الforEach في التحكم في اللوب

// 2. What is hoisting and what is the Temporal Dead Zone (TDZ)? Explain with examples.
// hoisting:
//  ده بيخليني اعمل الاكواد واستخدم متغيرات لكن بعرفها قبل ما اعرف المتغيرات اصلا وبتتعمل مع var بس وقيمته بتبقي undefined
// console.log(a); // undefined
// var a = 10;

// Temporal Dead Zone (TDZ):
//  هي الفتره بين بدايه ال scopeبين الوصول للتعريف وهي نفس الفكره ال hosting بس هنا لازم اعرف المتغير قبل ما اعملها بتستخدم مع let , const ولو عملت غير كده بيظهر ReferenceError وده المنطقي
// console.log(x); // ReferenceError
// let x = 5;

// 3. What are the main differences between == and ===?
// ==:
// بتقارن مبين اتنين متغير في القيمه بتاعتهم بس
// ===:
//  بتقارن مبين اتنين متغير بس في القيمه بتاعتهم و كمان النوع

// 4. Explain how try-catch works and why it is important in async operations.
// try-catch: 
// try: بنحط جواه الكود اللي ممكن يحصل فيه خطا
// catch:
//  هنا بنستخدمها علشان لو حصل ايرور ميوقفش الكود ولكن لو حصل خطا في try هينتقل على catch.
// function TryCatch() {
//   try {
//     let x = y;
//   } catch (error) {
//     console.log("Eror");
//   }
// }
// TryCatch();

// 5. What’s the difference between type conversion and coercion? Provide examples of each. 
// type conversion: 
// هو تحويل من نوع الي نوع اخر باستخدام
// Boolean , String , Number
// let num = 10;
// let string = String(num); 
// console.log(string);

// type coercion:
// هو تحويل من نزع الي اخر بس مش بنستخدم حاجه بتتحول تلقائي
// let result = 5 + + "5";  
// console.log(result);