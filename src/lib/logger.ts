import chalk from "chalk";

export const logger = {
  info: (msg: string) => console.log(msg),
  success: (msg: string) => console.log(chalk.green(`✓ ${msg}`)),
  warning: (msg: string) => console.log(chalk.yellow(`! ${msg}`)),
  error: (msg: string) => console.log(chalk.red(`✗ ${msg}`)),
  progress: (msg: string) => console.log(chalk.dim(`→ ${msg}`)),
  milestone: (msg: string) => console.log(chalk.cyan(`★ ${msg}`)),
};

const color =
  (code: number): ((text: string) => string) =>
  (text: string) =>
    `\x1b[${code}m${text}\x1b[0m`;

// Basic colors
export const black = color(30);
export const red = color(31);
export const green = color(32);
export const yellow = color(33);
export const blue = color(34);
export const magenta = color(35);
export const cyan = color(36);
export const white = color(37);

// Bright variants
export const brightRed = color(91);
export const brightGreen = color(92);
export const brightYellow = color(93);
export const brightBlue = color(94);
export const brightMagenta = color(95);
export const brightCyan = color(96);
export const brightWhite = color(97);
