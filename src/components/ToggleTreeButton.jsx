import PropTypes from 'prop-types';

const ToggleTreeButton = ({ treeOption, isActive, onTreeModelChange }) => {
  const handleChange = () => {
    onTreeModelChange(treeOption);
  };

  return (
    <>
     <label className='flex cursor-pointer select-none items-center space-x-2 md:space-x-4'>
      <p className='text-sm md:text-base'>{treeOption.title}</p>
      <div className='relative'>
        <input
          type='checkbox'
          checked={isActive}
          onChange={handleChange}
          className='sr-only'
        />
        {/* Ensure the toggle background is centered and sized */}
        <div className={`block h-8 md:h-10 w-16 md:w-20 rounded-full transition-colors ${isActive ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
        {/* Ensure the dot moves symmetrically and is centered */}
        <div className={`dot absolute left-1 md:left-1.5 top-1 md:top-1 h-6 md:h-8 w-6 md:w-8 rounded-full bg-white transition transform ${isActive ? 'translate-x-full md:translate-x-[calc(100%-1.5rem)]' : 'translate-x-0'}`}></div>
      </div>
    </label>


    </>
  );
};

ToggleTreeButton.propTypes = {
  treeOption: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  onTreeModelChange: PropTypes.func.isRequired,
};

export default ToggleTreeButton;
