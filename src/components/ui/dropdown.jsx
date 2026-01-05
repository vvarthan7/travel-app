"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

const Dropdown = ({
  label,
  options,
  value,
  icon,
  onChange,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  className,
  search,
  id,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownId =
    id || `dropdown-${label?.toLowerCase().replace(/\s+/g, "-")}`;
  const selectedOption = options?.find((option) => option.value === value);

  return (
    <div className="mb-6">
      <label
        htmlFor={dropdownId}
        className="block font-normal text-sm text-gray-100 mb-2"
      >
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={dropdownId}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full flex justify-between items-start py-4 px-3.5 border border-light-400 shadow-sm h-12",
              className
            )}
          >
            {value ? (
              <div className="flex items-center justify-center gap-2 font-semibold text-sm text-dark-400">
                {icon && selectedOption?.icon && (
                  <Image
                    src={selectedOption.icon}
                    alt={`${selectedOption.label} icon`}
                    width={18}
                    height={18}
                    className="inline"
                  />
                )}
                {selectedOption?.label}
              </div>
            ) : (
              <span className="text-gray-100">
                {placeholder || "Select..."}
              </span>
            )}
            <Image
              src="/assets/icons/arrow-down.svg"
              alt="Arrow down"
              width={20}
              height={20}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[calc(var(--radix-popover-trigger-width))]">
          <Command className="w-full">
            {search && (
              <CommandInput
                placeholder={searchPlaceholder || "Search..."}
                className="h-9 placeholder:text-gray-100 text-dark-400"
              />
            )}
            <CommandList className="w-full">
              <CommandEmpty>{emptyMessage || "No item found."}</CommandEmpty>
              <CommandGroup className="w-full">
                {options?.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {option.icon && (
                      <Image
                        src={option.icon}
                        alt={`${option.label} icon`}
                        width={18}
                        height={18}
                      />
                    )}
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}{" "}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Dropdown;
