import React, {FC, useState} from 'react';
import styles from "./Paginator.module.css"
import {Button} from "antd";
type PropsType = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber:number)=>void,
    portionSize?: number
}

let Paginator: FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {

	let pagesCount = Math.ceil(totalItemsCount / pageSize);

	let pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}

	let portionCount = Math.ceil(pagesCount / portionSize);
	let [portionNumber, setPortionNumber] = useState(1);
	let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
	let rightPortionPageNumber = portionNumber * portionSize;


	return <div className={styles.paginator}>
		{ portionNumber > 1 &&
			<Button size={'small'} onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</Button> }

		{pages
			.filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)
			.map((p) => {
				const isSelected = currentPage === p;
				return <span
						className={`${styles.pageNumber} ${isSelected ? styles.selectedPage : ''}`}
						key={p}
						onClick={(e) => {
						onPageChanged(p);
					}}>{p}</span>
			})}
		{ portionCount > portionNumber &&
			<Button size={'small'} onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</Button> }


	</div>
}

export default Paginator;