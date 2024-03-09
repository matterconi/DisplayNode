import { useState } from 'react';
import { treeFactory } from './utils';

import Navbar from './components/Navbar';
import TreeInputForm from './components/TreeInputForm';
import TreeVisualization from './components/BinaryTreeVisualization';
import Search from './components/Search';
import Footer from './components/Footer';

const App = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [nodes, setNodes] = useState([]);
  const [tree, setTree] = useState(null); // Changed Tree to BinaryTree
  const [activeTreeModel, setActiveTreeModel] = useState(null);

  const handleTreeModelChange = (model) => {
    setActiveTreeModel(model);
    setNodes([]); // Reset nodes state
    setTree(model ? treeFactory(model.value) : null); // Reset tree state
  };

  const onSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  const onRandom = () => {
    if(!activeTreeModel) return null;
    const [randomTree, randomNodes] = tree.generateRandomTree();
    
    setNodes(randomNodes); // Update nodes state
    // Use `randomNodes` directly to generate the new tree
    setTree(randomTree); // Update tree state, changed Tree to BinaryTree
    setSearchQuery(''); // Reset search query
  };

  const onAddNode = (nodeValue) => {
    if (!activeTreeModel) return null;

    // When activeTreeModel is 'binary', ensure input is a number
    if (activeTreeModel.value === 'binary') {
        // Parse the nodeValue as a float to accommodate both integers and floating-point numbers
        const parsedValue = parseFloat(nodeValue);
        // Check if the value is a number and not already included in the nodes
        if (!isNaN(parsedValue) && !nodes.includes(parsedValue)) {
            const newTree = tree.clone(); // Clone the existing tree to create a new instance
            newTree.addNode(parsedValue); // Add the new node to the tree

            setNodes([...nodes, parsedValue]); // Update the nodes array state
            setTree(newTree); // Update the tree state
            setSearchQuery(''); // Optionally reset the search query if needed
        } else {
            console.error('Invalid or duplicate numeric value:', nodeValue);
        }
    }
    // When activeTreeModel is 'merkle', accept any string except duplicates
    else if (activeTreeModel.value === 'merkle') {
        if (typeof nodeValue === 'string' && nodeValue.trim() !== '' && !nodes.includes(nodeValue)) {
            const newTree = tree.clone(); // Clone the existing tree to create a new instance
            newTree.addNode(nodeValue.trim()); // Add the new node to the tree

            setNodes([...nodes, nodeValue.trim()]); // Update the nodes array state
            setTree(newTree); // Update the tree state
            setSearchQuery(''); // Optionally reset the search query if needed
            console.log(newTree)
        } else {
            console.error('Invalid or duplicate string value:', nodeValue);
        }
    }
  };


  const onClearNodes = () => {
    setNodes([]); // Reset nodes state
    setTree(activeTreeModel ? treeFactory(activeTreeModel.value) : null); // Reset tree state, changed Tree to BinaryTree
    setSearchQuery(''); // Reset search query
  };

  return (
    <div className='flex flex-col justify-between min-h-screen font-code'>
      <div>
        <Navbar onTreeModelChange={handleTreeModelChange} />
        <TreeInputForm onAddNodes={onAddNode} onRandom={onRandom} nodes={nodes} activeTreeModel={activeTreeModel} onClearNodes={onClearNodes}/>
        <TreeVisualization tree={tree} search={searchQuery} activeTreeModel={activeTreeModel}/>
        <Search onSearch={onSearch}/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
