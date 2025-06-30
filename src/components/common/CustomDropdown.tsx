import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/solid";

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CustomDropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full cursor-pointer rounded-lg bg-white py-3 pl-4 pr-10 text-left border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
      >
        <span className="block truncate">
          {selectedOption ? (
            selectedOption.label
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDownIcon
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-900 hover:bg-green-100"
            >
              <span
                className={`block truncate ${
                  option.value === value ? "font-semibold" : "font-normal"
                }`}
              >
                {option.label}
              </span>
              {option.value === value && (
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                  <CheckIcon className="h-5 w-5" />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
