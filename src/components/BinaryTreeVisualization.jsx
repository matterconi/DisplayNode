
import PropTypes from 'prop-types';

const BinaryTreeNode = ({ node, search }) => {
  
  if(!node) return null
  if(!node) return null
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

const TreeVisualization = ({ tree, search, activeTreeModel }) => {
  return (
    <div>
      <h1 className='text-center text-xl font-bold mb-16'>{activeTreeModel ? activeTreeModel.title : "Select a Tree"} </h1>
      {activeTreeModel && <BinaryTreeNode node={tree.root} search={search} activeTreeModel={activeTreeModel}/>}
    </div>
  );
};

TreeVisualization.propTypes = {
   tree: PropTypes.object,
   search: PropTypes.string,
   activeTreeModel: PropTypes.object,
};

BinaryTreeNode.propTypes = {
  node: PropTypes.object,
  search: PropTypes.string,
  activeTreeModel: PropTypes.object,
};


export default TreeVisualization;
