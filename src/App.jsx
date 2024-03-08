import { useState } from 'react';
import { Tree, generateRandomTree } from './utils';

import Navbar from './components/Navbar';
import TreeInputForm from './components/TreeInputForm';
import BinaryTreeVisualization from './components/BinaryTreeVisualization';
import Search from './components/Search';
import Footer from './components/Footer';

const App = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [nodes, setNodes] = useState([]);
  const [tree, setTree] = useState(new Tree());

  const onSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  const onRandom = () => {
    const randomNodes = [];
    for (let i = 0; i < 20; i++) {
      const randomNumber = Math.floor(Math.random() * 100);
      if(!randomNodes.includes(randomNumber)){
        randomNodes.push(randomNumber);
      }
    }
    setNodes(randomNodes); // Update nodes state

    // Use `randomNodes` directly to generate the new tree
    const randomTree = generateRandomTree(randomNodes);
    setTree(randomTree); // Update tree state
    setSearchQuery(''); // Reset search query
};

const onAddNode = (nodeValue) => {
  // Check if nodeValue is not a number, is empty, or is undefined before proceeding.
  // Additionally, check to ensure it doesn't default to 0 in case of an empty submission.
  if (isNaN(nodeValue) || nodeValue === '' || nodeValue === undefined) return;
  console.log('Adding node:', nodeValue);
  // Prevent adding a node if the value already exists in the nodes array
  if (nodes.includes(nodeValue)) return;

  const newTree = tree.clone(); // Clone the existing tree to create a new instance
  newTree.addNode(nodeValue); // Add the new node to the tree
  
  setNodes([...nodes, nodeValue]); // Update the nodes array state
  setTree(newTree); // Update the tree state with the new tree instance
  setSearchQuery(''); // Optionally reset the search query if needed
};


  return (
    <div className='flex flex-col justify-between min-h-screen font-code'>
      <div>
        <Navbar />
        <TreeInputForm onAddNodes={onAddNode} onRandom={onRandom} nodes={nodes}/>
        <BinaryTreeVisualization tree={tree} search={searchQuery}/>
        <Search onSearch={onSearch}/>
      </div>
      <Footer />
    </div>
  );
  
}

export default App;