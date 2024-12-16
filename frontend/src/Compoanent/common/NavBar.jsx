import  { useEffect, useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineClose,
} from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { EcoState } from "../../Context/EcoProvider";
import { useWindowSize } from "@react-hook/window-size";
import { RiAccountCircleFill } from "react-icons/ri";
import { BsMinecart } from "react-icons/bs";
import { IoMdPeople } from "react-icons/io";
function NavBar() {
  const navigate = useNavigate();
  const { setSearchData, allProduct } = EcoState();
  const [nav, setNav] = useState(false);

  const [isSearch, setIsSreach] = useState(false);
  const [screenH, screenW] = useWindowSize();

  const goToCart = () => {
    navigate("/cart");
  };

  const onSearch = (name) => {
    const searchStr = name.toLowerCase();
    setSearchData(
      allProduct.filter((item) => {
        const itemName = item.title.toLowerCase();
        return itemName.startsWith(searchStr);
      })
    );
  };

  const onLinkTo = (id) => {
    navigate(`/#${id}`);
  };

  const onShowSearch = () => {
    if (!isSearch) setIsSreach(true);
    else setIsSreach(false);
  };

  useEffect(() => {
    if (screenH >= 815 && screenW >= 940) {
      setIsSreach(true);
    }
  }, []);

  return (
    <div className="w-full flex justify-center h-20 fixed start-0 top-0 end-0  z-50  text-white ">
      <div
        className=" container flex items-center justify-between bg-slate-700 
         w-full"
      >
        <div className=" flex  items-center ">
          <div className=" flex items-center md:hidden">
            {
              <AiOutlineMenu
                size={20}
                className="  px-2"
                onClick={() => {
                  setNav(true);
                }}
              />
            }
          </div>
          <a
            href="/"
            className=" text-3xl italic font-bold  px-3 hidden xl:flex uppercase "
          >
            Shop Onlay
          </a>
        </div>
        <div className=" bg-slate-600 w-1/3 rounded-full h-fit  flex items-center  p-2 space-x-1">
          <AiOutlineSearch
            size={20}
            className=" hidden sm:flex "
            onClick={() => onShowSearch()}
          />

          <input
            onChange={(e) => {
              onSearch(e.target.value);
            }}
            type="text"
            className="outline-none bg-transparent rounded-md p-1  "
            placeholder="Search for product "
          />
        </div>
        <div className=" flex px-1 sm:px-5 items-center gap-2 ">
          <div className=" hidden md:flex items-center  ">
            {/* <a
              href="#home"
              onClick={() => onLinkTo("home")}
              className=" mx-5   rounded-lg hover:underline
                hover:hover:underline-offset-4   p-1  text-center"
            >
              Home
            </a>
            <a
              href="#about"
              className="  mx-5  rounded-lg hover:underline
                hover:underline-offset-4   p-1  text-center"
            >
              About
            </a>
            <a
              href="#shop"
              className=" mx-5  rounded-lg hover:underline
               hover:underline-offset-4   p-1  text-center"
            >
              Shop
            </a>
            <a
              href="#contact"
              className="   rounded-lg hover:underline
               hover:underline-offset-4   p-1  text-center"
            >
              Contact
            </a> */}
          </div>

          <button
            onClick={() => {
              goToCart();
            }}
            className="   rounded-lg flex 
                 mx-2 p-1
                 text-center
                px-3 md:flex items-center"
          >
            <span className="md:flex hidden"></span>
            <BsMinecart size={25} className="" />
          </button>
          <a href="/login" className="">
            <IoMdPeople size={25} className="m" />
          </a>
        </div>

        {nav ? (
          <div className="fixed h-screen w-full bg-black/80 top-0 left-0 z-50"></div>
        ) : (
          ""
        )}

        {nav ? (
          <div className="max-w-[350px] h-screen fixed top-0 left-0 z-50  px-1 ">
            <div className=" py-2 flex items-center justify-between ">
              <h1 className="lg:text-2xl text-gray-900 font-medium flex items-center">
                <FaUser size={20} className="mx-3" />
                My Account{" "}
              </h1>
              <AiOutlineClose
                size={25}
                className="mx-2   md:text-2xl font-bold"
                onClick={() => {
                  setNav(false);
                }}
              />
            </div>

            <div className="">
              <div className="space-y-2 flex flex-col">
                <a
                  href="#home"
                  onClick={() => onLinkTo("home")}
                  className="    rounded-lg
             p-1  "
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="  rounded-lg
                   p-1  "
                >
                  About
                </a>
                <a
                  href="#shop"
                  className="   rounded-lg
                  p-1  "
                >
                  Shop
                </a>
                <a
                  href="#contact"
                  className="   rounded-lg
                 p-1 "
                >
                  Contact
                </a>
              </div>

              {/* <h1 className=' pt-3 font-bold text-xl'>Categories</h1>
               {
                  category.map((item, i) => {
                     return (<div key={i} className='text-xl text-gray-500 flex justify-between items-center hover:  py-2'
                        onClick={() => { onSetCategory(item.name) }}>
                        <p>{item}</p> <AiFillCaretRight /></div>)
                  })
               } */}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default NavBar;
