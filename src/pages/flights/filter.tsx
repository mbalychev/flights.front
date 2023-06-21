import Title from "antd/es/typography/Title"
import { Form, Layout, Select } from 'antd';



export const FilterFlights = () => {
    return (
        <>
            <Title level={5}>фильтр</Title>
            <Form
                layout='inline'>
                <Form.Item
                    label='место назначения'>
                    <Select style={{ width: '200px' }} />
                </Form.Item>
            </Form>
        </>
    )
}