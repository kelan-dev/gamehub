import React from "react";
import { useState } from "react";
import css from "./Select.module.css";
import clsx from "clsx";
import { CaretDown, Icon } from "@phosphor-icons/react";
import { useHotkeys } from "react-hotkeys-hook";
import { HotkeysEvent } from "react-hotkeys-hook/dist/types";

export interface SelectListItem {
  value: number | string;
  label: string;
  object?: object;
}

interface Props {
  icon?: Icon;
  label: string;
  options: SelectListItem[];
  selected?: SelectListItem;
  onSelect: (selectedItem: SelectListItem) => void;
}

export default function Select({
  icon,
  label,
  options,
  selected,
  onSelect,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleBlur = () => {
    setExpanded(false);
    setFocusedIndex(-1);
  };

  const handleClick = () => {
    setExpanded(!expanded);
    setFocusedIndex(-1);
  };

  const handleSelect = (item: SelectListItem) => {
    handleBlur();
    onSelect(item);
  };

  // Keyboard accessibility
  const containerRef = useHotkeys<HTMLDivElement>(
    "enter, space, escape, up, down",
    (_event: KeyboardEvent, handler: HotkeysEvent) => {
      switch (handler.keys?.join("")) {
        case "enter":
        case "space":
          if (!expanded) {
            setExpanded(true);
            setFocusedIndex(0);
          } else {
            handleSelect(options[focusedIndex]);
          }
          break;
        case "escape":
          handleBlur();
          break;
        case "down":
          if (!expanded) {
            setExpanded(true);
            setFocusedIndex(0);
          } else {
            setFocusedIndex(Math.min(focusedIndex + 1, options.length - 1));
          }
          break;
        case "up":
          if (expanded) {
            setFocusedIndex(Math.max(focusedIndex - 1, 0));
          }
          break;
      }
    },
    { preventDefault: true },
    [expanded, focusedIndex]
  );

  return (
    <div
      ref={containerRef}
      className={css.container}
      tabIndex={0}
      onBlur={handleBlur}
    >
      <div role="button" className={css.button} onClick={handleClick}>
        {icon && React.createElement(icon, { className: css.icon })}
        <span className={css.label}>{label}</span>
        <CaretDown className={css.caret} />
      </div>
      <ul className={clsx(css.dropdown, expanded ? css.expanded : "")}>
        {options.map((item, index) => (
          <li
            key={item.value}
            onClick={() => handleSelect(item)}
            className={clsx(
              css.item,
              item.value === selected?.value ? css.selected : "",
              index === focusedIndex ? css.focused : ""
            )}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
