import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import styles from './Pagination.module.sass';

type PaginationProps = {
  limit: number;
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  nextPage: () => void;
  prevPage: () => void;
};

export const Pagination: FC<PaginationProps> = observer(({ limit, totalPages, paginate, nextPage, prevPage, currentPage }) => {

	const pageNumbers = [];

	for (let i = 1; i <= (Math.ceil(totalPages / limit)); i++) {
		pageNumbers.push(i);
	}

	const handlerTogglePage = (number: number) => {
		paginate(number);
	};

	return (
		<div className={styles.pagination}>
			<ul className={styles.pagination__pagesNumber}>
				<li
					onClick={prevPage}
					className={currentPage - 1 === 0 ? styles.hidden : ''}
				>
            &lt;
				</li>

				{
					pageNumbers.map(number => (
						(number === currentPage) || (number + 1 === currentPage) || (number - 1 === currentPage)
							? <li key={number}>
								<p
									onClick={() => handlerTogglePage(number)}
								> {number === currentPage
										? (<b>{number}</b>)
										: number
									}
								</p>
							</li>
							: ''
					))
				}
				<li
					onClick={nextPage}
					className={currentPage === pageNumbers.length ? styles.hidden : ''}
				>
            &gt;
				</li>
			</ul>
		</div>
	);
});
