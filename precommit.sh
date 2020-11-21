#!/bin/sh

message_echo(){
    echo
    echo "  Error: 提交被拒绝，检测你的代码中有冲突未处理，请处理后进行提交"
    echo
    echo "  以下为冲突文件列表:"
    echo
    git diff --cached --name-only | grep -E '\.(html|htm|es6|js|css|less|scss|sass|vue|ejs)' | xargs grep -onHE '(<<<<<<< HEAD)'
    echo
    echo "  - 更多细节请参考 http://km.innotechx.com/pages/viewpage.action?pageId=17980887"
    echo
}

n=`git diff --cached --name-only | grep -E '\.(html|htm|es6|js|css|less|scss|sass|vue|ejs)$' | xargs grep -siE '(<<<<<<< HEAD)' | wc -l`

if [ ${n} -gt 0 ]; then
    message_echo;
    exit 1
fi
