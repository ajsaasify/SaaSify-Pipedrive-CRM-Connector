import { themeSwitcherColor } from "@template/common/themeSwitcher";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
} from "@template/hooks/useStoredTheme";

// Get available themes from theme switcher configuration
const availableThemes = themeSwitcherColor.map((theme) => theme.value);

export const changeTheme = (themeName: string) => {
  if (!availableThemes.includes(themeName)) {
    themeName = DEFAULT_THEME;
  }

  const existingLink = document.getElementById(
    THEME_STORAGE_KEY,
  ) as HTMLLinkElement;

  // Use CDN but with faster loading
  const themePath = `https://unpkg.com/primereact/resources/themes/${themeName}/theme.css`;

  if (existingLink) {
    existingLink.href = themePath;
  } else {
    const link = document.createElement("link");
    link.id = THEME_STORAGE_KEY;
    link.rel = "stylesheet";
    link.href = themePath;
    document.head.appendChild(link);
  }
};
