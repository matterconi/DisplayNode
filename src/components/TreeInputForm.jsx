import { useState } from 'react';
import PropTypes from 'prop-types';

const TreeInputForm = ({ onAddNodes, onRandom, onClearNodes, nodes, activeTreeModel }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInputValue = inputValue.trim();

    // Handle binary tree case: accept only numbers
    if (activeTreeModel.value === 'binary') {
        if (trimmedInputValue !== '' && !isNaN(Number(trimmedInputValue))) {
            const nodeValue = Number(trimmedInputValue);
            onAddNodes(nodeValue); // Adjusted to handle a single number
            setInputValue(''); // Reset the input field
        } else {
            console.error('Invalid or empty numeric value for binary tree:', inputValue);
        }
    }
    // Handle merkle tree case: accept any string
    else if (activeTreeModel.value === 'merkle') {
        if (trimmedInputValue !== '') {
            onAddNodes(trimmedInputValue); // Here, nodeValue is a string
            setInputValue(''); // Reset the input field
        } else {
            console.error('Invalid or empty value for merkle tree:', inputValue);
        }
    }
  };

  return (
    <div className="px-8 my-8 lg:my-16">
      <div className='flex flex-col lg:flex-row justify-around items-center w-full my-8 lg:my-16'>
        {/* Tree Model Display */}
        <div className='w-full max-w-md mx-auto mb-4 lg:mb-0'>
          <div className='flex justify-start'>
            <div className='bg-white bg-opacity-20 border border-gray-200 rounded-lg p-4 shadow-sm w-full min-h-[200px]'>
              <h3 className='mb-4 font-semibold text-center'>{activeTreeModel ? activeTreeModel.title : "Select a Tree, please"}</h3>
              <p>{activeTreeModel ? activeTreeModel.description : "Select a Tree to visualize"}</p>
            </div>
          </div>
        </div>
        {/* Nodes Display */}
        <div className='w-full max-w-md mx-auto'>
          <div className='flex justify-start'>
            <div className='bg-white bg-opacity-20 border border-gray-200 rounded-lg p-4 shadow-sm w-full min-h-[200px]'>
              <h3 className='mb-4 font-semibold text-center'>Your nodes</h3>
              <p>{nodes.length > 0 ? nodes.join(', ') : activeTreeModel ? "Add nodes" : "Select a tree to add nodes"}</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-2 items-center mb-16">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter node values separated by commas"
          className="custom-input mb-8 lg:mb-16 w-full"
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
          {/* Clear All Nodes Button */}
          <button
            type="button"
            onClick={onClearNodes} // Assuming onClearNodes is a function passed as a prop
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Clear All Nodes
          </button>
        </div>
      </form>
    </div>
  );
};

TreeInputForm.propTypes = {
  onAddNodes: PropTypes.func.isRequired,
  onRandom: PropTypes.func.isRequired,
  onClearNodes: PropTypes.func, // Added propTypes for onClearNodes
  nodes: PropTypes.array,
  activeTreeModel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
};

export default TreeInputForm;