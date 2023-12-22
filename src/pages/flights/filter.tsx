import '../../css/flights.filter.css'
import Title from "antd/es/typography/Title"
import { AutoComplete, Button, Col, Form, Input, Row, Select, Space, Spin } from 'antd';
import { IFilterFlights } from '../../api/flights/flights.intefaces';
import { useEffect, useMemo, useState } from "react";
import { ITAirport } from "../../models/Thesaurus/TAiport";
import { useThesaurus } from '../../hooks/thesaurus';
import { Status } from "../../components/common/Status";
import { findFlightsNum } from "../../api/thesaurus/thesaurus";
import { SortType } from "../../models/flightSort";
import { purple } from '@ant-design/colors';
import { SearchOutlined } from '@ant-design/icons';
import { sortFlights, statuses } from '../../thesaurus/flights';
interface IProps {
    search: (filter: IFilterFlights) => void;
}


export const FilterFlights = (props: IProps) => {

    const { airports: { ready, airportsState, isLoading } } = useThesaurus();
    const [airports, setAiports] = useState<ITAirport[]>();
    const [flightsNumber, setFlightsNumber] = useState<{ value: string }[]>([]);
    const loading = useMemo((): boolean => {
        return isLoading;;
    }, [isLoading])

    useEffect(() => {
        if (airportsState) {
            setAiports(airportsState);
        }
    }, [ready])

    const search = (values: IFilterFlights) => {
        props.search(values);
    }

    const searchFlightsNum = async (num: string) => {

        if (num) {
            const resp = await findFlightsNum(num);

            let obj: { value: string }[] = [];
            (resp as string[]).forEach(n => {
                obj.push({ value: n });
            });
            setFlightsNumber(obj);
        }
    }

    const arrivalFilterOption = (value: string, option: { value: string; label: string; } | undefined) => {
        return (option) ? option.label.toLocaleLowerCase().includes(value.toLowerCase()) : false;
    }

    return (
        <Spin spinning={loading}>
            <Form
                layout="inline"
                initialValues={{ status: undefined }}
                onFinish={search}>
                <Form.Item
                    name='arrival'
                    label='Назначение'
                    className='inputPanel'>
                    <Select
                        showSearch
                        filterOption={arrivalFilterOption}
                        options={airports?.map(x => ({ value: x.code, label: x.name }))}
                        clearIcon={true} />
                </Form.Item>
                <Form.Item
                    name='sort'
                    label='Статус'
                    className='inputPanel'>
                    <Select
                        options={statuses} />
                </Form.Item>
                <Form.Item
                    name='number'
                    label='Рейс'
                    className='inputPanel'>
                    <AutoComplete
                        allowClear
                        defaultValue={undefined}
                        options={flightsNumber}
                        onSearch={(num) => searchFlightsNum(num)} />
                </Form.Item>
                <Form.Item
                    name='sort'
                    label='Сортировка'
                    className='inputPanel'>
                    <Select
                        allowClear
                        defaultValue={undefined}
                        options={sortFlights} />
                </Form.Item>
                <div className='filterButtonsPanel'>
                    <Form.Item>
                        <Button
                            className='buttonStandart'
                            htmlType="submit"
                            type='primary'>
                            <SearchOutlined />
                            найти
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Spin>
    )
}