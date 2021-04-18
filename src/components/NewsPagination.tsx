import { useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

interface PaginationProps {
  items: Array<Object>;
  itemsPerPage: number;
  query: string;
  searchFunction: Function;
  totalPages: number;
}


export const NewsPagination = ({items, itemsPerPage, query, searchFunction, totalPages}: PaginationProps) => {
  const [page, setPage] = useState(1);
  
  const moveToPage = async (page: number) => {
    await searchFunction({q: query, withThumbnails: true, page, pageSize: itemsPerPage})
    setPage(page);

  }

  let endPage = page+3 <= totalPages ? page+3 : totalPages;
  let startPage = page-3 >= 0 ? page-3 : page-1;

  const rows = [
    <PaginationItem key={`previous-page-item`}>
      <PaginationLink
        disabled={page === 1} 
        previous 
        href="" 
        onClick={() => moveToPage(page-1)} 
      />
    </PaginationItem>
  ]
  
  for (let i = startPage; i < endPage; i++) {
    rows.push(
    <PaginationItem active={i+1===page} key={`pagination-item-${i}`}>
      <PaginationLink href="" onClick={() => moveToPage(i+1)}>{i+1}</PaginationLink>
    </PaginationItem>)
  }

  return (
    <>
      {
        items.length > 0 &&
          <Pagination aria-label="Page navigation" listClassName='justify-content-center'>
            {[
              ...rows,
              <PaginationItem key={`next-page-item`}>
                <PaginationLink 
                  disabled={page >= totalPages} 
                  next 
                  href="" 
                  onClick={() => moveToPage(page+1)}/>
              </PaginationItem>
            ]}
          </Pagination> 
      }
    </>
  )
}