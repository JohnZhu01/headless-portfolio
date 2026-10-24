import html from "devicon/icons/html5/html5-original.svg";
import css from "devicon/icons/css3/css3-original.svg";
import javascript from "devicon/icons/javascript/javascript-original.svg";
import typescript from "devicon/icons/typescript/typescript-original.svg";
import php from "devicon/icons/php/php-original.svg";
import react from "devicon/icons/react/react-original.svg";
import sass from "devicon/icons/sass/sass-original.svg";
import tailwind from "devicon/icons/tailwindcss/tailwindcss-original.svg";
import figma from "devicon/icons/figma/figma-original.svg";
import photoshop from "devicon/icons/photoshop/photoshop-original.svg";
import illustrator from "devicon/icons/illustrator/illustrator-original.svg";
import vscode from "devicon/icons/vscode/vscode-original.svg";
import git from "devicon/icons/git/git-original.svg";
import github from "devicon/icons/github/github-original.svg";
import trello from "devicon/icons/trello/trello-original.svg";
import wordpress from "devicon/icons/wordpress/wordpress-original.svg";
import woocommerce from "devicon/icons/woocommerce/woocommerce-original.svg";

const toolIcons = {
  html,
  html5: html,
  css,
  css3: css,
  javascript,
  typescript,
  php,
  react,
  sass,
  scss: sass,
  "tailwind css": tailwind,
  tailwindcss: tailwind,
  figma,
  "adobe photoshop": photoshop,
  photoshop,
  "adobe illustrator": illustrator,
  illustrator,
  "visual studio code": vscode,
  "vs code": vscode,
  vscode,
  git,
  github,
  trello,
  wordpress,
  woocommerce,
};

export default function toolIcon(tool) {
  const name = (tool.tool_name || "").trim().toLowerCase().replace(/\s+/g, " ");
  const savedLogo = typeof tool.logo === "string" ? tool.logo : tool.logo?.url;
  return toolIcons[name] || savedLogo;
}
