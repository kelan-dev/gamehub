import { useEffect } from "react";
import { create } from "zustand";
import { Parameters } from "../hooks/useGameList";
import { Platform } from "../interfaces/Platform";
import { Genre } from "../interfaces/Genre";

interface Subscriber {
  onSetPlatform?: (platform: Platform) => void;
  onSetGenre?: (genre: Genre) => void;
  onSetSearch?: (text: string) => void;
  onAddTag?: (tag: string) => void;
  onRemoveTag?: (tag: string) => void;
  onReset?: () => void;
}

let subscribers: Subscriber[] = [];

export function useGameListQuerySubscription(subscriber: Subscriber) {
  useEffect(() => {
    subscribers = [...subscribers, subscriber];
    return () => {
      subscribers = subscribers.filter((s) => s !== subscriber);
    };
  }, [subscriber]);
}

interface Entities {
  platform?: Platform;
  genre?: Genre;
}

interface Actions {
  setOrdering: (ordering: string) => void;
  setPlatform: (platform: Platform, reset?: boolean) => void;
  setGenre: (genre: Genre, reset?: boolean) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  setSearch: (search: string) => void;
  reset: () => void;
}

interface GameListQueryStore {
  parameters: Parameters;
  entities: Entities;
  actions: Actions;
}

const useGameListQueryStore = create<GameListQueryStore>()((set) => ({
  parameters: {},
  entities: {},
  actions: {
    setOrdering: (ordering) =>
      set((store) => ({
        parameters: { ...store.parameters, ordering },
        entities: { ...store.entities },
      })),
    setPlatform: (platform, reset = false) =>
      set((store) => {
        subscribers.forEach((s) => s.onSetPlatform?.(platform));

        if (reset)
          return {
            parameters: {
              parent_platforms: platform.id.toString(),
            },
            entities: {
              platform,
            },
          };

        return {
          parameters: {
            ...store.parameters,
            parent_platforms: platform.id.toString(),
          },
          entities: {
            ...store.entities,
            platform,
          },
        };
      }),
    setGenre: (genre, reset = false) =>
      set((store) => {
        subscribers.forEach((s) => s.onSetGenre?.(genre));

        if (reset)
          return {
            parameters: { genres: genre.slug },
            entities: { genre },
          };

        return {
          parameters: { ...store.parameters, genres: genre.slug },
          entities: { ...store.entities, genre },
        };
      }),
    addTag: (tag) =>
      set((store) => {
        subscribers.forEach((s) => s.onAddTag?.(tag));

        const currentTags = store.parameters.tags?.split(",") || [];
        if (!currentTags.find((t) => t === tag)) currentTags.push(tag);
        const tags = currentTags.join(",");

        return {
          parameters: { ...store.parameters, tags },
          entities: { ...store.entities },
        };
      }),
    removeTag: (tag) =>
      set((store) => {
        subscribers.forEach((s) => s.onRemoveTag?.(tag));

        const currentTags = store.parameters.tags?.split(",") || [];
        const filteredTags = currentTags.filter((t) => t !== tag);
        const tags =
          filteredTags.length > 0 ? filteredTags.join(",") : undefined;

        return {
          parameters: { ...store.parameters, tags },
          entities: { ...store.entities },
        };
      }),
    setSearch: (search) =>
      set(() => {
        subscribers.forEach((s) => s.onSetSearch?.(search));
        return { parameters: { search }, entities: {} };
      }),
    reset: () =>
      set(() => {
        subscribers.forEach((s) => s.onReset?.());
        return { parameters: {}, entities: {} };
      }),
  },
}));

export function useGameListQueryParameters() {
  return useGameListQueryStore((store) => store.parameters);
}

export function useGameListQueryEntities() {
  return useGameListQueryStore((store) => store.entities);
}

export function useGameListQueryActions() {
  return useGameListQueryStore((store) => store.actions);
}
