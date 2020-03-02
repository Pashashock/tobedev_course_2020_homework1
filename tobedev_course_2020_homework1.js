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
async function AddContakt() { //функция добавления контактов
    console.log('Введите имя');
    let name = await getLine();
    if (!phoneBook[name]) {
        console.log('Введите номер');
        num = await getLine();
        phoneBook["num"] = name;
    }
    else {
        console.log(`Введите другое имя`);
        await AddContakt();
    }
}
async function RemoveContact() { //функция удаления контактов
    console.log('Введите имя контакта ');
    let name = await getLine();
    phoneBook[name] = await getLine();
    delete phoneBook.name;
}
async function Phonetic() { //функция отображения контактов
    console.log(phoneBook);
    phoneBook = await getLine();
}
const main = async () => {
    console.log('Введите команду для заполнения телефонной книги. \AddKontakt. \nRemoveContact. \nPhonetic Для выхода используйте команду - exit');
    const command = await getLine();
    if (command === 'exit') {
        process.exit(0);
    } else if (command === 'AddContakt') {
        await AddContakt();
    } else if (command === 'RemoveContact') {
        await RemoveContact();
    }
    else if (command === 'Phonetic')
        await Phonetic();
    else {
        console.log('Неизвестная команда');
    }

    main();
};

main();