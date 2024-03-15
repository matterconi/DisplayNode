import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const maxNodesConfig = {
  mobile: {
    binary: 5,
    merkle: 4,
    patricia: 4,
  },
  tablet: {
    binary: 16,
    merkle: 8,
    patricia: 12,
  },
  pc: {
    binary: 20,
    merkle: 10,
    patricia: 16,
  },
};

const TreeSettings = ({ onUpdateSettings, treeModel }) => {
    const [settings, setSettings] = useState({
      maxNodes: 10,
      patriciaPrefix: '',
      animationSpeed: 1,
    });
  
    useEffect(() => {
      const handleResize = () => {
        let deviceType;
        if (window.innerWidth < 768) {
          deviceType = 'mobile';
        } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
          deviceType = 'tablet';
        } else {
          deviceType = 'pc';
        }
    
        const newMaxNodes = maxNodesConfig[deviceType][treeModel?.value] || 10;
    
        setSettings(prevSettings => ({
          ...prevSettings,
          maxNodes: newMaxNodes,
          patriciaPrefix: treeModel?.value === 'patricia' ? prevSettings.patriciaPrefix : '',
        }));
      };
    
      window.addEventListener('resize', handleResize);


      // Call handleResize initially to set the correct maxNodes based on the current viewport and tree model
      handleResize();
    
      return () => window.removeEventListener('resize', handleResize);
    }, [treeModel?.value]); // Make sure to add treeModel.value as a dependency
  
    useEffect(() => {
      onUpdateSettings(settings);
    }, [settings, onUpdateSettings]);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
    
      // Update settings for any input
      let updatedValue = value;
    
      // Specifically handle the case for animationSpeed
      if (name === 'animationSpeed') {
        const speedMultiplier = parseFloat(value); // Properly parse the incoming string as a float
        const newDuration = `${2.5 / speedMultiplier}s`;
    
        // Update the CSS variable for animation speed
        document.documentElement.style.setProperty('--animation-speed', newDuration);
    
        // Use the parsed float for the state update
        updatedValue = speedMultiplier;
      }
    
      // Update state with the new value, which is either the updated animation speed or the original value
      setSettings(prevSettings => ({
        ...prevSettings,
        [name]: updatedValue,
      }));
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      onUpdateSettings(settings);
    }
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4 mx-8 flex flex-col mt-16">

        <div>
          <label htmlFor="currentNodes" className="block text-sm font-medium text-gray-700">Set max number of nodes (default values are already provided) </label>
          <input
            type="number"
            id="maxNodes"
            name="maxNodes"
            value={settings.maxNodes} // Ensure this is controlled by adding || ''
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {treeModel?.value === 'patricia' && <div>
        <label htmlFor="patriciaPrefix" className="block text-sm font-medium text-gray-700">Patricia Prefix</label>
        <input
          type="text"
          id="patriciaPrefix"
          name="patriciaPrefix"
          value={settings.patriciaPrefix || ''} // Provide '' as a fallback
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
        </div>}

        <div>
            <label htmlFor="animationSpeed" className="block text-sm font-medium text-gray-700">Animation Speed</label>
            <input
            type="range"
            id="animationSpeed"
            name="animationSpeed"
            value={settings.animationSpeed}
            onChange={handleInputChange}
            min="0.1" // Adjust as needed
            max="2" // Adjust as needed
            step="0.1"
            className="mt-1 block w-full"
            />
            <div className="text-right text-xs">{settings.animationSpeed}x</div>
        </div>
      </form>
    );
  };

TreeSettings.propTypes = {
    onUpdateSettings: PropTypes.func.isRequired,
    treeModel: PropTypes.object,
 };

export default TreeSettings;