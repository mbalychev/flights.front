import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { IApiError } from "../../models/error";

interface IProps {
    error?: IApiError
}

export const ErrorComponent = (props: IProps) => {

    const [error, setError] = useState<IApiError>();

    useEffect(() => {
        if (props.error) {
            setError(props.error);
        }
    }, [props.error])

    return (
        <>
            <Title level={3} > Ошибка </Title>
            <span>
                {error?.error_description}
            </span>
        </>
    )

}