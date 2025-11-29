// 1. Write a function that logs the current file path and directory. (0.5 Grade)
// • Output Example:{File:“/home/user/project/index.js”, Dir:“/home/user/project”}
// function file() {
//   console.log({
//     File: __filename,
//     Dir: __dirname,
//   });
// }
// file();

// 2. Write a function that takes a file path and returns its file name. (0.5 Grade)
// • Input Example: /user/files/report.pdf
// • Output Example:"report.pdf"
// const path = require('path');
// function file(filePath) {
//   return path.basename(filePath);
// }
// console.log(file("/user/files/report.pdf")); //report.pdf

// 3. Write a function that builds a path from an object (0.5 Grade)
// • Input Example: { dir: "/folder", name: "app", ext: ".js"}
// • Output Example: “/folder/app.js”
// const path = require('path');
// function buildPath(build) {
//   return path.format(build);
// }
// console.log(buildPath({ dir: "folder", name: "main", ext: ".js" })); \\folder\main.js

// 4. Write a function that returns the file extension from a given file path. (0.5 Grade)
// • Input Example: /docs/readme.md"
// • Output Example: “.md”
// const path = require('path');
// function getFileExtension(file) {
//   return path.extname(file);
// }
// console.log(getFileExtension("/docs/readme.md")); //.md

// 5. Write a function that parses a given path and returns its name and ext. (0.5 Grade)
// • Input Example: /home/app/main.js
// • Output Example: { Name: “main”, Ext: “.js” }
// const path = require('path');
// function givenPath(file) {
//   const parsed = path.parse(file);
//   return {
//     Name: parsed.name,
//     Ext: parsed.ext
//   };
// }
// console.log(givenPath("/home/app/main.js")); //{ Name: 'main', Ext: '.js' }
// console.log(givenPath(__filename)); //{ Name: 'Assignment2', Ext: '.js' }

// 6. Write a function that checks whether a given path is absolute. (0.5 Grade)
// • Input Example: /home/user/file.txt
// • Output Example: true
// const path = require('path');
// function isAbsolutePath(filePath) {
//   return path.isAbsolute(filePath);
// }
// console.log(isAbsolutePath("home/user/file.txt")); //false
// console.log(isAbsolutePath("/home/user/file.txt")); //true

// 7. Write a function that joins multiple segments (0.5 Grade)
// • Input:"src","components", "App.js"
// • Output Example: src/components/App.js
// const path = require('path');
// function joinSegments(...segments) {
//   return path.join(...segments);
// }
// console.log(joinSegments("src", "components", "App.js")); //src\components\App.js

// 8. Write a function that resolves a relative path to an absolute one. (0.5 Grade)
// • Input Example: ./index.js
// • Output Example: /home/user/project/src/index.js
// const path = require('path');
// function resolves(relativePath) {
//   return path.resolve(relativePath);
// }
// console.log(resolves("./index.js")); //e:\Route\Assignments\Assignment 2\index.js

// 9. Write a function that joins two paths. (0.5 Grade)
// • Input Example: /folder1, folder2/file.txt
// • Output Example: /folder1/folder2/file.txt
// const path = require('path');
// function joinTwoPaths(path1, path2) {
//   return path.join(path1, path2);
// }
// console.log(joinTwoPaths("/folder1", "folder2/file.txt")); //\folder1\folder2\file.txt

// 10. Write a function that deletes a file asynchronously. (0.5 Grade)
// • Input Example: /path/to/file.txt
// • Output Example: The file.txt is deleted.
// const fs = require('fs').promises;
// async function deleteFile(filePath) {
//   try {
//     await fs.unlink(filePath);
//     console.log(`The ${filePath} is deleted.`);
//   } catch (error) {
//     console.log(error);
//   }
// }
// deleteFile("../Assignment 2/file.txt"); //The ../Assignment 2/file.txt is deleted.

// 11. Write a function that creates a folder synchronously. (1 Grade)
// • Output Example: “Success”
// const fs = require("fs");
// const path = require("path");

// function createFolder(folderPath) {
//   try {
//     if (!fs.existsSync(folderPath)) {
//       fs.mkdirSync(folderPath, { recursive: true });
//     }
//     console.log("Success");
//   } catch (error) {
//     console.log(error);
//   }
// }
// createFolder(path.join(__dirname, "newFolder2"));

// 12. Create an event emitter that listens for a "start" event and logs a welcome message. (0.5 Grade)
// • Output Example: Welcome event triggered!
// const EventEmitter = require('events');
// const emitter = new EventEmitter();

// emitter.on('start', () => {
//   console.log("Welcome event triggered!");
// });
// emitter.emit('start'); //Welcome event triggered!

// 13. Emit a custom "login" event with a username parameter. (0.5 Grade)
// • Input Example:"Ahmed"
// • Output Example: “User logged in: Ahmed”
// const EventEmitter = require('events');
// const emitter = new EventEmitter();

// emitter.on('login', (username) => {
//   console.log(`User logged in: ${username}`);
// });
// emitter.emit('login', "John"); //User logged in: John

// 14. Read a file synchronously and log its contents. (1 Grade)
// • Input Example:"./notes.txt"
// • Output Example: the file content => “This is a note.”
// const fs = require('fs');

// function readFile(filePath) {
//   try {
//     const file = fs.readFileSync(filePath, 'utf8');
//     console.log("the file content => ", `"${file}"`);
//   } catch (error) {
//     console.log(error);
//   }
// }
// readFile("./file.txt"); //the file content =>  "Hello My Name Is John Remoun"

// 15. Write asynchronously to a file. (1 Grade)
// • Input: path:"./async.txt", content:"Async save"
// const fs = require("fs").promises;

// async function writeFile(filePath, content) {
//   try {
//     await fs.writeFile(filePath, content);
//     console.log("Done");
//   } catch (error) {
//     console.log(error);
//   }
// }
// writeFile("./file2.txt", "My Last Name Is Remoun"); //Done

// 16. Check if a directory exists. (0.5 Grade)
// • Input Example: "./notes.txt"
// • Output Example: true
// const fs = require('fs');

// function isDirectory(path) {
//   try {
//     return fs.existsSync(path) ;
//   } catch (error) {
//     console.log(error);
//   }
// }
// console.log(isDirectory("./file.txt")); //true

// 17. Write a function that returns the OS platform and CPU architecture. (0.5 Grade)
// • Output Example: {Platform: “win32”, Arch: “x64”}
// const os = require('os');

// function test() {
//   return {
//     Platform: os.platform(),
//     architecture: os.arch()
//   };
// }
// console.log(test()); //{ Platform: 'win32', architecture: 'x64' }
