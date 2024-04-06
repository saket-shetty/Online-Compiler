const fs = require('fs');

function createCodeFile(code, lang, exec) {
     
    switch (lang) {
        case "java":
            filePath = "code_template/Test.java"
            break;

        case "python":
            filePath = "code_template/Test.py"
            break;

        case "javascript":
            filePath = "code_template/Test.js"
            break;

        case "go":
            filePath = "code_template/test.go"
            break;
            
        default:
            return {error: "language isn't supported", cmd: null}
    }
    fs.writeFileSync(filePath, code);
    
    return {error: null, cmd: filePath};
}

module.exports = {createCodeFile}
