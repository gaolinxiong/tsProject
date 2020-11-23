#!/usr/bin/env node

const pkg = require("./../package.json")
const { program } = require("commander")

let projectName;
let force;

program.version(pkg.version,'-v --version')

program.arguments('[projectName]') // 指定解析的参数
    .description("初始化项目")
    .option('-f --force','如果存在输入的项目目录，强制删除项目目录')
    .action((name,cmd)=>{
        projectName = name;
        force = cmd.force;
    });
program.parse(process.argv);

console.log(projectName,force)
