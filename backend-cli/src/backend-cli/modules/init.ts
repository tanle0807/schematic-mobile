import { generateTemplate, toCamelCase } from "./common"
import { Source, url, Rule, Tree, apply, template, move, branchAndMerge, mergeWith } from "@angular-devkit/schematics"
import inquirer = require("inquirer");
import { strings } from "@angular-devkit/core";
import { normalize } from "path";
import { capitalize } from "@angular-devkit/core/src/utils/strings";


const askQuestionProjectName = () => {
    return inquirer.prompt({
        type: "input",
        name: "projectName",
        message: "PROJECT NAME: "
    });
}

const askQuestionProjectCode = () => {
    return inquirer.prompt({
        type: "input",
        name: "projectNameSlug",
        message: "PROJECT Slug: "
    });
}

const toUppercase = (string: string) => {
    return string.toUpperCase()
}

export const initProject = async (): Promise<any> => {
    const folder = './'
    let { projectName } = await askQuestionProjectName()
    let { projectNameSlug } = await askQuestionProjectCode()

    const source: Source = url("./files/init");
    const params = {
        projectName: capitalize(projectName),
        projectNameSlug
    }

    const transformedSource: Source = apply(source, [
        template({
            ...strings, // dasherize, classify, camelize, etc
            ...params
        }),
        move(normalize(folder))
    ]);

    return branchAndMerge(mergeWith(transformedSource));
}