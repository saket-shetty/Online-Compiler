const { exec } = require('child_process');
const { createCodeFile } = require('./createCodeFile');

function execJavaCode(code, input, res) {

	const val = createCodeFile(code, "java", exec)

	if(val.error){
        return res.status(400).json({error: val.error})
    }

	const process = exec(`java ${val.cmd}`, (error, stdout, stderr) => {
		if (error) {
			return res.status(400).json({ error: error.message, stderr });
		}
		if (stderr) {
			return res.status(400).json({ error: 'Syntax error', stderr });
		}
		return res.json({ output: stdout, stderr });
	})

	process.stdin.write(input)
	process.stdin.end()
}

module.exports = {execJavaCode}