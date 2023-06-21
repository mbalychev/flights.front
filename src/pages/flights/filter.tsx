import Title from "antd/es/typography/Title"
import { Button, Form, Layout, Select, Space } from 'antd';
import { IFilterFlights } from '../../api/flights/flights.intefaces';
import { useState } from "react";

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

    const search = (values: IFilterFlights) => {
        props.search(filter);
    }

    return (
        <>
            <Title level={5}>фильтр</Title>
            <Space>
                <Form
                    onFinish={search}
                    layout='inline'>
                    <Form.Item
                        label='место назначения'>
                        <Select style={{ width: '200px' }} />
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