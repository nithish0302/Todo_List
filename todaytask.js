// todaytask.js
import { maintainTask } from "./Todo";

function call() {
    console.log("hi");
    console.log(maintainTask);
}

window.call = call; // Attach the function to the global window object
