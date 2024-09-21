import Game from "../../interfaces/Game";
import { getCroppedImageUrl } from "../../utils/game-helpers";
import ImageGallery from "react-image-gallery";
import useGameScreenshots from "../../hooks/useGameScreenshots";
import "react-image-gallery/styles/css/image-gallery.css";
import LoadingSpinner from "../LoadingSpinner";

interface ImageGalleryItem {
  original: string;
  thumbnail: string;
}

interface Props {
  className?: string;
  game: Game;
}

export default function GameImageGallery({ className, game }: Props) {
  const {
    data: screenshots,
    error,
    isLoading,
  } = useGameScreenshots({
    slug: game.slug ?? "",
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>{`(Network error; couldn't load game images)`}</p>;
  if (!screenshots) return null;
  if (screenshots.length === 0) return null;

  const imageGalleryItems: ImageGalleryItem[] = [];

  imageGalleryItems.push({
    original: game.background_image,
    thumbnail: getCroppedImageUrl(game.background_image),
  });

  screenshots.forEach((screenshot) => {
    imageGalleryItems.push({
      original: screenshot.image,
      thumbnail: getCroppedImageUrl(screenshot.image),
    });
  });

  return (
    <div className={className}>
      <ImageGallery items={imageGalleryItems} lazyLoad={true} />
    </div>
  );
}
