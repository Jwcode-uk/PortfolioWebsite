import React, { useState } from 'react';
import './App.css';

function Converter() {
  const [hexValue, setHexValue] = useState('');
  const [decimalValue, setDecimalValue] = useState('');
  const [binaryValue, setBinaryValue] = useState('');
  const [base64Value, setBase64Value] = useState('');
  const [asciiValue, setAsciiValue] = useState('');

  function handleHexInputChange(event) {
    const hexValue = event.target.value;
    setHexValue(hexValue);
    setDecimalValue(parseInt(hexValue, 16).toString(10));
    setBinaryValue(parseInt(hexValue, 16).toString(2));
    setBase64Value(btoa(hexToString(hexValue)));
    setAsciiValue(hexToString(hexValue));
  }

  function handleDecimalInputChange(event) {
    const decimalValue = event.target.value;
    setDecimalValue(decimalValue);
    setHexValue(parseInt(decimalValue, 10).toString(16).toUpperCase());
    setBinaryValue(parseInt(decimalValue, 10).toString(2));
    setBase64Value(btoa(decimalToString(decimalValue)));
    setAsciiValue(decimalToString(decimalValue));
  }

  function handleBinaryInputChange(event) {
    const binaryValue = event.target.value;
    setBinaryValue(binaryValue);
    setDecimalValue(parseInt(binaryValue, 2).toString(10));
    setHexValue(parseInt(binaryValue, 2).toString(16).toUpperCase());
    setBase64Value(btoa(binaryToString(binaryValue)));
    setAsciiValue(binaryToString(binaryValue));
  }

  function handleBase64InputChange(event) {
    const base64Value = event.target.value;
    setBase64Value(base64Value);
    setAsciiValue(atob(base64Value));
    setHexValue(stringToHex(atob(base64Value)));
    setDecimalValue(stringToDecimal(atob(base64Value)));
    setBinaryValue(stringToBinary(atob(base64Value)));
  }

  function handleAsciiInputChange(event) {
    const asciiValue = event.target.value;
    setAsciiValue(asciiValue);
    setHexValue(stringToHex(asciiValue));
    setDecimalValue(stringToDecimal(asciiValue));
    setBinaryValue(stringToBinary(asciiValue));
    setBase64Value(btoa(asciiValue));
  }

  function hexToString(hex) {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
  }

  function decimalToString(decimal) {
    return String.fromCharCode(decimal);
  }

  function binaryToString(binary) {
    let str = '';
    for (let i = 0; i < binary.length; i += 8) {
      str += String.fromCharCode(parseInt(binary.substr(i, 8), 2));
    }
    return str;
  }

  function stringToHex(str) {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
      hex += str.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return hex.toUpperCase();
  }

  function stringToDecimal(str) {
    return str.charCodeAt(0);
  }

  function stringToBinary(str) {
    let binary = '';
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      binary += charCode.toString(2).padStart(8, '0');
    }
    return binary;
  }

  return (
    <div >
    <h1>Hex, Decimal, Binary, Base64, and ASCII Converter</h1>
  
    <div className="input-container">
      <label htmlFor="hex-input">Hex</label>
      <input id="hex-input" type="text" value={hexValue} onChange={handleHexInputChange} />
    </div>
  
    <div className="input-container">
      <label htmlFor="decimal-input">Decimal</label>
      <input id="decimal-input" type="text" value={decimalValue} onChange={handleDecimalInputChange} />
    </div>
  
    <div className="input-container">
      <label htmlFor="binary-input">Binary</label>
      <input id="binary-input" type="text" value={binaryValue} onChange={handleBinaryInputChange} />
    </div>
  
    <div className="input-container">
      <label htmlFor="base64-input">Base64</label>
      <input id="base64-input" type="text" value={base64Value} onChange={handleBase64InputChange} />
    </div>
  
    <div className="input-container">
      <label htmlFor="ascii-input">ASCII</label>
      <input id="ascii-input" type="text" value={asciiValue} onChange={handleAsciiInputChange} />
    </div>
  </div>);
}

export default Converter;
