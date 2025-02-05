interface HeaderType  {
  title: string;
  type: string;
  variant: "default" | "pink" | "orange" | "red" | "blue" | "green";
  background: "default" | "pink" | "orange" | "red" | "blue" | "green";
}

export const headers: HeaderType[] = [
  {
    title: "Core",
    type: "CC",
    variant: "red",
    background: "red",
  },
  {
    title: "Functional",
    type: "FC",
    variant: "blue",
    background: "blue",
  },
  {
    title: "Technical",
    type: "TC",
    variant: "green",
    background: "green",
  },
]