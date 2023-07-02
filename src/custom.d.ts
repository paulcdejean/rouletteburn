declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*module.css' {
  const content: any;
  export default content;
}

declare module '*module.css?inline' {
  const content: string;
  export default content;
}
