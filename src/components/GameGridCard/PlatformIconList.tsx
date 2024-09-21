import css from "./PlatformIconList.module.css";
import { Platform } from "../../interfaces/Platform";
import PlatformIcon from "../PlatformIcon";

interface Props {
  parent_platforms: { platform: Platform }[];
}

export default function PlatformIconList({ parent_platforms }: Props) {
  return (
    <div className={css.container}>
      {parent_platforms.map((obj) => (
        <PlatformIcon key={obj.platform.slug} platform={obj.platform} />
      ))}
    </div>
  );
}
