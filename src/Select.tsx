import React, { useEffect, useRef, useState } from "react";
import styles from "./select.module.css";

export type SelectedOption = {
  label: string;
  value: string | number;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectedOption;
  onChange: (value: SelectedOption | undefined) => void;
};

type MultiSelectProps = {
  multiple: true;
  value?: SelectedOption[];
  onChange: (value: SelectedOption[]) => void;
};

// ? all of our properties going to inlcude options but it may be SingleSelect or MultiSelect
type SelectProps = {
  options: SelectedOption[];
} & (SingleSelectProps | MultiSelectProps);

const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;

      switch (e.code) {
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "Enter":
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newVal = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newVal >= 0 && newVal < options.length) {
            setHighlightedIndex(newVal);
          }
          break;
        }

        case "ArrowUp": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newVal = highlightedIndex - (e.code === "ArrowUp" ? 1 : -1);
          if (newVal >= 0 && newVal < options.length) {
            setHighlightedIndex(newVal);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);

  const handleClear = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (option: SelectedOption) => {
    if (multiple) {
      // ! if we select same option again then remove from list
      if (value?.includes(option)) {
        onChange(value.filter((val) => val !== option));
      } else {
        // *otherwise add to list
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option); // * check for choosing same value
    }
  };

  const isOptionSelected = (option: SelectedOption) => {
    return multiple ? value?.includes(option) : option === value;
  };

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      className={styles.container}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span className={styles.values}>
        {multiple
          ? value?.map((val) => (
              <button
                key={val.value}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(val);
                }}
                className={styles.option_badge}
              >
                {val.label}
                <span className={styles.remove_btm}>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
      <button
        className={styles.clear_btn}
        onClick={(e) => {
          e.stopPropagation();
          handleClear();
        }}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>

      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            key={option.value}
            onMouseEnter={() => setHighlightedIndex(index)}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ""
            }  ${isOptionSelected(option) ? styles.selected : ""} ${
              highlightedIndex === index ? styles.highlighted : ""
            } `}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
