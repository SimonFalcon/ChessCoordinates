import React, { useState, useEffect, useRef } from 'react';

const ChessBoard = () => {
  const [randomCoordinate, setRandomCoordinate] = useState('');
  const [results, setResults] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const resultsRef = useRef(null);

  useEffect(() => {
    setRandomCoordinate(getRandomCoordinate());
  }, []);

  useEffect(() => {
    if (resultsRef.current) {
      const containerHeight = resultsRef.current.clientHeight;
      const scrollHeight = resultsRef.current.scrollHeight;
      if (scrollHeight > containerHeight) {
        resultsRef.current.style.height = `${scrollHeight}px`;
      }
    }
  }, [results]);

  const getRandomCoordinate = () => {
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const randomRow = Math.floor(Math.random() * 8) + 1;
    const randomColIndex = Math.floor(Math.random() * columns.length);
    const randomCol = columns[randomColIndex];
    return randomCol + randomRow;
  };

  const updateSquareColor = (square, correct) => {
    if (correct) {
      square.style.backgroundColor = "#5cb85c";
      setCorrectCount(prevCount => prevCount + 1);
    } else {
      square.style.backgroundColor = "#d9534f";
      setIncorrectCount(prevCount => prevCount + 1);
    }
    setTimeout(() => {
      square.style.backgroundColor = '';
    }, 1000);
  };

  const addResultToList = (coordinate, correct) => {
    setResults(prevResults => [...prevResults, { coordinate, correct }]);
  };


  const recordCorrectAnswer = async () => {
    try {
      // Make a POST request to the correct-answer endpoint with user ID
      await axios.post('/correct-answer', { userId: user._id });
      setCorrectCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error('Error recording correct answer:', error);
    }
  };

  const recordIncorrectAnswer = async () => {
    try {
      // Make a POST request to the incorrect-answer endpoint with user ID
      await axios.post('/incorrect-answer', { userId: user._id });
      setIncorrectCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error('Error recording incorrect answer:', error);
    }
  };

  const handleSquareClick = (event) => {
    const clickedCoordinate = event.target.dataset.col + event.target.dataset.row;
    const correct = (clickedCoordinate === randomCoordinate);
    updateSquareColor(event.target, correct);
    addResultToList(randomCoordinate, correct);
    setRandomCoordinate(getRandomCoordinate());
    if (correct) {
      recordCorrectAnswer();
    } else {
      recordIncorrectAnswer();
    }
  };


  
  return (
    <div className="flex flex-col items-center p-6">
      <div className='p-2'>
        <h2 className="text-5xl font-bold mb-4">{randomCoordinate}</h2>
      </div>
      <div className="flex flex-row gap-8">
        <div ref={resultsRef} className="p-4 bg-white shadow-lg rounded-lg w-80 overflow-x-auto mb-6">
          <h3 className="text-xl font-semibold mb-2">Results</h3>
          <div className="flex flex-row flex-wrap">
            {results.map((result, index) => (
              <div key={index} className={`m-1 ${result.correct ? 'text-green-600' : 'text-red-600'}`}>
                {result.coordinate}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-8 gap-0.5 bg-gray-800 p-2 rounded-lg" style={{ height: '384px', width: '384px' }}>
          {Array.from({ length: 8 }).map((_, row) => (
            Array.from({ length: 8 }).map((_, col) => {
              const isWhite = (row + col) % 2 === 0;
              return (
                <div
                  key={`${row}-${col}`}
                  className={`flex items-center justify-center ${isWhite ? 'bg-gray-200' : 'bg-chessBlue'}`}
                  data-row={8 - row}
                  data-col={String.fromCharCode(65 + col)}
                  onClick={handleSquareClick}
                />
              );
            })
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <div className="text-lg mr-4">Correct: {correctCount}</div>
        <div className="text-lg">Incorrect: {incorrectCount}</div>
      </div>
    </div>
  );
};

export default ChessBoard;
