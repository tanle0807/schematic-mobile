import { generateTemplate, toCamelCase, getSubFileAndFolder, capitalize, words, toTitleCase, askQuestionSubFolder, removeLastFolderInPath } from "./common"
import { Rule, Tree, url, Source, UpdateRecorder } from '@angular-devkit/schematics';
import inquirer from 'inquirer';

const askQuestionFile = () => {
    return inquirer.prompt({
        name: "name",
        type: "input",
        message: `INPUT NAME (EX: 'customer', 'user', ...)
: `
    });
}

// =========================CREATE TEMPLATE======================
export const createStore = (rawName: string, options: any): Rule => {
    rawName = rawName.toLowerCase()
    let folder = `src/store/`
    let finalName = toCamelCase(rawName.replace('store', '').replace('Store', '')) + 'Store'

    const source: Source = url("./files/store");
    const params = {
        name: finalName,
    }
    return generateTemplate(source, options, folder, params)
}


// =========================GENERATE FUNCTION TEMPLATE======================
const generateAction = (name: string) => {
    const camel = toCamelCase(name)
    const cap = capitalize(name)
    let template = `
    @action
    async {{camel}}() {
        
    }`
    template = template.replace(/{{camel}}/g, camel);
    template = template.replace(/{{cap}}/g, cap);
    return template
}

const generateObservable = (name: string) => {
    const camel = toCamelCase(name)
    const cap = capitalize(name)
    let template = `
    @observable private _{{camel}} = null`
    template = template.replace(/{{camel}}/g, camel);
    template = template.replace(/{{cap}}/g, cap);
    return template
}

const generateObservableComputed = (name: string) => {
    const camel = toCamelCase(name)
    const cap = capitalize(name)
    let template = `
    @computed get {{camel}}() {
        return this._{{camel}}
    }`
    template = template.replace(/{{camel}}/g, camel);
    template = template.replace(/{{cap}}/g, cap);
    return template
}

// =========================INJECTION======================

const updateContentClass = (path: any, tree: any, injectString: any, pattern: string) => {
    // Read content
    const buffer = tree.read(path);
    const content = buffer ? buffer.toString() : '';
    // Update content
    const updateRecorder: UpdateRecorder = tree.beginUpdate(path);
    // const pattern = '// ACTION'
    const position = content.indexOf(pattern) + pattern.length
    updateRecorder.insertRight(position, `${injectString}\n`);
    tree.commitUpdate(updateRecorder);
}


export const injectAction = async (tree: Tree): Promise<Tree> => {
    let path = './src/store/'
    const originPath = './src/store/'
    let name = ''
    let done = true

    while (done) {
        const choices = getSubFileAndFolder(path, tree)

        // Don't have anything inside
        const { ctlSub } = await askQuestionSubFolder(choices)

        if (ctlSub == 'BACK') {
            if (path == originPath) return injectAction(tree)
            path = removeLastFolderInPath(path)
            continue
        }
        if (ctlSub.includes('.')) {
            let [filename] = ctlSub.split('.')
            filename = filename.replace('Controller', '')
            name = filename
            path += ctlSub
            done = false
        } else {
            path += `${ctlSub}/`
        }
    }

    const answer = await askQuestionFile()

    // Ask which template to inject
    const injectString = generateAction(answer.name)

    // Done find exact file
    if (path.endsWith('/')) {
        return injectAction(tree)
    }

    updateContentClass(path, tree, injectString, '// ACTION')

    return tree;
}

export const injectObserverGet = async (tree: Tree): Promise<Tree> => {
    let path = './src/store/'
    const originPath = './src/store/'
    let name = ''
    let done = true

    while (done) {
        const choices = getSubFileAndFolder(path, tree)

        // Don't have anything inside
        const { ctlSub } = await askQuestionSubFolder(choices)

        if (ctlSub == 'BACK') {
            if (path == originPath) return injectObserverGet(tree)
            path = removeLastFolderInPath(path)
            continue
        }
        if (ctlSub.includes('.')) {
            let [filename] = ctlSub.split('.')
            filename = filename.replace('Controller', '')
            name = filename
            path += ctlSub
            done = false
        } else {
            path += `${ctlSub}/`
        }
    }


    const answer = await askQuestionFile()

    // Done find exact file
    if (path.endsWith('/')) {
        return injectObserverGet(tree)
    }
    // Ask which template to inject
    const injectString = generateObservable(answer.name)
    updateContentClass(path, tree, injectString, '// OBSERVABLE')

    const injectStringComputed = generateObservableComputed(answer.name)
    updateContentClass(path, tree, injectStringComputed, '// COMPUTED')

    return tree;
}