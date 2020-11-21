'use strict';

/**
 * 本文件是根据commit检测重复代码
 */
const execa = require('execa');
const sgf = require('staged-git-files');
const getStream = require('get-stream');
const chalk = require('chalk');
const http = require('http');
const path = require('path');
const fs = require('fs');
const STATISTICS = 'http://cli.qtt6.cn/api/usage/statistics';
const LOGFIlE = 'js-inspect.log';

let report = { username: '', project: '', signature: 'inspect', details: [] };
const IGNORE_FILES = '"build|config|mocks"';
// 获取staged的文件
function getChangeFilesArr () {
    return new Promise(resolve => {
        sgf((err, results) => {
            if (!err) {
                resolve(results);
            }
        });
    });
}

async function main () {
    report.username = execa.shellSync('git config user.email').stdout;
    report.project = require('./package.json').name;
    let doCommitId = execa.shellSync('git rev-parse --short HEAD').stdout;
    let branch = execa.shellSync('git symbolic-ref --short -q HEAD').stdout;

    let changeFilesArr = await getChangeFilesArr();
    let changedApps = changeFilesArr
        .filter(item => item.filename.startsWith('apps'))
        .map(item => {
            let match = item.filename.match(/^apps\/(\w+)\/?/);
            return match ? match[1] : match;
        })
        .filter(item => !!item);

    // 过滤掉重复的目录
    let changedDirs = Array.from(new Set(changedApps));
    let streamArr = [];
    for (let i = 0; i < changedDirs.length; i++) {
        let stream = execa.shell(`npx jsinspect -I -L -t 30 -r json --truncate 30 --ignore ${IGNORE_FILES} ./apps/${changedDirs[i]}`)
            .stdout;
        streamArr.push(stream);
    }

    let checkResult = await parseStream(streamArr);
    let checkResultFlat = checkResult
        .map((item, index) => {
            let _result = '';
            try {
                _result = JSON.parse(item);
            } catch (error) { }
            report.details.push({
                dirs: changedDirs[index],
                doCommitId,
                branch,
                repeat: _result.length
            });
            return _result;
        })
        .reduce((prev, next) => [...prev, ...next], []);

    if (fs.existsSync(LOGFIlE)) fs.unlinkSync(LOGFIlE);
    // 输出日志
    checkResultFlat.forEach(item => formmatLog(item));

    // 上报重复情况
    if (changedDirs.length > 0) {
        try {
            request(report);
        } catch (e) { }
    }

    if (checkResultFlat.length > 0) {
        console.log(chalk.red(`\n本次提交共发现${checkResultFlat.length}条疑似重复，请修改后重新提交\n错误详情查看: ${path.posix.join(__dirname, LOGFIlE)}\n`));
    } else {
        console.log(chalk.red(`\n本次提交未发现重复代码，请继续保持良好习惯\n`));
    }
}

async function parseStream (streamArr) {
    let streamPromise = streamArr.map(async stream => {
        let returnStream = await getStream(stream);
        return returnStream;
    });
    let streamPromiseResult = await Promise.all(streamPromise);
    return streamPromiseResult;
}

function request (report) {
    return new Promise((resolve, reject) => {
        let req = http.request(
            {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                ...require('url').parse(STATISTICS)
            },
            res => {
                res.on('error', err => {
                    reject(err);
                });
                res.on('end', () => {
                    resolve();
                });
            }
        );

        req.on('error', err => {
            reject(err);
        });

        req.write(JSON.stringify(report));
        req.end();
    });
}

function formmatLog (match) {
    let instances = match.instances;
    let output = '\n' + '-'.repeat(60) + '\n';
    let outputConsole = output;

    instances.forEach(instance => {
        let location = instance.path + ':' + instance.lines.join(',');
        let code = instance.code;
        output += `\n${location}\n${code}\n`;
        outputConsole += `\n${location}`
    });

    // 写入日志文件
    fs.writeFileSync(LOGFIlE, output, { flag: 'a' });

    // 输出console
    process.stdout.write(outputConsole);
}

try {
    main();
} catch (e) {
    console.log('代码重复性检查发生异常，请联系 潘海成<panhaicheng@qutoutiao.net>!');
}
