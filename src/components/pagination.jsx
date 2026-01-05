import Image from "next/image";

export const PaginationComponent = ({
  page,
  setPage,
  totalPages,
  isPlaceholderData,
  visiblePages,
}) => (
  <div className="mt-5 flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
    <div>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        disabled={page === 1}
        className={`flex items-center gap-1.5 border border-gray-200 rounded-md px-3 py-1.5 shadow-sm ${
          page === 1
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-50"
        }`}
      >
        <Image
          src="/assets/icons/arrow-left.svg"
          alt="Previous"
          width={14}
          height={14}
        />
        Previous
      </button>
    </div>
    <div className="space-x-2">
      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          className={`cursor-pointer ${
            pageNumber === page
              ? "font-semibold py-2.5 px-4 bg-primary-100 rounded-lg text-white"
              : "font-semibold py-2.5 px-4 hover:bg-gray-50 rounded-lg"
          } ${
            pageNumber === page ||
            (page < totalPages
              ? pageNumber === page + 1
              : pageNumber === page - 1)
              ? ""
              : "hidden sm:inline-block"
          }`}
        >
          {pageNumber}
        </button>
      ))}
    </div>
    <div>
      <button
        onClick={() => {
          if (!isPlaceholderData && page < totalPages) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isPlaceholderData || page === totalPages}
        className={`flex items-center gap-1.5 border border-gray-200 rounded-md px-3 py-1.5 shadow-sm ${
          isPlaceholderData || page === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-50"
        }`}
      >
        Next
        <Image
          src="/assets/icons/arrow-right.svg"
          alt="Next"
          width={14}
          height={14}
        />
      </button>
    </div>
  </div>
);
