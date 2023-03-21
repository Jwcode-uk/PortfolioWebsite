import React, { useState, useRef, useEffect } from 'react';
import './Snake.css';

const Snake = () => {
    const [snake, setSnake] = useState([[0, 0]]);
    const [direction, setDirection] = useState([0, 1]);
    const [food, setFood] = useState([10, 10]);
    const [speed, setSpeed] = useState(200);
    const [gameOver, setGameOver] = useState(false);
    const gameRef = useRef(null);
    

    const startGame = () => {
        setSnake([[0, 0]]);
        setDirection([0, 1]);
        setFood([10, 10]);
        setSpeed(200);
        setGameOver(false);
    };

    const moveSnake = () => {
        const nextSnake = [...snake];
        const head = nextSnake[nextSnake.length - 1];
        nextSnake.shift();
        nextSnake.push([head[0] + direction[0], head[1] + direction[1]]);
        setSnake(nextSnake);
      
        const headX = head[0];
        const headY = head[1];
      
        if (headX >= 20 || headX < 0 || headY >= 20 || headY < 0) {
          setGameOver(true);
          clearInterval(gameRef.current);
        }
      
        for (let i = 0; i < snake.length - 1; i++) {
          if (headX === snake[i][0] && headY === snake[i][1]) {
            setGameOver(true);
            clearInterval(gameRef.current);
            break;
          }
        }
      
        if (headX === food[0] && headY === food[1]) {
          generateFood();
          setSnake([...snake, head]);
        }
      };
      

    const generateFood = () => {
        setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
    };

    useEffect(() => {
        gameRef.current = setInterval(() => {
          moveSnake();
          const head = snake[snake.length - 1];
          if (head[0] >= 20 || head[0] < 0 || head[1] >= 20 || head[1] < 0) {
            setGameOver(true);
            clearInterval(gameRef.current);
          }
          for (let i = 0; i < snake.length - 1; i++) {
            if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
              setGameOver(true);
              clearInterval(gameRef.current);
              break;
            }
          }
          if (head[0] === food[0] && head[1] === food[1]) {
            generateFood();
            setSnake([...snake, head]);
          } else {
            setSnake([...snake]);
          }
        }, speed);
        return () => clearInterval(gameRef.current);
      }, [snake, direction, food, speed]);
    
    


    const handleKeyDown = (e) => {
        switch (e.keyCode) {
            case 37:
                setDirection([ -1,0]);
                break;
            case 38:
                setDirection([0,-1]);
                break;
            case 39:
                setDirection([ 1,0]);
                break;
            case 40:
                setDirection([0,1 ]);
                break;
            default:
                break;
        }
    };

    return (
        <div className="snake-game">
          {gameOver ? (
            <div className="game-over">
              Game Over!
              <button onClick={startGame}>Play Again</button>
            </div>
          ) : (
            <>
              <div className="board">
                {snake.map(([x, y], i) => (
                  <div
                    key={i}
                    className="snake-block"
                    style={{
                      left: `${x * 20}px`,
                      top: `${y * 20}px`,
                    }}
                  />
                ))}
                <div
                  className="food-block"
                  style={{
                    left: `${food[0] * 20}px`,
                    top: `${food[1] * 20}px`,
                  }}
                />
              </div>
              <div className="score">Score: {snake.length - 1}</div>
            </>
          )}
        </div>
      );
      };
      

export default Snake;