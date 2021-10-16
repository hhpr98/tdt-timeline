import { Button } from "antd";
import { PageHeader, Descriptions, Table, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { DataContext } from "../../Provider/DataProvider";
import dataContent from "../../data/testdata.json";
import "./TimeSheet.css";
import { covertPeriodToTime } from "../../Utils/covertPeriodToTime";
import moment from "moment";

const { Option } = Select;

export const TimeSheet = (props) => {

    const { preData, setPreData } = useContext(DataContext);
    const { className } = useParams();
    const [localData, setLocalData] = useState([]);
    const [localDateTime, setLocalDateTime] = useState("");

    useEffect(() => {
        setPreData(dataContent);
        setInterval(() => {
            setLocalDateTime(moment().format("dddd DD/MM/YYYY HH:mm:ss"));
        }, 1000);
    }, []);

    const handleBack = () => {
        window.location.href = "#";
    }

    const handleChange = (value) => {
        for (const [key, val] of Object.entries(preData)) {
            // get timesheet of this class
            if (key.toLowerCase() === className.toLowerCase()) {
                const dataOfThisDay = val[value];
                var dataArr = [];
                dataOfThisDay.forEach((item) => {
                    dataArr.push({
                        period: item.period,
                        content: item
                    });
                });
                setLocalData(dataArr);
            }
        }
    }

    const columns = [
        {
            title: "Tiết",
            dataIndex: "period",
            key: "period",
            width: "10%"
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            key: "content",
            render: content => {
                if (content.subjects === "")
                    return (
                        <div>Không có môn học</div>
                    );

                const subjectDetail = covertPeriodToTime(content.period);

                return (
                    <>
                        {
                            subjectDetail.isReady ? <div style={{ color: "red" }}>[Đang diễn ra]</div> : <></>
                        }
                        <div style={{ fontSize: 21 }}><b>{content.subjects}</b></div>
                        <div>Thời gian bắt đầu: {subjectDetail.startTime}</div>
                        <div>Thời gian kết thúc: {subjectDetail.endTime}</div>
                        {
                            content.teacher !== "" ? <div>Giáo viên: {content.teacher}</div> : <></>
                        }
                        {
                            content.link !== "" ? <div>Vào lớp : <a href={content.link} target="_blank">Tham gia tại đây</a></div> : <></>
                        }
                        {
                            content.link !== "" ? <div>Điểm danh : <a href={content.link} target="_blank">Điểm danh tại đây</a></div> : <></>
                        }
                    </>
                )
            }
        }
    ];

    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={handleBack}
                title="Thời khóa biểu"
                subTitle="TKB alpha version"
                extra={[
                    <Button key="3">Cập nhật</Button>,
                    <Button key="2">Liên hệ giáo viên</Button>,
                    <Button key="1" type="primary">Báo lỗi </Button>
                ]}
            >
                <Descriptions size="small" column={4}>
                    <Descriptions.Item label="Tạo bởi">Admin</Descriptions.Item>
                    <Descriptions.Item label="Lớp">{className}</Descriptions.Item>
                    <Descriptions.Item label="Từ">18:10:2021 00:00:00</Descriptions.Item>
                    <Descriptions.Item label="Đến">23:10:2021 00:00:00</Descriptions.Item>
                </Descriptions>
                <Descriptions size="small" column={4}>
                    <Descriptions.Item label="Tuần">01</Descriptions.Item>
                    <Descriptions.Item label="Học kì">1</Descriptions.Item>
                    <Descriptions.Item label="Năm học">2021-2022</Descriptions.Item>
                    <Descriptions.Item label="GVCN"></Descriptions.Item>
                </Descriptions>
                <Descriptions size="small">
                    <Descriptions.Item label="Giờ hệ thống">{localDateTime}</Descriptions.Item>
                </Descriptions>
            </PageHeader>

            <Select style={{ width: 120, marginTop: 15, marginBottom: 15 }} placeholder="Chọn ngày" onChange={handleChange}>
                <Option value="2">Thứ 2</Option>
                <Option value="3">Thứ 3</Option>
                <Option value="4">Thứ 4</Option>
                <Option value="5">Thứ 5</Option>
                <Option value="6">Thứ 6</Option>
                <Option value="7">Thứ 7</Option>
            </Select>

            <Table columns={columns} dataSource={localData} />

            <div className="note" style={{ color: "red", fontSize: 14 }}><b>Lưu ý:</b> Buổi sáng : tiết 1 đến tiết 5, Buổi chiều: tiết 6 đến tiết 10</div>

        </div >
    );
}