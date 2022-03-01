import { isHexColor } from 'class-validator';
import Contrast from 'get-contrast';

export const shouldBeDark = (color: string) =>
  isHexColor(color) && Contrast.isAccessible(color, '#333');
