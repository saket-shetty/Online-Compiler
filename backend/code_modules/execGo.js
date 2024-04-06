const { exec } = require("child_process")
const { createCodeFile } = require('./createCodeFile');

function execGoCode(code, input, res){

    const val = createCodeFile(code, "go", exec)

    if(val.error){
        return res.status(400).json({error: val.error})
    }

    const process = exec(`go run ${val.cmd}`, (err, stdout, stderr)=>{
        if(err){
            return res.status(500).json({error: err.message, stderr, stdout});
        }else if (stderr) {
			return res.status(400).json({ error: 'Syntax error', stderr });
		}else{
            return res.json({ output: stdout, stderr });
        }
    })

    process.stdin.write(input);
    process.stdin.end()
}

module.exports = {execGoCode}