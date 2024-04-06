const { createCodeFile } = require("./createCodeFile");
const { exec } = require("child_process")



function execPythonCode(code, input, res){
    const val = createCodeFile(code, "python", exec)

	if(val.error){
        return res.status(400).json({error: val.error})
    }

	const process = exec(`python3 ${val.cmd}`, (error, stdout, stderr) => {
		if (error) {
			return res.status(400).json({ error: error.message, stderr });
		}
		if (stderr) {
			return res.status(400).json({ error: 'Syntax error', stderr });
		}
		return res.json({ output: stdout, stderr });
	})

	process.stdin.write(input)
	process.stdin.end();
}


module.exports = {execPythonCode}