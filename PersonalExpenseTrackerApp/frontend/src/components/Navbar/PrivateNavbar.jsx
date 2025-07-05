import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { logoutAction } from "../../redux/slice/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Custom Logo Component
const WalletoLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="h-10 w-10">
    {/* Circle background */}
    <circle cx="100" cy="100" r="90" fill="#10B981" />
    
    {/* White overlay for depth */}
    <circle cx="100" cy="100" r="85" fill="#ffffff" opacity="0.1" />
    
    {/* Inner shadow */}
    <circle cx="100" cy="100" r="80" fill="#10B981" />
    
    {/* Stylized W symbol */}
    <path d="M60,70 C70,60 80,80 90,70 C100,60 110,80 120,70 C130,60 140,80 150,70 L140,130 C130,120 120,140 110,130 C100,120 90,140 80,130 C70,120 60,140 50,130 Z" fill="white" />
    
    {/* Highlight */}
    <circle cx="70" cy="70" r="15" fill="white" opacity="0.2" />
  </svg>
);

export default function PrivateNavbar() {
  //Dispatch
  const dispatch = useDispatch();
  //Logout handler
  const logoutHandler = () => {
    dispatch(logoutAction());
    //remove the user from storage
    localStorage.removeItem("userInfo");
  };

  return (
    <Disclosure as="nav" className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 justify-between items-center">
              <div className="flex items-center">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-all duration-200">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  {/* Logo */}
                  <WalletoLogo />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link
                    to="/"
                    className="inline-flex items-center border-b-2 border-green-500 px-1 pt-1 text-lg font-medium text-gray-900 hover:text-green-700 transition-colors duration-200"
                  >
                    Walleto
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-6">
                  <Link
                    to="/add-transaction"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-600 hover:border-green-400 hover:text-green-700 transition-colors duration-200"
                  >
                    Add Transaction
                  </Link>
                  <Link
                    to="/add-category"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-600 hover:border-green-400 hover:text-green-700 transition-colors duration-200"
                  >
                    Add Category
                  </Link>
                  <Link
                    to="/categories"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-600 hover:border-green-400 hover:text-green-700 transition-colors duration-200"
                  >
                    Categories
                  </Link>
                  <Link
                    to="/profile"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-600 hover:border-green-400 hover:text-green-700 transition-colors duration-200"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-600 hover:border-green-400 hover:text-green-700 transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                  <button
                    onClick={logoutHandler}
                    type="button"
                    className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                  >
                    <IoLogOutOutline className="h-5 w-5" aria-hidden="true" />
                    <span>Logout</span>
                  </button>
                </div>
                <div className="hidden md:ml-1 md:flex md:flex-shrink-0 md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-1">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/student-dashboard"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 hover:text-green-700 transition-colors duration-200"
                              )}
                            >
                              My Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logoutHandler}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 hover:text-red-700 transition-colors duration-200 w-full text-left"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Navs  private links*/}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2 bg-gray-50">
              <Link to="/">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-green-500 py-2 pl-3 pr-4 text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 hover:text-green-700 w-full text-left transition-colors duration-200"
                >
                  Walleto
                </Disclosure.Button>
              </Link>
              <Link to="/add-transaction">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-green-400 hover:bg-gray-100 hover:text-green-700 w-full text-left transition-colors duration-200"
                >
                  Add Transaction
                </Disclosure.Button>
              </Link>
              <Link to="/add-category">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-green-400 hover:bg-gray-100 hover:text-green-700 w-full text-left transition-colors duration-200"
                >
                  Add Category
                </Disclosure.Button>
              </Link>
              <Link to="/categories">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-green-400 hover:bg-gray-100 hover:text-green-700 w-full text-left transition-colors duration-200"
                >
                  Categories
                </Disclosure.Button>
              </Link>
              <Link to="/profile">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-green-400 hover:bg-gray-100 hover:text-green-700 w-full text-left transition-colors duration-200"
                >
                  Profile
                </Disclosure.Button>
              </Link>
              <Link to="/dashboard">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-green-400 hover:bg-gray-100 hover:text-green-700 w-full text-left transition-colors duration-200"
                >
                  My Dashboard
                </Disclosure.Button>
              </Link>
            </div>
            {/* Profile links */}
            <div className="border-t border-gray-200 pb-3 pt-4 bg-gray-50">
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="button"
                  onClick={logoutHandler}
                  className="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-red-700 w-full text-left transition-colors duration-200"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}