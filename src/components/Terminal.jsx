import React, { useState, useRef } from 'react';
import './Terminal.css';

function Terminal() {
  // terminal vars
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const terminalRef = useRef(null);
  const [currentDirectory, setCurrentDirectory] = useState('C:/>');
  // Vars used to control terminal buttons
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimize, setIsMinimize] = useState(false);
  // Auto complete vars
  // List of commands depending on location
  const defaultCommands = ['hello', 'time', 'date', 'help', 'pwd', 'whoami', 'echo', 'history', 'reverse', 'clear', 'clr', 'dir', 'ls'];
  const topCommands = ['cd Apps', 'cd Blog', 'cd Games', 'cd Projects'];
  const blogsCommands = ['cd ..', 'The-Risks-of-Chatgpt', 'cd The-Risks-of-Chatgpt', 'Github-Action-CI', 'cd Github-Action-CI'];
  const gamesCommands = ['cd ..'];
  const appsCommands = ['cd ..', 'Fuel-Calc', 'Json-Validator', 'Text-Converter', 'Hex-Converter', 'Commit-Formatter'];
  const projectsCommands = ['cd ..', 'VSIX-Tagger', 'cd VSIX-Tagger', 'Drone-SAR-Research', 'cd Drone-SAR-Research', 'Portfolio-Site', 'cd Portfolio-Site'];
  // holds commands default + location
  const [Suggestions, setSuggestions] = useState(['cd Blog', 'cd Games', 'cd Projects', 'hello', 'time', 'date', 'help', 'pwd', 'whoami', 'echo', 'history', 'reverse', 'clear', 'clr', 'dir', 'ls']);

  // store the commands after being filtered by user input
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  // tracks location in filtered sugestions arr
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  // store orginal command used to filter against
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

  const autocomplete = () => {
    const currentInput = input.trim().toLowerCase();
    if (suggestionIndex === -1) {
      setOrginal(currentInput);
      const matchingSuggestions = Suggestions.filter((suggestion) => (
        suggestion.toLowerCase().startsWith(currentInput)));

      if (matchingSuggestions.length > 0) {
        setInput(matchingSuggestions[0]);
        setSuggestionIndex(1);
        setFilteredSuggestions(matchingSuggestions);
      }
    } else if (suggestionIndex >= filteredSuggestions.length) {
      setInput(orginal);
      setSuggestionIndex(-1);
    } else {
      setSuggestionIndex(suggestionIndex + 1);
      setInput(filteredSuggestions[suggestionIndex]);
    }
  };

  const handleCdCommand = (args, command) => {
    if (args[0] === undefined) {
      setOutput([...output, `${currentDirectory} cd \nSorry, you need to supply a directory`]);
      setCurrentDirectory(currentDirectory);
    } else if (args[0] === '~' || args[0] === '..') {
      setCurrentDirectory('C:/>');
      setOutput([...output, `${currentDirectory} ${command} ${args[0]}`]);
      setSuggestions(defaultCommands.concat(topCommands));
    } else if (args[0].toLowerCase() === 'blog') {
      setOutput([...output, `${currentDirectory} ${command} ${args[0]}\n`]);
      setCurrentDirectory(`C:/${args[0]}>`);
      setSuggestions(defaultCommands.concat(blogsCommands));
    } else if (args[0].toLowerCase() === 'projects' || args[0] === 'proj') {
      setOutput([...output, `${currentDirectory} ${command} ${args[0]}\n`]);
      setCurrentDirectory(`C:/${args[0]}>`);
      setSuggestions(defaultCommands.concat(projectsCommands));
    } else if (args[0].toLowerCase() === 'games') {
      setOutput([...output, `${currentDirectory} ${command} ${args[0]}\n`]);
      setCurrentDirectory('C:/Games>');
      setSuggestions(defaultCommands.concat(gamesCommands));
    } else if (args[0].toLowerCase() === 'apps') {
      setOutput([...output, `${currentDirectory} ${command} ${args[0]}\n`]);
      setCurrentDirectory('C:/Apps>');
      setSuggestions(defaultCommands.concat(appsCommands));
    } else {
      setOutput([...output, `$ cd ${args[0]}\nSorry, the directory "${args[0]}" does not exist.`]);
    }
  };

  const runCommand = () => {
    const inputArray = input.split(' ');
    const command = inputArray[0];
    const args = inputArray.slice(1);
    const commandLower = command.toLowerCase();
    let work = true;
    switch (currentDirectory) {
      case 'C:/Blog>':
        if (commandLower.startsWith('the')) {
          window.open('', '_blank');
        } else if (commandLower.startsWith('git')) {
          window.open('', '_blank');
        } else {
          work = false;
        }
        break;
      case 'C:/Games>':

        break;
      case 'C:/Projects>':
        if (commandLower.startsWith('drone')) {
          window.open('https://github.com/Jwcode-uk/Drone-Research', '_blank');
        } else if (commandLower.startsWith('vsix')) {
          window.open('https://github.com/Jwcode-uk/Visual-Studio-Cobol-Tagger-Extension', '_blank');
        } else if (commandLower.startsWith('web')) {
          window.open('https://github.com/Jwcode-uk/PortfolioWebsite', '_blank');
        } else {
          work = false;
        }
        break;
      case 'C:/Apps>':
        if (commandLower.startsWith('fuel')) {
          window.open('./apps/milage.html', '_blank');
        } else if (commandLower.startsWith('json')) {
          window.open('./apps/json.html', '_blank');
        } else if (commandLower.startsWith('text')) {
          window.open('./apps/toLowercase.html', '_blank');
        } else if (commandLower.startsWith('hex')) {
          window.open('./apps/typeConv.html', '_blank');
        } else if (commandLower.startsWith('com')) {
          window.open('./apps/commitMessage.html', '_blank');
        } else {
          work = false;
        }
        break;
      default:
        work = false;
        break;
    }
    switch (commandLower) {
      case 'cd':
        handleCdCommand(args, command);
        break;
      case 'hello':
        setOutput([...output, `${currentDirectory} ${input}\nHello! How can I help you today?`]);
        break;
      case 'time':
        setOutput([...output, `${currentDirectory} ${input}\nThe current time is: ${new Date().toLocaleTimeString()}`]);
        break;
      case 'date':
        setOutput([...output, `${currentDirectory} ${input}\nThe current date is: ${new Date().toLocaleDateString()}`]);
        break;
      case 'help':
        setOutput([...output, `${currentDirectory} ${input}\nAvailable commands:\ncd, hello, time, date, clear, clr, dir, ls, help, pwd, whoami, calc,echo, history, reverse`]);
        break;
      case 'pwd':
        setOutput([...output, `${currentDirectory} ${input}\nCurrent directory: ${currentDirectory}`]);
        break;
      case 'whoami':
        setOutput([...output, `${currentDirectory} ${input}\nI don't know lol... do you?`]);
        break;
      case 'echo':
        work = args.join(' ');
        setOutput([...output, `${currentDirectory} ${input}\n${work}`]);
        break;
      case 'history':
        setOutput([...output, `${currentDirectory} ${input}\nCommand history: ${output.map((item) => item.replace(currentDirectory, '')).join(', ')}`]);
        break;
      case 'reverse':
        work = args.join(' ').split('').reverse().join('');
        setOutput([...output, `${currentDirectory} ${input}\nReversed: ${work}`]);
        break;
      case 'clear':
      case 'clr':
        setOutput([]);
        break;
      case 'dir':
      case 'ls':
        switch (currentDirectory) {
          case 'C:/Blog>':
            setOutput([...output, `${currentDirectory} ${input}\nC Drive\n └──Blogs \n     └──The-Risks-of-Chatgpt \n     └──Github-Action-CI `]);
            break;
          case 'C:/Games>':
            setOutput([...output, `${currentDirectory} ${input}\nC Drive\n └──None Yet Sorry `]);
            break;
          case 'C:/Projects>':
            setOutput([...output, `${currentDirectory} ${input}\nC Drive\n └──Projects \n     └──VSIX Extension\n     └──Drone Research \n     └──Web`]);
            break;
          case 'C:/Apps>':
            setOutput([...output, `${currentDirectory} ${input}\nC Drive\n └──Apps\n     └──Fuel-Calc  \n     └──Json-Validator \n     └──Text-Converter\n     └──Hex-Converter\n     └──Commit-Formatter`]);
            break;
          default:
            setOutput([...output, `${currentDirectory} ${input}\nC Drive\n └──Apps \n └──Blog \n └──Projects \n └──Games \n └──CV.PDF`]);
        }
        break;
      case 'cv':
      case 'cv.pdf':
        window.open('https://jwcode.uk/Jonathan_White_CV.pdf', '_blank');
        break;
      default:
        if (!work) {
          setOutput([...output, `${currentDirectory} ${input}\nError invalid command. Type help for help.`]);
        }
    }
    setInput('');
    terminalRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand();
    } else if (e.key === 'Tab') {
      e.preventDefault(); // Prevent the default behavior of the "Tab" key
      autocomplete();
    } else {
      setSuggestionIndex(-1);
      setFilteredSuggestions([]);
    }
  };

  return (
    isVisible && (
      <div className="terminal" style={isMinimize ? minimizedStyle : {}}>
        <div className="header-bar">
          <button
            className="status-indicator green"
            onClick={handleGreenClick}
            tabIndex="0"
            style={{ border: 'none' }}
            type="button"
            aria-label="Maximize Terminal"
          />
          <button
            className="status-indicator yellow"
            onClick={handleYellowClick}
            tabIndex="0"
            style={{ border: 'none' }}
            type="button"
            aria-label="Minimize Terminal"
          />
          <button
            className="status-indicator red"
            onClick={handleRedClick}
            tabIndex="0"
            style={{ border: 'none' }}
            type="button"
            aria-label="Close Terminal"
          />
        </div>

        {!isMinimize && (
          <>
            <div className="terminal-output">
              {output.map((out) => (
                <div style={{ textAlign: 'left' }}>
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
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
            </div>

            <div
              style={{ height: '50px', float: 'left', clear: 'both' }}
              ref={terminalRef}
            />
          </>
        )}
      </div>
    )
  );
}

export default Terminal;
