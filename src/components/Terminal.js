import React, { useState, useRef, useEffect } from "react";
import "./Terminal.css";

const Terminal = ({setShowAbout})  => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const terminalRef = useRef(null);
  const [currentDirectory, setCurrentDirectory] = useState("C:/>");
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimize, setIsMinimize] = useState(false);

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const [orginal, setOrginal] = useState(-1);

  const handleRedClick = () => {
    setIsVisible(!isVisible);
  };
  const minimizedStyle = {
    backgroundColor: 'transparent',
  };
  const handleYellowClick = () => {
    setIsMinimize(!isMinimize);
  };

  const handleGreenClick = () => {
    setIsMinimize(false);
  };
  


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      runCommand();
    }
    else if (e.key === "Tab") {
      e.preventDefault(); // Prevent the default behavior of the "Tab" key
      autocomplete();
    }
    else
    {
      setSuggestionIndex(-1);
      setFilteredSuggestions([]);
    }
  };
  
  const Suggestions = ['cd Blog', 'cd Games', 'cd Projects', 'cd ..', 'Suggestion 4',"hello","time","date","help","pwd","whoami","echo","history","reverse","clear","clr","dir","ls"];
  
  const autocomplete = () => {
    const currentInput = input.trim().toLowerCase();
    if (suggestionIndex === -1) {
      setOrginal(currentInput)
      const matchingSuggestions = Suggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(currentInput)
      );
  
      if (matchingSuggestions.length > 0) {
        setInput(matchingSuggestions[0]);
        setSuggestionIndex(1);
        setFilteredSuggestions(matchingSuggestions);
      }
    } else {
      if(suggestionIndex>=filteredSuggestions.length)
      {
        setInput(orginal);
        setSuggestionIndex(-1);
      }
      else
      {
        setSuggestionIndex(suggestionIndex + 1)
        setInput(filteredSuggestions[suggestionIndex]);
      }
    }
  };

  const runCommand = () => {
    const inputArray = input.split(" ");
    const command = inputArray[0];
    const args = inputArray.slice(1);
    const commandLower = command.toLowerCase();
    switch (commandLower) {
      case "cd":
        handleCdCommand(args, command);
        break
      case "hello":
        setOutput([...output, `${currentDirectory} ${input}\nHello! How can I help you today?`]);
        break
      case "time":
        setOutput([...output, `${currentDirectory} ${input}\nThe current time is: ${new Date().toLocaleTimeString()}`]);
        break;
      case "date":
        setOutput([...output, `${currentDirectory} ${input}\nThe current date is: ${new Date().toLocaleDateString()}`]);
        break;
      case "help":
        setOutput([...output, `${currentDirectory} ${input}\nAvailable commands:\ncd, hello, time, date, clear, clr, dir, ls, help, pwd, whoami, calc,echo, history, reverse`]);
        break;
      case "pwd":
        setOutput([...output, `${currentDirectory} ${input}\nCurrent directory: ${currentDirectory}`]);
        break;
      case "whoami":
        setOutput([...output, `${currentDirectory} ${input}\nI don't know lol... do you?`]);
        break;
      case "echo":
        const echoOutput = args.join(" ");
        setOutput([...output, `${currentDirectory} ${input}\n${echoOutput}`]);
        break;
      case "history":
        setOutput([...output, `${currentDirectory} ${input}\nCommand history: ${output.map((item) => item.replace(currentDirectory, '')).join(', ')}`]);
        break;
      case "reverse":
        const reversedInput = args.join(" ").split("").reverse().join("");
        setOutput([...output, `${currentDirectory} ${input}\nReversed: ${reversedInput}`]);
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
            setOutput([...output, `${currentDirectory} ${input}\nC Drive\n └──AI \n     └──Legacy `]);
            break;
          case "C:/Games>":
            setOutput([...output, `${currentDirectory} ${input}\nC Drive\n └──Snake - WIP `]);
            break;
          case "C:/Projects>":
            setOutput([...output, `${currentDirectory} ${input}\nC Drive\n └──VSIX Extension \n     └──Drone Research \n     └──Web`]);
            break;
          default:
            setOutput([...output, `${currentDirectory} ${input}\nC Drive\n └──Blog \n └──Projects \n └──Games \n └──CV.PDF`]);
        }
        break;
      case "ai":
        setShowAbout(5);
        break
      case "legacy":
        setShowAbout(5);
        break
      case "vsix":
        window.open('https://github.com/Jwcode-uk/Visual-Studio-Cobol-Tagger-Extension', '_blank');
        break
      case "web":
        window.open('https://github.com/Jwcode-uk/PortfolioWebsite', '_blank');
        break
      case "drone":
        window.open('https://github.com/Jwcode-uk/Drone-Research', '_blank');
        break
      case "cv":
      case "cv.pdf":
        window.open('https://jwcode.uk/Jonathan_White_CV.pdf', '_blank');
        break;
      default:
        setOutput([...output, `${currentDirectory} ${input}\nError invalid command. Type help for help.`]);
    }
        setInput("");
    terminalRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleCdCommand = (args, command) => {
    if (args.length === 0 || args[0] === "~" || args[0] === "..") {
      setCurrentDirectory("C:/>");
      setOutput([...output, `${currentDirectory} ${command} ${args[0]}`]);
    } else if (args[0].toLowerCase() === "blog") {

      setOutput([...output, `${currentDirectory} ${command} ${args[0]}\n`]);
      setCurrentDirectory("C:/"+args[0]+">");

    }else if (args[0].toLowerCase() === "projects" || args[0] === "proj") {

      setOutput([...output, `${currentDirectory} ${command} ${args[0]}\n`]);
      setCurrentDirectory("C:/"+args[0]+">");

    } else if (args[0].toLowerCase() === "games") {

      setOutput([...output, `${currentDirectory} ${command} ${args[0]}\n`]);
      setCurrentDirectory("C:/Games>");

    } 
    else {
      setOutput([...output, `$ cd ${args[0]}\nSorry, the directory "${args[0]}" does not exist.`]);
    }
  };

  return (
    isVisible && (
      <div className="terminal"  style={isMinimize ? minimizedStyle : {}}>
        <div className="header-bar">
          <div className="status-indicator green" onClick={handleGreenClick}></div>
          <div className="status-indicator yellow" onClick={handleYellowClick}></div>
          <div className="status-indicator red" onClick={handleRedClick}></div>
        </div>
  
        {!isMinimize && (
          <>
            <div className="terminal-output">
              {output.map((out, index) => (
                <div key={index} style={{ textAlign: 'left' }}>
                  {out}
                </div>
              ))}
            </div>
            <div className="input-line">
              <div
                style={{
                  textAlign: 'left',
                  padding: 0,
                  width: `${10 + (currentDirectory.length - 1) * 8}px`,
                  marginRight: '5px',
                }}
              >
                {currentDirectory}
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  border: 'none',
                  backgroundColor: '#000',
                  color: '#FFF',
                  width: `calc(100% - ${30 + currentDirectory.length * 9}px)`,
                  padding: '0',
                }}
                autoFocus
              />
            </div>
  
            <div
              style={{ height: '50px', float: 'left', clear: 'both' }}
              ref={terminalRef}
            ></div>
          </>
        )}
      </div>
    )
  );
};

export default Terminal;
