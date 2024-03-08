import { useState } from 'react';
import PropTypes from 'prop-types';

import { descriptions } from '../constants';

const TreeInputForm = ({ onAddNodes, onRandom, nodes }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInputValue = inputValue.trim();
  
    // Check if the trimmed input is not an empty string and is a valid number
    if (trimmedInputValue !== '' && !isNaN(Number(trimmedInputValue))) {
      const nodeValue = Number(trimmedInputValue);
      console.log('Adding node:', nodeValue);
      onAddNodes(nodeValue); // Adjusted to handle a single number
      setInputValue(''); // Reset the input field
    } else {
      console.error('Invalid or empty numeric value:', inputValue);
    }
  };
  
TreeInputForm.propTypes = {
   onAddNodes: PropTypes.func.isRequired,
   onRandom: PropTypes.func.isRequired,
   nodes: PropTypes.array,
};

  return (
    <div className="px-8 mb-32">
        <div className='flex justify-around items-center w-full my-8'>
            <div className='flex-1'>
                <div className='flex justify-start'>
                    <div>
                        <h3 className='mb-4 font-semibold'>{"Select a Tree, please"}</h3>
                        <p>{descriptions.binary}</p>
                    </div>
                </div>
            </div>
            <div className='flex-1'>
                <div className='flex justify-start'>
                    <div>
                        <h3 className='mb-4 font-semibold'>Your nodes</h3>
                        <p>{nodes.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter node values separated by commas"
          className="p-2 border rounded mb-8"
        />
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="bg-navyBlue text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Add Nodes
          </button>
          <button
            type="button"
            onClick={onRandom}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Generate Random Tree
          </button>
        </div>
      </form>
    </div>
  );
};

export default TreeInputForm;