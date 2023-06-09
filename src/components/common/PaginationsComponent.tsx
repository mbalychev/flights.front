import { Pagination } from "antd"
import { IPagination } from '../../models/pagination';
import { useEffect, useState } from "react";
import { PaginationInit } from "../../utils/init/paginations";

export interface IPaginationComponent {
    pagination: IPagination;
    onChange: (pagination: IPagination) => void;
}

export const PaginationsComponent = (props: IPaginationComponent) => {

    const [pagination, setPagination] = useState<IPagination>(PaginationInit);

    useEffect(() => {
        if (props.pagination) { setPagination(props.pagination) }

    }, [props])

    const changePagionation = (page: number, size: number) => {
        const newPagination = { ...pagination, page: page, onPage: size };
        setPagination(newPagination);
        if (pagination) { props.onChange(newPagination); }
    }

    return (
        <div
            style={{ width: '100%', textAlign: 'right', margin: '10px   ' }}>

            <Pagination
                showSizeChanger
                onChange={(p, s) => changePagionation(p, s)}
                current={pagination.page}
                pageSize={pagination.onPage ?? 10}
                total={pagination.total} />
        </div>
    )
}