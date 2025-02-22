const NumberPad = ({ onInput }) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '⌫'];
  
    const handleClick = (value) => {
      if (value === '⌫') {
        onInput('backspace');
      } else {
        onInput(value.toString());
      }
    };
  
    return (
      <div className="grid grid-cols-3 gap-2">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => handleClick(num)}
            className={`p-3 rounded-lg ${
              num === '⌫' 
                ? 'bg-red-100 text-red-600' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    );
  };
  
  export default NumberPad;