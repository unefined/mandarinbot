/*
* Все комментарии в данном коде сделаными цветными с помощью расширения в Visual Studio Code
* Для корректного и удобного просмотра комментариев рекомендуется установить Colorful Comments
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
* Готовые координаты для экранов 1920*1080
^ Можно с легкостью создать свои с помощью функции добавления новых точек
^ 1. Очистите данные массив до формы let arr = []
^ 2. Забиндите через конфиг нужную клавишу для добавления новых точек
^ 3. Когда будете в игре идите на мандарины и входите в меню сбора
& 4. Наводитесь на мандарин и нажимаете клавишу добавления новых точек, после нажимаете левой клавишей мыши на мандарин, так повторяете со всеми в данном меню (ЧИТАТЬ 5 ПУНКТ)
& 5. На следующих деревьях нажимаете клавишу сбора, если есть мандарины которые не собрались то собираете их и добавляете через клавишу сбора
TODO 6. Готово! Вы можете быстро выполнять квесты/контракты/зарабатывать на мандаринах, удачи!
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

// ^ Лого + список функций
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
🍊 ${cfg.collectmandarin} - Сбор мандаринов                    | ✅ ${cfg.collectmandarin}
🍊 ${cfg.newpoint} - Добавить новую точку мандаринов     | ✅ ${cfg.newpoint}
🔮 F5 - Включить/Выключить скрипт           | ${toogle == true ? "🔴 Выключено" : "✅ Включено"}
🔐 Пристегивание ремня безопастности        | ✅ Включено (Конфиг)
🚘 ${cfg.autopilot} - Автопилот ( Зажимает W )             | ${autopilot == false ? "🔴 Выключено" : "✅ Включено"}
🍒 ${cfg.multibuy} - Мульти покупка (Магазин 24/7)       | ${buy == false ? "🔴 Выключено" : "✅ Включено"}
🧳 ${cfg.clicker} - Загрузка багажника / Кликер         | ${clicker == false ? "🔴 Выключено" : "✅ Включено"}
`)
}

// & Функция для сбора мандаринов
function collecting(arr) {
    arr.forEach(a => {
        robot.moveMouse(a[0], a[1])
        robot.mouseClick()
    })
}

// * Очищаем терминал и выводим доступные функции
clearterminal()

keylogger.start((key, isKeyUp, keyCode) => {

    // & Сбор мандаринов

    if (key == cfg.collectmandarin && isKeyUp == true) {
        if (toogle == true) return
        collecting(arr)
        oranges++
        clearterminal()
        console.log(chalk.bold(chalk.yellow("🍊 Собран апельсин. Количество за сессию: " + oranges + " | Заработано: " + oranges * 22 + "$")))
    }

    // & Добавление новых точек в массив

    if (key == cfg.newpoint && isKeyUp == true) {
        if (toogle == true) return
        let mouse = robot.getMousePos();
        let hex = robot.getPixelColor(mouse.x, mouse.y);
        console.log(chalk.bold(chalk.green("#" + hex + " at x:" + mouse.x + " y:" + mouse.y)))
        arr.push([mouse.x, mouse.y])
        // ! Нижний код очень полезен при создании новых точек
        // console.log(arr)
        
    }

    // & Включение/Выключение скрипта

    if (key == "F5" && isKeyUp == true) {
        if (toogle == false) {
            toogle = true
            clearterminal()
            console.log(chalk.red("🧥 Скрипт выключен"))
        } else {
            toogle = false
            clearterminal()
            console.log(chalk.green("👔 Скрипт включен"))
        }
    }

    // & Мульти-Покупка в магазинах 24/7

    if (key == cfg.multibuy && isKeyUp == true) {
        if (toogle == true) return
        if (buy == false) {
            buy = true
            clearterminal()
            console.log(chalk.bold(chalk.green("🍒 Мульти-Покупка включена")))
            setInterval(() => {
                if (toogle == true) return
                if (buy == false) return
                robot.mouseClick()
            }, 600);
        } else {
            buy = false
            clearterminal()
            console.log(chalk.bold(chalk.red("🍒 Мульти-Покупка выключена")))
        }
    }

    // & Почти тоже самое как прошлая функция но с 64 cps (clicks per second)
    // * Ее использование никак не мешает при ходьбе в игре

    if (key == cfg.clicker && isKeyUp == true) {
        if (toogle == true) return
        if (clicker == false) {
            clicker = true
            clearterminal()
            console.log(chalk.bold(chalk.green("🧳 Загрузка багажника включена")))
            setInterval(() => {
                if (toogle == true) return
                if (clicker == false) return
                robot.mouseClick()
            }, 1);
        } else {
            clicker = false
            clearterminal()
            console.log(chalk.bold(chalk.red("🧳 Загрузка багажника выключена")))
        }
    }

    // & Автоматические включение ремня безопастности
    // * Сделано криво, надо переработать

    if (key == "F" && isKeyUp == true) { // Ремень безопастности
        if (toogle == true) return
        if (cfg.safebelt == false) return
        setTimeout(() => {
            robot.keyTap("J")
            console.log(chalk.bold(chalk.green("✨ Ремень безопастности был пристегнут")))
        }, 3000)
    }

    // & Зажимает клавишу W
    // * Полезно для машин которые едут очень медленно

    if (key == "M" && isKeyUp == true) { // Автопилот
        if(toogle == true) return
        if(autopilot == true)  {
            robot.keyToggle("w", "up"); 
            autopilot = false; 
            clearterminal()
            console.log(chalk.bold(chalk.red("🚘 Автопилот выключен [ ЕСЛИ НЕ ВЫКЛЮЧАЕТЬСЯ НАЖМИТЕ W ]")));
            return
        }
        if(autopilot == false) {
            robot.keyToggle("w", "down"); 
            autopilot = true; 
            clearterminal()
            console.log(chalk.bold(chalk.green("🚘 Автопилот включен")));
            return
        }
    }
})

// * Скрипт будет дорабатываться, ставьте звездочки на моем гитхабе