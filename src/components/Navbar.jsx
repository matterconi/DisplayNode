import { useState } from "react";
import ToggleTreeButton from "./ToggleTreeButton";
import { treeOptions } from "../constants";
import PropTypes from 'prop-types';

const Navbar = ({ onTreeModelChange }) => {
  // Initialize activeModel to null to clearly represent no selection
  const [activeModel, setActiveModel] = useState(null);

  const handleTreeSelectionChange = (newModel) => {
    // Check if the new model is the same as the active model using optional chaining
    const isActive = newModel.title === activeModel?.title;
    // Toggle active model based on comparison; set to null if deselecting
    setActiveModel(isActive ? null : newModel);
    // Invoke the callback with either null (deselecting) or the new model
    onTreeModelChange(isActive ? null : newModel);
  };

  return (
    <nav className="bg-navyBlue px-8 py-4 text-white flex justify-between items-end font-code">
      <div className="text-lg flex items-center font-semibold">DisplayTree
        {/* Use optional chaining and a ternary operator for conditional class application */}
        <p className={`mx-4 text-xs text-yellow-400 ${activeModel ? 'invisible' : 'visible'}`}>
          (Have you selected a Tree?)
        </p>
      </div>
      <ul className="flex space-x-4">
        {treeOptions.map((treeOption) => (
          <li key={treeOption.title}> {/* Assume treeOption has a unique title for key */}
            <ToggleTreeButton 
              treeOption={treeOption} 
              // Check active state by comparing titles, safely handling null
              isActive={treeOption.title === activeModel?.title}
              onTreeModelChange={handleTreeSelectionChange}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
  
Navbar.propTypes = {
  onTreeModelChange: PropTypes.func.isRequired,
};

export default Navbar;
