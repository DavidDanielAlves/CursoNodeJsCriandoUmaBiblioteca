import fs from "fs";
import chalk from "chalk";

// extractLinks: extrair links
function extractLinks(text) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    // const capturs = text.match(regex); // capturs: capturas
    const capturs = [...text.matchAll(regex)];
    const results = capturs.map(capture => ({[capture[1]]: capture[2]}))
    return results;
}

// handleError: tratar erro
function handleError(error) {
    throw new Error(chalk.red(error.code, "there is no file in the directory"))
}

async function getFile(path) {
    try {
        const enconding = "utf-8";
        const text = await fs.promises.readFile(path, enconding);
        return extractLinks(text);
    } catch(error) {
        handleError(error);
    }   
}

getFile('./arquivos/texto.md');
// getFile('./arquivos/');

export default getFile;