import PropTypes from 'prop-types';
import { useState } from 'react'

const Search = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Trigger search logic passed from parent component
        onSearch(searchQuery);
    };

    return (
        <div className="flex flex-col justify-center items-center m-8 mt-16">
            <input
                type="text"
                placeholder="Search for a node..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
                onClick={handleSearch}
                className="search-button mt-8"
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