import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { FaBlog } from "react-icons/fa";

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

export default function PublicNavbar() {
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
                  {/* Custom Logo */}
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
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Link
                    to="/register"
                    className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-pink-600 hover:to-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 transition-all duration-200"
                  >
                    <FaRegUser className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="relative ml-3 inline-flex items-center gap-x-1.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-green-600 hover:to-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 animate-pulse duration-3000"
                  >
                    <RiLoginCircleLine
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                    Login
                  </Link>
                </div>
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  <button
                    type="button"
                    className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <span className="absolute -inset-1.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

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

              <Link to="/register">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-pink-500 hover:bg-gray-100 hover:text-pink-700 w-full text-left transition-colors duration-200"
                >
                  Register
                </Disclosure.Button>
              </Link>
              <Link to="/login">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-green-500 hover:bg-gray-100 hover:text-green-700 w-full text-left transition-colors duration-200"
                >
                  Login
                </Disclosure.Button>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}