import css from "./Expandable.module.css";
import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  className?: string;
  expanded: boolean;
  children: ReactNode;
}

export default function Expandable({ className, expanded, children }: Props) {
  return (
    <div className={css.relative}>
      <div
        className={clsx(className, css.expandable, expanded ? css.show : "")}
      >
        {children}
      </div>
    </div>
  );
}
