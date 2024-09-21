import { useState } from "react";
import css from "./NavBar.module.css";
import clsx from "clsx";
import SearchBar from "./SearchBar";
import ColorSchemeToggle from "./ColorSchemeToggle";
import { useMediaQuery } from "usehooks-ts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGameListQueryActions } from "../../stores/GameListQueryStore";

interface Props {
  className?: string;
}

export default function NavBar({ className }: Props) {
  const [searchBarExpanded, setSearchBarExpanded] = useState(false);

  const { setSearch, reset } = useGameListQueryActions();
  const isSmallDevice = useMediaQuery("screen and (max-width: 767px)");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchBarFocus = () => {
    if (isSmallDevice) setSearchBarExpanded(true);
  };

  const handleSearchBarBlur = () => {
    setSearchBarExpanded(false);
  };

  const handleSearchBarSubmit = (value: string) => {
    if (value.length === 0) return;

    if (location.pathname !== "/") navigate("/");

    setSearch(value);
  };

  return (
    <div className={clsx(css.container, className)}>
      <Link
        className={clsx(css.logo, searchBarExpanded ? css.expanded : "")}
        to="/"
        onClick={() => reset()}
      >
        GHUB
      </Link>
      <SearchBar
        className={clsx(css.search, searchBarExpanded ? css.expanded : "")}
        onFocus={handleSearchBarFocus}
        onBlur={handleSearchBarBlur}
        onSubmit={handleSearchBarSubmit}
      />
      <ColorSchemeToggle
        className={clsx(css.toggle, searchBarExpanded ? css.expanded : "")}
      />
    </div>
  );
}
