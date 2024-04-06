import React, { useState } from "react";
import AceEditor from "react-ace";
import "./Button.css"
import "./Nav.css"
import axios from 'axios';
import 'brace/mode/json'
import "ace-builds/src-noconflict/mode-java.js";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-python.js";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import 'ace-builds/src-noconflict/snippets/java.js';
import 'ace-builds/src-noconflict/snippets/python.js';



function App() {

  const [response, setResponse] = useState('output');
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const defaultVal = {
    "java": `class Test{
    public static void main (String[] args) {
        System.out.print("Hello World: Java"); 
    }
}`,
    "python": `print("Hello World: Python")`,
    "javascript": "console.log('Hello World: Javascript')",
    "go": `package main
import "fmt"
func main() {
    fmt.Println("hello world")
}`
  }

  function onChange(newValue) {
    setCode(newValue);
  }

  function onChangeInput(input) {
    setInput(input);
  }

  function runClick() {
    SubmitCode()
  }

  function SubmitCode() {
    console.log(code)
    axios.post("//localhost:8080/execute", {
      language: language,
      code: code,
      input: input
    })
      .then(function (res) {
        console.log(res.data.output)
        setResponse(res.data.output)
      })
      .catch(function (err) {
        console.log("Test: " + err["response"]["data"]["stderr"])
        if (err["response"]["data"]["stderr"]) {
          setResponse(err["response"]["data"]["stderr"])
        }
      })
  }

  function changeLanguage(lang) {
    if (lang !== language) {
      setProgLang(lang);
    }
  }

  function setProgLang(lang) {
    setLanguage(lang);
    setCode(defaultVal[lang]);
  }

  return (
    <div>
      <div className="topnav">
        <a tabIndex={0} onClick={() => changeLanguage('java')}>Java</a>
        <a tabIndex={1} onClick={() => changeLanguage('python')}>Python</a>
        <a tabIndex={2} onClick={() => changeLanguage('javascript')}>Javascript</a>
        <a tabIndex={3} onClick={() => changeLanguage('go')}>Go</a>

      </div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "inline-block", flex: "1" }}>
          <AceEditor
            mode={language}
            theme="monokai"
            name="blah2"
            onChange={onChange}
            fontSize={18}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            width="50vw"
            height="84vh"
            value={code}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 4,
            }} />
          <button onClick={runClick} className="button button1">
            Submit
          </button>
        </div>

        <div style={{ display: "inline-block", flex: "0.5" }}>
          <AceEditor
            placeholder="Input"
            theme="monokai"
            name="blah2"
            onChange={onChangeInput}
            fontSize={18}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            width="50vw"
            height="42vh"
            value={input}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 4,
              readOnly: false
            }} />

          <AceEditor
            placeholder="Output"
            theme="monokai"
            name="blah2"
            fontSize={18}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            width="50vw"
            height="42vh"
            value={response}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 4,
              readOnly: true
            }} />
        </div>
      </div>
    </div>

  );
}

export default App;
