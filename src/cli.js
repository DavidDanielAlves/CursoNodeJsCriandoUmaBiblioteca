import getFile from "./index.js";
import chalk from "chalk";
import fs from "fs";
import validatedList from "./http-validation.js";

const path = process.argv;

async function printList(valid, result, identifier = "") {
    if (valid) {
        console.log(
            chalk.yellow('validity list'), 
            chalk.black.bgGreen(identifier),
            await validatedList(result));
    } else {
        console.log(
            chalk.yellow('list of links'), 
            chalk.black.bgGreen(identifier),
            result);
    }
}

async function processText(argument) {
    const path = argument[2];
    const valid = argument[3] === "--validation";

    try {
        fs.lstatSync(path);

    } catch(error) {
        const codeError = "ENOENT";
        if (error.code === codeError) {
            console.log(chalk.red("file not found"));
            return
        }
    }
    
    if (fs.lstatSync(path).isFile()) {
        const result = await getFile(path);
        printList(valid, result);
    } else if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path)
        files.forEach(async (fileName) => {
            const list = await getFile(`${path}/${fileName}`);
            printList(valid, list, fileName);
        })
    }

}

processText(path);