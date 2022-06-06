import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {Pagination} from "react-bootstrap";
import classes from "./Pages.module.css"

const Pages = observer(() => {
    const {toy} = useContext(Context);
    const pagesCount = Math.ceil(toy.totalCount / toy.limit);
    const pages = [];

    for (let i = 0; i < pagesCount; i++) {
        pages.push(
            <Pagination.Item
                className = {classes.paginationItem}
                key={i + 1}
                onClick={() => {
                    toy.setPage(i + 1);
                    window.scrollTo(0, 0)
                }}
            >
                {i + 1}
            </Pagination.Item>
        );
    }

    return (
        <div className={classes.pagination}>
            {toy.page > 1 &&
                <Pagination.Prev
                    onClick={() => {
                        toy.setPage(toy.page - 1);
                        window.scrollTo(0, 0);
                    }}
                />
            }

            <Pagination className={classes.pagination}>
                {pages}
            </Pagination>

            {toy.page < pagesCount &&
                <Pagination.Next
                    onClick={() => {
                        toy.setPage(toy.page + 1);
                        window.scrollTo(0, 0);
                    }}
                />
            }
        </div>
    );
});

export default Pages;