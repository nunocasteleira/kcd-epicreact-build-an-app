export type ResourceList<T> = {
  available: number;
  returned: number;
  collectionURI: string;
  items: T[];
};
