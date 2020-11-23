#!/usr/bin/env node

const { program } = require("commander")
// const pkg = require("./../package.json")
//
// program.version(pkg.version,'-v --version')
//
// program.parse(process.argv)

program.command('init [projectName]')  // projectName 是一个可选参数
    .description("初始化项目")
    .option('-f --force','如果存在输入的项目目录，强制删除项目目录') // 添加一个选项
    .action((projectName,cmd)=>{
        console.log(projectName) // projectName 是我们输入的参数，
        console.log(cmd.force)  // cmd是Command对象
    })
