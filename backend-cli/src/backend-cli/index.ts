import { SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import inquirer from 'inquirer';
import { createStore, injectAction, injectObserverGet } from './modules/store'
import { createScreenFlatList, createScreen, createScreenFlatListItem } from './modules/screen';
import { initProject } from './modules/init';

const enum Module {
    Screen = 'SCREEN',
    ScreenFlatList = 'SCREEN FLAT LIST',
    Store = 'STORE',
    InjectObservableGetter = 'INJECT OBSERVABLE WITH GETTER',
    InjectAction = 'INJECT ACTION',
    InitProject = 'INIT PROJECT'
}

const askQuestionModule = () => {
    return inquirer.prompt({
        type: "list",
        name: "module",
        message: "CREATE?",
        choices: [
            Module.Screen,
            Module.ScreenFlatList,
            Module.Store,
            Module.InjectObservableGetter,
            Module.InjectAction,
            Module.InitProject
        ]
    });
};

const askQuestionFile = () => {
    return inquirer.prompt({
        name: "name",
        type: "input",
        message: `INPUT NAME (EX: 'customer', 'user', ...)
: `
    });
}

export function backendCli(options: any): any {
    return async (_tree: Tree, _context: SchematicContext) => {

        const answerModule = await askQuestionModule()
        let answerFile = null

        switch (answerModule.module) {
            case Module.Store:
                answerFile = await askQuestionFile()
                return createStore(answerFile.name, options)
            case Module.ScreenFlatList:
                answerFile = await askQuestionFile()
                const list = createScreenFlatList(answerFile.name, options)
                const item = createScreenFlatListItem(answerFile.name, options)
                return chain([
                    list, item
                ])
            case Module.Screen:
                answerFile = await askQuestionFile()
                return createScreen(answerFile.name, options)


            case Module.InjectAction:
                return await injectAction(_tree)
            case Module.InjectObservableGetter:
                return await injectObserverGet(_tree)
            case Module.InitProject:
                return await initProject()
        }

    };
}
