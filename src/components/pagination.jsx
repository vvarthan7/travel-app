import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const PaginationComponent = ({
  page,
  setPage,
  totalPages,
  isPlaceholderData,
  visiblePages,
}) => (
  <Pagination className="cursor-pointer mt-5">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        />
      </PaginationItem>
      {visiblePages[0] > 1 && (
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      )}
      {visiblePages.map((pageNum) => (
        <PaginationItem key={pageNum}>
          <PaginationLink
            isActive={page === pageNum}
            onClick={() => setPage(pageNum)}
          >
            {pageNum}
          </PaginationLink>
        </PaginationItem>
      ))}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      )}
      <PaginationItem>
        <PaginationNext
          onClick={() => {
            if (!isPlaceholderData && page < totalPages) {
              setPage((old) => old + 1);
            }
          }}
          disabled={isPlaceholderData || page === totalPages}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);
