import { IPagination } from "../../models/pagination"

export const PaginationInit = () => {

    return (
        {
            page: 1,
            onPage: 10,
            total: 0
        } as IPagination
    )

}