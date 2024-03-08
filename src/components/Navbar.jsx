import { useState } from "react";
import ToggleTreeButton from "./ToggleTreeButton";
import { treeOptions } from "../constants";

const Navbar = () => {
    const [activeSwitchId, setActiveSwitchId] = useState(null);

    const handleCheckboxChange = (index) => {
        if (activeSwitchId === index) {
            setActiveSwitchId(null);
            return;
        }
        setActiveSwitchId(index);
    };

    return (
      <nav className="bg-navyBlue px-8 py-4 text-white flex justify-between items-end font-code">
        <div className="text-lg flex items-center font-semibold ">DisplayTree <div><p className="mx-4 text-sm text-yellow-400 ">(Have you selected a Tree?)</p></div> </div>
        <ul className="flex space-x-4">
          {treeOptions.map((treeOption, index) => (
            <li key={index}>
              <ToggleTreeButton treeOption={treeOption} isActive={activeSwitchId === index} onClick={() => handleCheckboxChange(index)}/>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default Navbar;