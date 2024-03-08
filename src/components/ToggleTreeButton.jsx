import PropTypes from 'prop-types';

const ToggleTreeButton = ({ treeOption, isActive, onTreeModelChange }) => {
  const handleChange = () => {
    onTreeModelChange(treeOption);
  };

  return (
    <>
      <label className='flex cursor-pointer select-none items-center'>
        <p className='mx-2'>{treeOption.title}</p>
        <div className='relative'>
          <input
            type='checkbox'
            checked={isActive}
            onChange={handleChange} // Use handleChange here
            className='sr-only'
          />
          <div className={`block h-8 w-14 rounded-full transition-colors ${isActive ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
          <div className={`dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition transform ${isActive ? 'translate-x-6' : ''}`}></div>
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
