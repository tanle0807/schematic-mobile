import { SchematicContext, Tree } from '@angular-devkit/schematics';
import inquirer from 'inquirer';
import { createStore, injectAction, injectObserverGet } from './modules/store'
import { createScreenFlatList, createScreen } from './modules/screen';

const enum Module {
    Screen = 'SCREEN',
    ScreenFlatList = 'SCREEN FLAT LIST',
    Store = 'STORE',
    InjectObservableGetter = 'INJECT OBSERVABLE WITH GETTER',
    InjectAction = 'INJECT ACTION',

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
            Module.InjectAction
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
                return createScreenFlatList(answerFile.name, options)
            case Module.Screen:
                answerFile = await askQuestionFile()
                return createScreen(answerFile.name, options)


            case Module.InjectAction:
                return await injectAction(_tree)
            case Module.InjectObservableGetter:
                return await injectObserverGet(_tree)
        }

    };
}
