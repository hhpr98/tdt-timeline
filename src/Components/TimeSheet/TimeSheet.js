import { Button } from "antd";
import { PageHeader, Descriptions, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { DataContext } from "../../Provider/DataProvider";
import dataContent from "../../data/testdata.json";

export const TimeSheet = (props) => {

    const { preData, setPreData } = useContext(DataContext);
    const { className } = useParams();
    const [localData, setLocalData] = useState([]);

    useEffect(() => {
        setPreData(dataContent);
        for (const [key, value] of Object.entries(dataContent)) {
            // get timesheet of this class
            if (key.toLowerCase() === className.toLowerCase()) {
                var dataArr = [];

                for (var _period = 1; _period <= 10; _period++) {
                    const objToAdd = {
                        period: _period,
                        mon: "",
                        tue: "",
                        wen: "",
                        thu: "",
                        fri: "",
                        sat: ""
                    }
                    dataArr.push(objToAdd);
                }
                
                console.log(value[2])
                console.log(value)
                console.log(dataArr)

                setLocalData(dataArr);

                break;
            }
        }
    }, []);

    const handleBack = () => {
        window.location.href = "#";
    }

    const columns = [
        {
            title: "Tiết",
            dataIndex: "period",
            key: "period",
        },
        {
            title: "Thứ 2",
            dataIndex: "mon",
            key: "mon",
        },
        {
            title: "Thứ 3",
            dataIndex: "tue",
            key: "tue",
        },
        {
            title: "Thứ 4",
            dataIndex: "wen",
            key: "wen",
        },
        {
            title: "Thứ 5",
            key: "thu",
            dataIndex: "thu"
        },
        {
            title: "Thứ 6",
            key: "fri",
            dataIndex: "fri"
        },
        {
            title: "Thứ 7",
            key: "sat",
            dataIndex: "sat"
        }
    ];

    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={handleBack}
                title="Thời khóa biểu"
                subTitle="Lớp ABC"
                extra={[
                    <Button key="3">Cập nhật</Button>,
                    <Button key="2">Liên hệ giáo viên</Button>,
                    <Button key="1" type="primary">Báo cáo sai </Button>
                ]}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Tạo bởi">Admin</Descriptions.Item>
                    <Descriptions.Item label="Từ">2021/00/00 00:00:00</Descriptions.Item>
                    <Descriptions.Item label="Đến">2021/00/00 00:00:00</Descriptions.Item>
                    <Descriptions.Item label="Tuần">01</Descriptions.Item>
                    <Descriptions.Item label="Học kì">1</Descriptions.Item>
                    <Descriptions.Item label="Năm học">2021</Descriptions.Item>
                </Descriptions>
            </PageHeader>

            <Table columns={columns} dataSource={localData} />


        </div>
    );
}