import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TreeInputForm = ({ onAddNodes, onRandom, onClearNodes, onGetProof,  nodes, activeTreeModel, onSearch, ontoggleAnimation, isAnimationActive }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue('');
  }, [activeTreeModel]);

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
    // Handle patricia tree case: accept any non-empty string, similar to merkle tree
    else if (activeTreeModel.value === 'patricia') {
        if (trimmedInputValue !== '') {
            onAddNodes(trimmedInputValue); // Here, nodeValue is also a string
            setInputValue(''); // Reset the input field
        } else {
            console.error('Invalid or empty value for patricia tree:', inputValue);
        }
    }
  };

  const resetInputAndExecute = (callback = null) => () => {
    setInputValue(''); // Reset the input field
    if (callback) {
        callback(inputValue); // Pass inputValue if the callback requires it
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

      <form onSubmit={handleSubmit} className="flex flex-col space-y-2 items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter node values separated by commas"
          className="custom-input mb-8 lg:mb-16 w-full"
        />

        <div className="flex flex-wrap justify-center gap-4 mt-32">
          <button
            type="submit"
            className="bg-navyBlue text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Add Nodes
          </button>
          <button
            type="button"
            onClick={resetInputAndExecute(onRandom)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Generate Random Tree
          </button>
          <button
            type="button"
            onClick={resetInputAndExecute(onClearNodes)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Clear All Nodes
          </button>
          {activeTreeModel?.value === 'merkle' && <button
            type="button"
            onClick={resetInputAndExecute(() => onGetProof(inputValue))}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
          >
            Get Proof
          </button>}
          <button
            type="button"
            onClick={resetInputAndExecute(() => onSearch(inputValue))}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 transition duration-300"
          >
            Search
          </button>
          <button
            type="button"
            onClick={ontoggleAnimation}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
          >
            {isAnimationActive ? 'Stop Animation' : 'Start Animation'}
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
  onGetProof: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  ontoggleAnimation: PropTypes.func.isRequired,
  isAnimationActive: PropTypes.bool.isRequired,
};

export default TreeInputForm;