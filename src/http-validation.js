import chalk from "chalk";

function extractLinks(arrLinks) {
    return arrLinks.map((objectLink) => Object.values(objectLink).join());
}

async function checkStatus(URLsList) {
    const arrStatus = await Promise.all(
        URLsList.map(async (url) => {
            try {
                const response = await fetch(url);
                return response.status;
            } catch (error) {
                return handleError(error);
            }
        })
    )

    return arrStatus;
}

function handleError(error) {
    const codeError = "ENOTFOUND";

    if(error.cause.code === codeError) {
        return "link not found";
    } else {
        return "ocorreu algum erro";
    }
}

export default async function validatedList(listLinks) {
    const links = extractLinks(listLinks);
    const status = await checkStatus(links);
    
    return listLinks.map((object, index) => ({
        ...object,
        status: status[index]
    }))
}