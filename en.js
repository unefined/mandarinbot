/*
* All comments in this code are colored using an extension in Visual Studio Code
* For correct and convenient viewing of comments, it is recommended to install Colorful Comments
*/

// Импорты
const robot = require("robotjs");
const keylogger = require("keylogger.js")
const chalk = require("chalk")
const cfg = require("./config.json")

// Переменные функций
let toogle = false
let oranges = 0
let buy = false
let clicker = false
let autopilot = false
/*
* Ready-made coordinates for 1920*1080 screens
^ You can easily create your own using the add new points function
^ 1. Clear the data array to the form let arr = []
^ 2. Bind the desired key through the config to add new points
^3. When you are in the game, go to the tangerines and enter the collection menu
& 4. Point at the mandarin and press the key to add new points, then left-click on the mandarin, repeat with everyone in this menu (READ 5 POINT)
& 5. On the next trees, press the collection key, if there are tangerines that have not been collected, then collect them and add them through the collection key
TODO 6. Done! You can quickly complete quests/contracts/earn money from tangerines, good luck!
*/
let arr = [
    [833, 353], [923, 418], [1167, 358],
    [1015, 127], [924, 127], [828, 141],
    [756, 222], [986, 272], [1105, 174],
    [1044, 471], [754, 583], [918, 523],
    [890, 629], [987, 604], [1084, 576],
    [1047, 381], [874, 258], [716, 346],
    [1175, 461], [1174, 572], [808, 431],
    [979, 695], [798, 697], [1166, 256],
    [831, 141], [1128, 697], [923, 126],
    [758, 224], [1108, 173], [1160, 356],
    [1014, 127], [874, 261], [719, 345],
    [888, 632], [918, 518], [1051, 383],
    [823, 349], [1079, 478]
]

// ^ Logo + list of functions
function clearterminal() {
    process.stdout.write("\u001b[2J\u001b[0;0H");
    console.log(chalk.green(chalk.bold(`

                                                
    _         _        _       _   
    _____ ___ ___ _| |___ ___|_|___   | |_ ___| |_ 
   |     | .'|   | . | .'|  _| |   |  | . | . |  _|
   |_|_|_|__,|_|_|___|__,|_| |_|_|_|  |___|___|_|  
                                                   

by unefined
https://github.com/unefined`)))

console.log(`
🍊 ${cfg.collectmandarin} - Picking oranges              | ✅ ${cfg.collectmandarin}
🍊 ${cfg.newpoint} - Add new point oranges         | ✅ ${cfg.newpoint}
🔮 F5 - Enable/Disable script         | ${toogle == true ? "🔴 Disable" : "✅ Enabled"}
🔐 Fastening your seat belt           | ✅ Enabled (Config)
🚘 ${cfg.autopilot} - Autopilot (Press W)            | ${autopilot == false ? "🔴 Disable" : "✅ Enabled"}
🍒 ${cfg.multibuy} - Multi purchase (Shop 24/7)    | ${buy == false ? "🔴 Disable" : "✅ Enabled"}
🧳 ${cfg.clicker} - Trunk Load/Clicker            | ${clicker == false ? "🔴 Disable" : "✅ Enabled"}
`)
}

// & Function for picking tangerines
function collecting(arr) {
    arr.forEach(a => {
        robot.moveMouse(a[0], a[1])
        robot.mouseClick()
    })
}

// * Clear the terminal and display available functions
clearterminal()

keylogger.start((key, isKeyUp, keyCode) => {

    // & Picking oranges

    if (key == cfg.collectmandarin && isKeyUp == true) {
        if (toogle == true) return
        collecting(arr)
        oranges++
        clearterminal()
        console.log(chalk.bold(chalk.yellow("🍊 The orange has been picked. Quantity per session: " + oranges + " | Earned: " + oranges * 22 + "$")))
    }

    // & Adding new points to the array

    if (key == cfg.newpoint && isKeyUp == true) {
        if (toogle == true) return
        let mouse = robot.getMousePos();
        let hex = robot.getPixelColor(mouse.x, mouse.y);
        console.log(chalk.bold(chalk.green("#" + hex + " at x:" + mouse.x + " y:" + mouse.y)))
        arr.push([mouse.x, mouse.y])
        // ! The below code is very helpful when creating new points
        // console.log(arr)
        
    }

    // & Enable/Disable script

    if (key == "F5" && isKeyUp == true) {
        if (toogle == false) {
            toogle = true
            clearterminal()
            console.log(chalk.red("🧥 Script disabled"))
        } else {
            toogle = false
            clearterminal()
            console.log(chalk.green("👔 Script enabled"))
        }
    }

    // & Multi-Purchase in stores 24/7

    if (key == cfg.multibuy && isKeyUp == true) {
        if (toogle == true) return
        if (buy == false) {
            buy = true
            clearterminal()
            console.log(chalk.bold(chalk.green("🍒 Multi-Purchase Included")))
            setInterval(() => {
                if (toogle == true) return
                if (buy == false) return
                robot.mouseClick()
            }, 600);
        } else {
            buy = false
            clearterminal()
            console.log(chalk.bold(chalk.red("🍒 Multi-Purchase is disabled")))
        }
    }

    // & Almost the same as the previous function but with 64 cps (clicks per second)
    // * Its use does not interfere in any way when walking in the game

    if (key == cfg.clicker && isKeyUp == true) {
        if (toogle == true) return
        if (clicker == false) {
            clicker = true
            clearterminal()
            console.log(chalk.bold(chalk.green("🧳 Trunk loading enabled")))
            setInterval(() => {
                if (toogle == true) return
                if (clicker == false) return
                robot.mouseClick()
            }, 1);
        } else {
            clicker = false
            clearterminal()
            console.log(chalk.bold(chalk.red("🧳 Trunk loading disabled")))
        }
    }

    // & Automatic seat belt activation
    // * Made crookedly, needs to be reworked

    if (key == "F" && isKeyUp == true) { // Ремень безопастности
        if (toogle == true) return
        if (cfg.safebelt == false) return
        setTimeout(() => {
            robot.keyTap("J")
            console.log(chalk.bold(chalk.green("✨ The seat belt was fastened")))
        }, 3000)
    }

    // & Holds down the W key
    // * Useful for cars that drive very slowly

    if (key == "M" && isKeyUp == true) { // Autopilot
        if(toogle == true) return
        if(autopilot == true)  {
            robot.keyToggle("w", "up"); 
            autopilot = false; 
            clearterminal()
            console.log(chalk.bold(chalk.red("🚘 Autopilot is turned off [IF NOT TURNED OFF PRESS W]")));
            return
        }
        if(autopilot == false) {
            robot.keyToggle("w", "down"); 
            autopilot = true; 
            clearterminal()
            console.log(chalk.bold(chalk.green("🚘 Autopilot enabled")));
            return
        }
    }
})

// * The script will be improved, please put stars on my github ❤