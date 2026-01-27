import { FaSearch } from "react-icons/fa";
function SearchBar({value,onChange}) {
    
  return (
    <>
      <div className="relative">
        <div className="flex items-center h-full pl-4 text-gray-400">
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded text-text-light dark:text-text-light bg-bg-light dark:bg-bg-dark dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type..."
            value={value}
            onChange={onChange}
          />

          <button
            type="submit"
            className="m-4 text-text-light dark:text-text-dark bg-bg-light dark:bg-bg-dark focus:outline-none"
          >
            <FaSearch size={18} />
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
