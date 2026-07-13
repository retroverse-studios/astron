/// <reference types="vite/client" />

declare module "*.tsv.gz?url" {
  const url: string;
  export default url;
}
