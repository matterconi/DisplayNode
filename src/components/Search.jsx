import PropTypes from 'prop-types';
import { useState } from 'react'

const Search = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Trigger search logic passed from parent component
        onSearch(searchQuery);
    };

    return (
        <div className="flex flex-col justify-center items-center m-8 mt-8 lg:mt-16">
            <input
                type="text"
                placeholder="Search for a node..."
                className="custom-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
                onClick={handleSearch}
                className="bg-navyBlue text-white px-4 py-2 my-8 lg rounded hover:bg-blue-700 transition duration-300"
            >
                Search
            </button>
        </div>
    )
}

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
};
export default Search