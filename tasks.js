
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
/* import { readFileSync, writeFile } from 'fs'; 
import { finished } from 'node:stream';  */
var fs = require('fs');
var data = fs.readFileSync('data.json');
 
var tasks = JSON.parse(data);
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
  console.log("For more help write: help")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
text= text.replace('\n','').trim();
var arrText = text.split(' ');

 
  if (text.trim() === 'quit' || text.trim() === 'exit' ) {
    quit();
  }
   else if(arrText[0].trim() === 'hello'){
    hello(arrText[1]);
  }
  else if(arrText[0].trim() === 'list'){
    list();
  }
  else if (arrText[0] === 'add'){
    add(arrText);
  }
  else if (arrText[0] === 'remove'){
    remove(arrText);
  }
  else if (arrText[0] === 'edit'){
    edit(arrText);
  }
  else if(text.trim() === 'help'){
    help();
  }
  else if (arrText[0] === 'check'){
    check(arrText);
  }
  else if (arrText[0] === 'uncheck'){
    unCheck(arrText);
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
 function hello(text){
  if (!text) {
    console.log('hello!')}
    else{
      console.log("hello" + " " +text+'!')
    }
  }

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}
/**
 * help function
 * it will help you to understand and how to navigate and use the app
 */

function help(){
  console.log('\n \b Below are the possible commands: \n', '\n', '   quit/exit: Quits the application\n\n','   help:Shows available commands\n\n','   hello: Show hello message with "!" e.g: you write hello ibrahim it will show "hello ibrahim!" \n\n', '   list: Show all the tasks \n\n', '   add: add new task, e.g: you write "add task1" your task1 will be addedd to the task list \n\n', '   remove: remove task, e.g: you write "remove 1" your task1 will be removed from the task list  P.S: if you write "remove" the last task will be            removed\n\n', '   edit: edit task, e.g: you write "edit 1" your task1 will be edited from the task list \n\n', '   check: check task, e.g: you write "check 1" your task1 will be checked from the task list \n\n')
}

/**
 * list function 
 */
 function list(){
 
 
  if (tasks.length > 0) {
    tasks.forEach((task, index) => {
      if (task.done) {
        console.log(`Task ${index + 1} [???]: ${task.name}`);
      }
      else {
        console.log(`Task ${index + 1} [ ]: ${task.name}`);
      }
    })
  }
  else {
    console.log('Tasks list is empty!');
  }
}

/**
 * add function 
 */

 function add(arrText) {
  if (arrText[1] != undefined) {
    let newTask = {
      name: "",
      done: false
    };
    arrText.forEach(text => {
      if (text == "") return
      newTask.name += `${text} `;
    })
    newTask.name = newTask.name.trim();
    tasks.push(newTask);
    console.log(`Task '${newTask.name}' was added`);
    var data = JSON.stringify(newTask);
    fs.writeFileSync('data.json',data, {flag:'a+'});
  }
  else {
    console.log("Error: no tasks were given");
  }
}
   
  
  
/**
 * remove function 
 */

function remove(arrText){
  if (arrText[1] === undefined){
    tasks.pop();
  } else if (arrText[1]-1 >tasks.length)
  { console.log(" This task number does not exist!")
  }
  else {
    tasks.splice(arrText[1]-1, 1)
  }
}

/**
 * edit function 
 */

function edit(arrText){
  if (arrText[1] === undefined){
    console.log("Error")
  } else if (arrText[1]-1 < tasks.length){
    tasks.splice(arrText[1]-1, 1, arrText.slice(2).join(" ")) 
  } else {
    tasks.splice(-1, 1, arrText.slice(1).join(" "))
  }
}

/**
 * check function 
 */

function check(arrText){
  if(arrText[1]-1 < tasks.length){
    tasks[arrText[1]-1].done = true;
  }else{
    console.log("choose a task number after CHECK")
  }
}

/**
 * uncheck function 
 */

function unCheck(arrText){
  if(arrText[1]-1 < tasks.length){
    tasks[arrText[1]-1 ].done = false;
  }else{
    console.log("choose a task number after CHECK")
  }
}

// The following line starts the application
startApp("Ibrahim Merhi")
