import { Button } from "antd";
import { PageHeader, Descriptions, Table, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { DataContext } from "../../Provider/DataProvider";
import dataContent from "../../data/testdata.json";
import "./TimeSheet.css";
import { covertPeriodToTime } from "../../Utils/covertPeriodToTime";
import moment from "moment";
import Swal from "sweetalert2";

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
    }, [setPreData]);

    

    const handleBack = () => {
        window.location.href = "#";
    }

    const redirect_blank = (url) => {
        var a = document.createElement('a');
        a.target = "_blank";
        a.href = url;
        a.click();
    }

    const handleChange = (value) => {
        for (const [key, val] of Object.entries(preData)) {
            // get timesheet of this class
            if (key.toLowerCase() === className.toLowerCase()) {
                const dataOfThisDay = val[value];
                const dataArr = [];
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
                        {
                            subjectDetail.willStartSoon ? <div style={{ color: "blue" }}>[Diễn ra sau {subjectDetail.willStartIn} phút nữa]</div> : <></>
                        }
                        <div style={{ fontSize: 21 }}><b>{content.subjects}</b></div>
                        <div>Thời gian bắt đầu: {subjectDetail.startTime}</div>
                        <div>Thời gian kết thúc: {subjectDetail.endTime}</div>
                        {
                            content.teacher !== "" ? <div>Giáo viên: <b> {content.teacher}</b></div> : <></>
                        }
                        {
                            content.link !== "" ? <Button type="primary" style={{ marginRight: 20, marginTop: 5 }} onClick={() => redirect_blank(content.link)}>Vào lớp</Button> : <></>
                        }
                        {
                            content.link !== "" ? <Button type="primary" onClick={() => Swal.fire("Thông báo", "Chức năng đang được triển khai!", "info")}>Điểm danh</Button> : <></>
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
                subTitle="TKB alpha 1.0"
                extra={[
                    <Button key="3" onClick={() => Swal.fire("Thông báo", "Chức năng đang được triển khai!", "info")} type="primary">Cập nhật</Button>,
                    <Button key="2" onClick={() => redirect_blank("https://www.facebook.com/huuthe87")} type="primary">Liên hệ giáo viên</Button>,
                    <Button key="1" onClick={() => Swal.fire("Thông báo", "Chức năng đang được triển khai!", "info")} type="danger">Báo lỗi </Button>
                ]}
            >
                <Descriptions size="small" column={4}>
                    <Descriptions.Item label="Tạo bởi"><b>Admin</b></Descriptions.Item>
                    <Descriptions.Item label="Lớp"><b>{className}</b></Descriptions.Item>
                    <Descriptions.Item label="Từ"><b>18:10:2021 00:00:00</b></Descriptions.Item>
                    <Descriptions.Item label="Đến"><b>23:10:2021 00:00:00</b></Descriptions.Item>
                </Descriptions>
                <Descriptions size="small" column={4}>
                    <Descriptions.Item label="Tuần"><b>01</b></Descriptions.Item>
                    <Descriptions.Item label="Học kì"><b>1</b></Descriptions.Item>
                    <Descriptions.Item label="Năm học"><b>2021-2022</b></Descriptions.Item>
                    <Descriptions.Item label="GVCN"><b></b></Descriptions.Item>
                </Descriptions>
                <Descriptions size="small">
                    <Descriptions.Item label="Giờ hệ thống"><b>{localDateTime}</b></Descriptions.Item>
                </Descriptions>
            </PageHeader>

            <Select style={{ width: 120, marginTop: 15, marginBottom: 15 }} placeholder="Chọn ngày" onChange={handleChange}>
                {
                    ["2", "3", "4", "5", "6", "7"].map(item => {
                        return <Option value={item} key={item}>Thứ {item}</Option>
                    })
                }
            </Select>

            <Table columns={columns} dataSource={localData} pagination={false} />

            <div className="note" style={{ color: "red", fontSize: 14 }}><b>Lưu ý:</b> Buổi sáng : tiết 1 đến tiết 5, Buổi chiều: tiết 6 đến tiết 10</div>

        </div >
    );
}