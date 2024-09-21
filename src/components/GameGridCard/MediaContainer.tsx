import { getCroppedImageUrl } from "../../utils/game-helpers";

interface Props {
  className?: string;
  src: string | undefined;
}

export default function MediaContainer({ className, src }: Props) {
  return (
    <div className={className}>
      {src && <img src={getCroppedImageUrl(src)} alt="" />}
    </div>
  );
}
