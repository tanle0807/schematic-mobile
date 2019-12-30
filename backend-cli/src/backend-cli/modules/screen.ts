import { generateTemplate, toCamelCase, getSubFileAndFolder, capitalize, words, toTitleCase, askQuestionSubFolder, removeLastFolderInPath } from "./common"
import { Rule, Tree, url, Source, UpdateRecorder } from '@angular-devkit/schematics';

// =========================CREATE TEMPLATE======================
export const createScreen = (rawName: string, options: any): Rule => {
    rawName = capitalize(rawName)
    let folder = `src/screens/${rawName}`

    const source: Source = url("./files/screen");
    const params = {
        name: rawName
    }
    return generateTemplate(source, options, folder, params)
}

export const createScreenFlatList = (rawName: string, options: any): Rule => {
    rawName = capitalize(rawName)
    let folder = `src/screens/${rawName}`

    const source: Source = url("./files/screenFlatList");
    const params = {
        name: rawName
    }

    return generateTemplate(source, options, folder, params)
}

export const createScreenFlatListItem = (rawName: string, options: any): Rule => {
    rawName = capitalize(rawName)
    let folder = `src/screens/${rawName}`

    const source: Source = url("./files/screenFlatListItem");
    const params = {
        name: rawName + `FlatListItem`
    }

    return generateTemplate(source, options, folder, params)
}

