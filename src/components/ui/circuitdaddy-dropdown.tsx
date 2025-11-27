import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React from "react";

interface CircuitdaddyDropdownProps {
  options: { label: string; value: string }[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const CircuitdaddyDropdown: React.FC<CircuitdaddyDropdownProps> = ({
  options,
  placeholder = "Select",
  value,
  onChange,
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-[#147575] text-white h-[50px] w-full rounded-full border-0 ring-0 outline-none cursor-pointer placehlder:text-white">
        <SelectValue placeholder={placeholder} className="placeholder:px-2 placeholder:text-white"/>
      </SelectTrigger>
      <SelectContent className="bg-white w-full h-auto ">
        {options?.map((option) => (
          <SelectItem className="text-base font-medium text-[#0C2661] leading-[150%] cursor-pointer" key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CircuitdaddyDropdown;
