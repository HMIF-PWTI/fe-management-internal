export interface Column<T> {
  header: string;
  key: keyof T | 'no';
  render?: (value: any, item: T) => React.ReactNode;
  className?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}
