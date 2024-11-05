import { FaBell } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
const Navbar = () => {
  return (
    <div className="h-[70px] flex items-center justify-between">
      <div>
        <span className="text-2xl font-bold">Zoroz</span>
      </div>
      <div>
        <ul className="flex gap-8">
          <li className="rounded-full p-2 hover:bg-gray-200">
            <FaBell size={20}/>
          </li>
          <li className="rounded-full p-2 hover:bg-gray-200">
            <FaCartArrowDown size={20}/>
          </li>
          <li className="rounded-full p-2 hover:bg-gray-200">
            <FaRegCircleUser size={20}/>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
