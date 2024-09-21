import css from "./Backdrop.module.css";
import clsx from "clsx";

interface Props {
  show: boolean;
  onClick: () => void;
}

export default function Backdrop({ show, onClick }: Props) {
  return (
    <div
      className={clsx(css.backdrop, show ? "" : css.hide)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    ></div>
  );
}
