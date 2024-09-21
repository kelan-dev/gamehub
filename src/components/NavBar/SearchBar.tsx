import { useRef } from "react";
import css from "./SearchBar.module.css";
import clsx from "clsx";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useGameListQuerySubscription } from "../../stores/GameListQueryStore";
import { useHotkeys } from "react-hotkeys-hook";

interface Props {
  className?: string;
  onFocus?: () => void;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onSubmit?: (value: string) => void;
}

export default function SearchBar({
  className,
  onFocus,
  onChange,
  onBlur,
  onSubmit,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useHotkeys("alt+enter", () => inputRef.current?.focus());

  useGameListQuerySubscription({
    onReset: () => {
      if (inputRef.current) inputRef.current.value = "";
    },
  });

  return (
    <div className={clsx(css.container, className)}>
      <form
        className={css.form}
        role="search"
        {...(onSubmit && {
          onSubmit: (event) => {
            event.preventDefault();
            onSubmit(inputRef.current?.value ?? "");
            inputRef.current?.blur();
          },
        })}
      >
        <span className={css.icon}>
          <MagnifyingGlass />
        </span>
        <input
          className={css.input}
          ref={inputRef}
          type="text"
          placeholder="Search"
          role="searchbox"
          {...(onBlur && { onBlur })}
          {...(onFocus && { onFocus })}
          {...(onChange && {
            onChange: (event) => onChange(event.target.value),
          })}
        />
        <div className={css.hotkey}>
          <code className={css.code}>
            <kbd className={css.key}>alt</kbd>
            <kbd> + </kbd>
            <kbd className={css.key}>enter</kbd>
          </code>
        </div>
      </form>
    </div>
  );
}
