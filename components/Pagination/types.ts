export type PaginationBarProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
