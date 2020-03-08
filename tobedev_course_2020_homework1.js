"use strict";
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const getLine = (function () {
    const getLineGen = (async function* () {
        for await (const line of rl) {
            yield line;
        }
    })();
    return async () => ((await getLineGen.next()).value);
})();
let phoneBook = {};
async function add() { //функция добавления контактов
    console.log('Введите имя');
    const name = await getLine();
    console.log('Введите номер');
    const num = await getLine();
    phoneBook[name] = num;
    console.log(phoneBook);
}
async function delet() { //функция удаления контактов
    console.log('Введите имя контакта ');
    const name = await getLine();
    delete phoneBook[name];
}
async function list() { //функция отображения контактов
    console.log(`\n---`);
    for (let key in phoneBook) {
        console.log(`Контакт с именем ${key} и номером ${phoneBook[key]}`);
    }
    console.log(`---\n`);
}
async function search() {//функция поиска контактов 
    console.log('Введите имя контакта');
    const name = await getLine();
    if (phoneBook[name] === undefined) {
        console.log('Такого имени нет в телефонной книге');
    } else {
        console.log(`Контакт с именем ${name} и номером ${phoneBook[name]}`);
    }
}
const main = async () => {
    console.log('Введите команду для заполнения телефонной книги. \nadd- для добавления нового контакта. \ndelet-для удаления контакта. \nlist- для вывода всех существующих записей.\nsearch- для поиска контактов. \nДля выхода используйте команду - exit');
    const command = await getLine();
    if (command === 'exit') {
        process.exit(0);
    } else if (command === 'add') {
        await add();
    } else if (command === 'delet') {
        await delet();
    }
    else if (command === 'list') {
        await list();
    }
    else if (command === 'search') {
        await search();
    }
    else {
        console.log('Неизвестная команда');
    }
    main();
};
main();