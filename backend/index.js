const express = require('express');
const { exec } = require('child_process');
const dotenv = require('dotenv')
const { execJavaCode } = require('./code_modules/execJava');
const { execJavascriptCode } = require('./code_modules/execJS');
const { execPythonCode } = require('./code_modules/execPython');
const cors = require("cors");
const { execGoCode } = require('./code_modules/execGo');

dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

// Body parsing middleware
app.use(express.json());
app.use(cors({
	origin: "*"
}))

const lang = {
	"Java":"java",
	"Python": "python3",
	"Javascript": "node"
}

// Endpoint for code execution
app.post('/execute', (req, res) => {

	const { code, language, input } = req.body;

	switch (language) {
		case "java":
			execJavaCode(code, input, res)
			break;

		case "python":
			execPythonCode(code, input, res);
			break;

		case "javascript":
			execJavascriptCode(code, input, res);
			break;

		case "go":
			execGoCode(code, input, res);

		default:
			break;
	}

});

app.get("/langlist", (req, res)=>{
	res.status(200).json({lang: JSON.stringify(lang)});
})


app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
