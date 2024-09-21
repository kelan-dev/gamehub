import css from "./ColorSchemeToggle.module.css";
import useLocalStorage from "use-local-storage";
import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect } from "react";

interface Props {
  className?: string;
}

export default function ColorSchemeToggle({ className }: Props) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [scheme, setScheme] = useLocalStorage(
    "scheme",
    prefersDark ? "dark" : "light"
  );

  const setSchemeAttribute = (scheme: string) => {
    document.documentElement.dataset.scheme = scheme;
  };

  const handleClick = () => {
    setScheme(scheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setSchemeAttribute(scheme);
  }, [scheme]);

  return (
    <div className={className}>
      <button
        className={css.toggle}
        aria-label="Change color scheme"
        onClick={handleClick}
      >
        {scheme === "light" && <Moon size="24" weight="fill" />}
        {scheme === "dark" && <Sun size="24" weight="fill" />}
      </button>
    </div>
  );
}
