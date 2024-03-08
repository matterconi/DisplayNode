import { useState } from "react";
import ToggleTreeButton from "./ToggleTreeButton";
import { treeOptions } from "../constants";
import PropTypes from 'prop-types';

const Navbar = ({ onTreeModelChange }) => {
  const [activeModel, setActiveModel] = useState(null);

  const handleTreeSelectionChange = (newModel) => {
    const isActive = newModel.title === activeModel?.title;
    setActiveModel(isActive ? null : newModel);
    onTreeModelChange(isActive ? null : newModel);
  };

  return (
    // Use 'flex-col' for smaller screens and 'flex-row' for medium (md) screens and up
  <nav className="bg-navyBlue px-8 py-4 text-white flex flex-col md:flex-row justify-between items-center font-code">
    <div className="text-lg flex flex-col md:flex-row items-center  font-semibold mb-4 md:mb-0"> {/* Add margin-bottom on mobile */}
      DisplayTree
      <p className={`mx-4 text-xs text-yellow-400 ${activeModel ? 'invisible' : 'visible'}`}>
        (Have you selected a Tree?)
      </p>
    </div>
    <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4"> {/* Adjust spacing for vertical stack on mobile */}
      {treeOptions.map((treeOption) => (
        <li key={treeOption.title}>
          <ToggleTreeButton 
            treeOption={treeOption} 
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
