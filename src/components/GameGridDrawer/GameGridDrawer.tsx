import css from "./GameGridDrawer.module.css";
import clsx from "clsx";
import { Drawer } from "vaul";
import { SortAscending } from "@phosphor-icons/react";
import SortFilterBar from "./SortFilterBar";
import { useState } from "react";

interface Props {
  className?: string;
}

export default function GameGridDrawer({ className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={clsx(css.container, className)}>
      <Drawer.Root direction="right" open={open} onClose={() => setOpen(false)}>
        <Drawer.Trigger
          asChild
          className={css.trigger}
          onClick={() => setOpen(true)}
        >
          <button>
            <SortAscending />
            Sort and Filter...
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay
            className={css.overlay}
            onClick={() => setOpen(false)}
          />
          <Drawer.Content className={css.content}>
            <SortFilterBar closeDrawer={() => setOpen(false)} />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
