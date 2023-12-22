export type Bubble = {
  id: number;
  parentId?: number | null;
  bgColor: string;
  children: Bubble[];
  position: {
    x: number;
    y: number;
  };
};
