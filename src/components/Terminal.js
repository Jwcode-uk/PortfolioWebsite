import React, { useState, useRef, useEffect } from "react";
import "./Terminal.css";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const terminalRef = useRef(null);

  const [currentDirectory, setCurrentDirectory] = useState("C:/>");


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      runCommand();
    }
  };

  const runCommand = () => {
    const inputArray = input.split(" ");
    const command = inputArray[0];
    const args = inputArray.slice(1);
    switch (command) {
      case "cd":
        handleCdCommand(args, command);
        break
      case "hello":
        setOutput([...output, `${currentDirectory} $  hello\nHello! How can I help you today?`]);
        break
      case "time":
        setOutput([...output, `${currentDirectory} $  time\nThe current time is: ${new Date().toLocaleTimeString()}`]);
        break;
      case "date":
        setOutput([...output, `${currentDirectory} $  date\nThe current date is: ${new Date().toLocaleDateString()}`]);
        break;
      case "clear":
      case "clr":
        setOutput([]);
        break;
      case "dir":
      case "ls":
        switch (currentDirectory)
        {
          case "C:/Blog>":
            setOutput([...output, `${currentDirectory} ls\nC Drive\n └──AI \n     └──Legacy `]);
            break;
          case "C:/Games>":
            setOutput([...output, `${currentDirectory} ls\nC Drive\n └──Snake - WIP `]);
            break;
          case "C:/Projects>":
            setOutput([...output, `${currentDirectory} ls\nC Drive\n └──VSIX Extension \n     └──Project 1 \n     └──Project 2`]);
            break;
          default:
            setOutput([...output, `${currentDirectory} ls\nC Drive\n └──Blog \n └──Projects \n └──Games \n └──CV.PDF`]);
        }
        break;
      default:
        setOutput([...output, `${currentDirectory} ${input}\nSorry, I don't understand that command.`]);
    }
        setInput("");
    terminalRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleCdCommand = (args, command) => {
    if (args.length === 0 || args[0] === "~" || args[0] === "..") {
      setCurrentDirectory("C:/>");
      setOutput([...output, `${currentDirectory} ${command} ${args[0]}`]);
    } else if (args[0] === "blog") {

      setOutput([...output, `${currentDirectory} ${command} ${args[0]}\n`]);
      setCurrentDirectory("C:/"+args[0]+">");

    }else if (args[0] === "Projects" || args[0] === "Proj") {

      setOutput([...output, `${currentDirectory} ${command} ${args[0]}\n`]);
      setCurrentDirectory("C:/"+args[0]+">");

    } else if (args[0] === "games") {

      setOutput([...output, `${currentDirectory} ${command} ${args[0]}\n`]);
      setCurrentDirectory("C:/"+args[0]+">");

    } else if (args[0] === "cv") {

      setOutput([...output, `${currentDirectory} ${command} ${args[0]}\n`]);
      setCurrentDirectory("C:/"+args[0]+">");

    }
    else {
      setOutput([...output, `$ cd ${args[0]}\nSorry, the directory "${args[0]}" does not exist.`]);
    }
  };

  return (
    <div className="terminal">
      <div className="header-bar">
      <div className="status-indicator green" ></div>
      <div className="status-indicator yellow" ></div>
      <div className="status-indicator red" ></div> </div>
      <div className="terminal-output" >
        
        {output.map((out, index) => (
          <div key={index} style={{ textAlign: "left" }}>
            {out}
          </div>
        ))}
      </div>
      <div className="input-line">
        <div style={{textAlign: "left", padding: 0, width: `${10 + ((currentDirectory.length-1) * 8)}px`, marginRight: "10px" }}>
          {currentDirectory} 
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            border: "none",
            backgroundColor: "#000",
            color: "#FFF",
            width: `calc(100% - ${30 + (currentDirectory.length * 9)}px)`, padding: "0"
          }}
          autoFocus
        />
      </div>
        
      <div style={{ height: "50px",float:"left", clear: "both" }}
             ref={terminalRef}>
        </div>
    </div>
  );
};

export default Terminal;
