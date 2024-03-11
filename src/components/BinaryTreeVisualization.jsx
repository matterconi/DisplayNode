import PropTypes from 'prop-types';

const BinaryTreeNode = ({ node, search }) => {
  
  if(!node) return (<div className='flex items-center justify-center bg-navyBlue text-white rounded-md m-1 w-12 h-8'>Root</div>);
  let isSearchMatch = false;

  if (search || search === 0) {
     isSearchMatch = node.data === Number(search);
  }
  
  // TailwindCSS classes for the number box
  const boxClasses = `flex justify-center items-center ${isSearchMatch ? 'bg-yellow-200' : 'bg-navyBlue'} text-white rounded-md m-1 w-12 h-8`;

  // Check if the node has only one child (either left or right)
  const hasOnlyOneChild = (node.left && !node.right) || (!node.left && node.right);

  return (
    <div className="flex flex-col items-center animate-wave">
      <div className={boxClasses}>
        {node.data}
      </div>
      <div className={`flex ${hasOnlyOneChild ? 'justify-center' : 'justify-between'}`}>
        {/* Render left child or an invisible placeholder if it's an only child for alignment */}
        {node.left ? (
          <div className={`${!node.right ? 'flex-1' : ''}`}>
            <BinaryTreeNode node={node.left} search={search} />
          </div>
        ) : hasOnlyOneChild ? <div className="w-12"></div> : null}
        {/* Render right child or an invisible placeholder if it's an only child for alignment */}
        {node.right ? (
          <div className={`${!node.left ? 'flex-1' : ''}`}>
            <BinaryTreeNode node={node.right} search={search} />
          </div>
        ) : hasOnlyOneChild ? <div className="w-12"></div> : null}
      </div>
    </div>
  );
};

// MerkleTreeNode

const MerkleTreeNode = ({ tree, search, proof }) => {
  // Ensure tree.tree is accessed correctly for the layers
  if (!tree || !tree.leaves || tree.leaves.length === 0) {
    return (<div className='flex items-center justify-center bg-navyBlue text-white rounded-md m-1 w-12 h-8'>Root</div>);
  }
  const hashedSearch = tree.search(search);

  // Using the same TailwindCSS classes for styling as BinaryTreeNode

  return (
    <div className="flex flex-col items-center">
    {!tree.tree && <div>Root</div>}
      {tree.tree.map((layer, index) => (
        <div key={index} className="flex justify-center flex-wrap">
          {layer.map((node, nodeIndex) => {
            const isSearchMatch = hashedSearch === node;
            const isProofMatch = proof?.includes(node);
            const boxClasses = `flex justify-center items-center ${isSearchMatch || isProofMatch ? 'bg-yellow-200' : 'bg-navyBlue'} text-white rounded-md m-1 w-12 h-8`;
            return (
                <div key={nodeIndex} className={`${boxClasses} animate-wave`}>
                {/* Display only the first 2 characters of each hash to keep it short */}
                {node.substring(0, 2)}
              </div>
              )
          })}
        </div>
      ))}
    </div>
  );
};

// PatriciaTreeNode

const PatriciaTreeNode = ({ nodes, searchPathKeys }) => {

  return (
    <div className="flex items-center justify-center">
      {nodes.map((node, index) => {
        const isSearchMatch = searchPathKeys.includes(node.key); // Highlight nodes part of the search path
        const boxClasses = `flex justify-center items-center ${isSearchMatch ? 'bg-yellow-200' : 'bg-navyBlue'} text-white rounded-md m-1 w-12 h-8`;

        return (
          <div key={index} className="flex flex-col items-center my-2">
            {node.key && <div className={boxClasses}>
              {node.key ? node.key : 'Root'}
            </div>}
            {Object.keys(node.children).length > 0 && (
              <div className="flex flex-col items-center justify-center">
                <PatriciaTreeNode nodes={Object.values(node.children)} searchPathKeys={searchPathKeys} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}; 

// Assuming the search feature is used to populate an array of keys that form the search value
const PatriciaTreeComponent = ({ tree, search }) => {
  let searchPathKeys = [];
  const isEmptyTree = Object.keys(tree.root.children).length === 0;

  if (tree && search) {
    const searchResults = tree.searchPath(search);
    searchPathKeys = searchResults.map(node => node.key);
  }
  return (
    <div className="flex justify-center">
      {isEmptyTree && <div className="flex justify-center items-center bg-navyBlue text-white rounded-md m-1 w-12 h-8">Root</div>}
      <PatriciaTreeNode nodes={[tree.root]} searchPathKeys={searchPathKeys} />
    </div>
  );
};

// Quartier generale

const TreeVisualization = ({ tree, search, activeTreeModel, proof }) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-center text-xl font-bold mb-8 lg:mb-16'>{activeTreeModel ? activeTreeModel.title : "Select a Tree"} </h1>
      {(activeTreeModel?.value === "binary") && <BinaryTreeNode node={tree.root} search={search} activeTreeModel={activeTreeModel}/>}
      {(activeTreeModel?.value === "merkle") && <MerkleTreeNode tree={tree} search={search} activeTreeModel={activeTreeModel} proof={proof}/>}
      {(activeTreeModel?.value === "patricia") && <PatriciaTreeComponent tree={tree} search={search} activeTreeModel={activeTreeModel} proof={proof}/>}
    </div>
  );
};

TreeVisualization.propTypes = {
   tree: PropTypes.object,
   search: PropTypes.string,
   activeTreeModel: PropTypes.object,
   proof: PropTypes.array,
};

BinaryTreeNode.propTypes = {
  node: PropTypes.object,
  search: PropTypes.string,
  activeTreeModel: PropTypes.object,
};

MerkleTreeNode.propTypes = {
  tree: PropTypes.object,
  search: PropTypes.string,
  activeTreeModel: PropTypes.object,
  proof: PropTypes.array,
};

PatriciaTreeNode.propTypes = {
  nodes: PropTypes.array,
  search: PropTypes.string,
  depth: PropTypes.number,
  searchPathKeys: PropTypes.array,
};

PatriciaTreeComponent.propTypes = {
   tree: PropTypes.object,
   search: PropTypes.string,
};
export default TreeVisualization;
