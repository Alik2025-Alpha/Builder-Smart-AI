import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

function Calculator({ darkMode }) {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = () => {
    setDisplay('0');
    setEquation('');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const clearDisplay = () => {
    setDisplay('0');
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    const value = parseFloat(display) * -1;
    setDisplay(String(value));
    if (waitingForOperand) {
      setPrevValue(value);
    }
  };

  const inputPercent = () => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
    setEquation(`${equation} ${value}`);
    setWaitingForOperand(true);
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(`${display}.`);
    }
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (prevValue == null) {
      setPrevValue(inputValue);
      setEquation(`${inputValue} ${nextOperator}`);
    } else if (operator) {
      const currentValue = prevValue || 0;
      let newValue;

      switch (operator) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      setPrevValue(newValue);
      setDisplay(String(newValue));
      setEquation(nextOperator === '=' ? `${equation} ${inputValue} =` : `${newValue} ${nextOperator}`);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator === '=' ? null : nextOperator);
  };

  const buttonClass = (type) => {
    const baseClass = "flex-1 py-3 rounded-lg text-lg font-medium m-1 transition-colors";
    
    if (type === 'number') {
      return twMerge(
        baseClass,
        darkMode 
          ? "bg-gray-800 text-white hover:bg-gray-700" 
          : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200"
      );
    } else if (type === 'operator') {
      return twMerge(
        baseClass,
        darkMode 
          ? "bg-primary-800 text-white hover:bg-primary-700" 
          : "bg-primary-500 text-white hover:bg-primary-600"
      );
    } else if (type === 'function') {
      return twMerge(
        baseClass,
        darkMode 
          ? "bg-gray-700 text-gray-200 hover:bg-gray-600" 
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      );
    }
  };

  return (
    <div className={twMerge(
      "w-full max-w-xs mx-auto rounded-xl overflow-hidden shadow-lg p-4",
      darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    )}>
      <div className="mb-4">
        <div className={twMerge(
          "text-right text-sm mb-1 h-6 overflow-hidden",
          darkMode ? "text-gray-400" : "text-gray-500"
        )}>
          {equation}
        </div>
        <div className="text-right text-3xl font-bold overflow-x-auto whitespace-nowrap">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-1">
        <button onClick={clearAll} className={buttonClass('function')}>AC</button>
        <button onClick={clearDisplay} className={buttonClass('function')}>C</button>
        <button onClick={toggleSign} className={buttonClass('function')}>±</button>
        <button onClick={() => performOperation('÷')} className={buttonClass('operator')}>÷</button>
        
        <button onClick={() => inputDigit(7)} className={buttonClass('number')}>7</button>
        <button onClick={() => inputDigit(8)} className={buttonClass('number')}>8</button>
        <button onClick={() => inputDigit(9)} className={buttonClass('number')}>9</button>
        <button onClick={() => performOperation('×')} className={buttonClass('operator')}>×</button>
        
        <button onClick={() => inputDigit(4)} className={buttonClass('number')}>4</button>
        <button onClick={() => inputDigit(5)} className={buttonClass('number')}>5</button>
        <button onClick={() => inputDigit(6)} className={buttonClass('number')}>6</button>
        <button onClick={() => performOperation('-')} className={buttonClass('operator')}>-</button>
        
        <button onClick={() => inputDigit(1)} className={buttonClass('number')}>1</button>
        <button onClick={() => inputDigit(2)} className={buttonClass('number')}>2</button>
        <button onClick={() => inputDigit(3)} className={buttonClass('number')}>3</button>
        <button onClick={() => performOperation('+')} className={buttonClass('operator')}>+</button>
        
        <button onClick={() => inputDigit(0)} className="col-span-2 py-3 rounded-lg text-lg font-medium m-1 transition-colors flex-1 text-center flex items-center justify-center"
          className={twMerge(
            "col-span-2 py-3 rounded-lg text-lg font-medium m-1 transition-colors",
            darkMode 
              ? "bg-gray-800 text-white hover:bg-gray-700" 
              : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200"
          )}
        >0</button>
        <button onClick={inputDot} className={buttonClass('number')}>.</button>
        <button onClick={() => performOperation('=')} className={buttonClass('operator')}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
