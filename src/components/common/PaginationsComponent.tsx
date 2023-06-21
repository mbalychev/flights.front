import { Pagination } from "antd"
import { IPagination } from '../../models/pagination';
import { useEffect, useMemo, useState } from "react";
import { IFilterFlights } from "../../api/flights/flights.intefaces";
import { getFlights } from '../../api/flights/flights';
import { useFlights } from "../../store/flights";
import { PaginationInit } from "../../utils/init/paginations";

export interface IPaginationComponent {
    // setTotal: () => number;
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
        <Pagination
            showSizeChanger
            onChange={(p, s) => changePagionation(p, s)}
            current={pagination.page}
            pageSize={pagination.onPage ?? 10}
            total={pagination.total} />
    )
}