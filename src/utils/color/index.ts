import Contrast from 'get-contrast';

export const shouldBeDark = (color: string) => Contrast.isAccessible(color, '#333');
