import css from "./ImportGamesBanner.module.css";
import clsx from "clsx";
import { X } from "@phosphor-icons/react";
import { FaSteam, FaXbox, FaPlaystation } from "react-icons/fa";

interface Props {
  className?: string;
  onClose: () => void;
}

export default function ImportGamesBanner({ className, onClose }: Props) {
  return (
    <div className={clsx(css.container, className)}>
      <p>
        Jump-start your library with games from Steam, PlayStation, Xbox, or
        GOG. The more complete your profile is, the better it shows your
        interests.
      </p>
      <button className={clsx(css.button, css.importGamesButton)}>
        Import Games
        <FaSteam />
        <FaXbox />
        <FaPlaystation />
      </button>
      <button
        className={clsx(css.button, css.closeButton)}
        onClick={() => onClose()}
      >
        <X weight="bold" size="16" />
      </button>
    </div>
  );
}
