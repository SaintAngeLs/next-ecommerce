/* eslint-disable no-unused-vars */
interface Number {
  toCommas(): string;
  secondsToHm(): string;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}
