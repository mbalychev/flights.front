import Title from "antd/es/typography/Title"
import { Button, Form, Select, Space, Spin } from 'antd';
import { IFilterFlights } from '../../api/flights/flights.intefaces';
import { useEffect, useMemo, useState } from "react";
import { ITAirport } from "../../models/Thesaurus/TAiport";
import { useThesaurus } from '../../hooks/thesaurus';

interface IProps {
    search: (filter: IFilterFlights) => void;
}

const init: IFilterFlights = {
    arrival: 'SVO',
    status: 'Scheduled',
    scheduledArriveMin: new Date('2016.01.01').toISOString(),
    scheduledArriveMax: new Date('2023.01.01').toISOString()
}

export const FilterFlights = (props: IProps) => {

    const [filter, setFilter] = useState<IFilterFlights>(init);
    const { airports: { ready, airportsState, isLoading } } = useThesaurus();
    const [airports, setAiports] = useState<ITAirport[]>([]);

    const loading = useMemo((): boolean => {
        return isLoading;;
    }, [isLoading])

    useEffect(() => {
        if (airportsState) {
            setAiports(airportsState);
        }
    }, [ready])

    const search = (values: IFilterFlights) => {
        props.search({ ...filter, arrival: values.arrival });
    }

    return (
        <>
            <Title level={5}>фильтр</Title>
            <Spin spinning={loading}>

            </Spin>
            <Space>
                <Form
                    onFinish={search}
                    layout='inline'>
                    <Form.Item
                        name='arrival'
                        label='место назначения'>
                        <Select
                            options={airports?.map(x => ({ value: x.code, label: x.name }))}
                            style={{ width: '200px' }} />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            type='primary'> найти </Button>
                    </Form.Item>
                </Form>
            </Space>
        </>
    )
}