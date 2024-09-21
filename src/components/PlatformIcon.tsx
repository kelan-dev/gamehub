import React from "react";
import { Platform } from "../interfaces/Platform";
import { IconType } from "react-icons";
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import { SiNintendo, SiAtari, SiSega } from "react-icons/si";
import { MdPhoneIphone } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";
import {
  TbCircleLetterC,
  TbCircleLetterN,
  TbCircleNumber3,
} from "react-icons/tb";

interface Props {
  platform: Platform;
}

const iconMap: { [key: string]: IconType } = {
  pc: FaWindows,
  playstation: FaPlaystation,
  xbox: FaXbox,
  ios: MdPhoneIphone,
  android: FaAndroid,
  mac: FaApple,
  linux: FaLinux,
  nintendo: SiNintendo,
  atari: SiAtari,
  "commodore-amiga": TbCircleLetterC,
  sega: SiSega,
  "3do": TbCircleNumber3,
  "neo-geo": TbCircleLetterN,
  web: BsGlobe,
};

export default function PlatformIcon({ platform }: Props) {
  if (!iconMap[platform.slug]) return null;
  return React.createElement(iconMap[platform.slug], {
    "aria-label": platform.name,
    title: platform.name,
  });
}
