import { IoIosSearch as SearchIcon } from "react-icons/io";

const SearchBar = () => {
  return (
    <div className="
      h-12 flex flex-row items-center pr-6
      bg-[#e9eef6] rounded-[24px] text-gray-700
      min-w-[240px]
    ">
      <div className="
        cursor-pointer hover:bg-gray-300 rounded-full ml-[6px] p-[6px] mr-1
      ">
        <SearchIcon className="
          w-6 h-6
        "/>
      </div>
      <input
        placeholder="Search mail"
        className="
          placeholder:text-gray-500
          w-full outline-none
        "
      />
    </div>
  )
}

export default SearchBar