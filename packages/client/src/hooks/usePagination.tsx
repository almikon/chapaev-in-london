import { useEffect, useState } from 'react'
import Pagination from '../components/UI-elements/Pagination/Pagination'

type usePaginationProps<List> = {
  list: List[],
  paginateList: (list: List[]) => void,
  limit: number
}

export const UsePagination = <T extends object>(props: usePaginationProps<T>) => {
  const { paginateList, list, limit } = props
  const [currentPage, setCurrentPage] = useState(1)

  const lastIndex = currentPage * limit
  const firstIndex = lastIndex - limit
  const currentChats = list.slice(firstIndex, lastIndex)

  useEffect(() => {
    paginateList(currentChats)
  }, [currentPage, list])

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const prevPage = () => setCurrentPage(prev => prev - 1)
  const nextPage = () => setCurrentPage(prev => prev + 1)

  return (
    <Pagination
      limit={limit}
      currentPage={currentPage}
      totalPages={list.length}
      paginate={paginate}
      prevPage={prevPage}
      nextPage={nextPage}
    />
  )
}
