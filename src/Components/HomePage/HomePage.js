import { PageHeader, Descriptions, Typography, Select, Button } from "antd";
import { useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import Swal from "sweetalert2";

const { Title } = Typography;
const { Option } = Select;

export const HomePage = (props) => {

    const allGrade = ["10", "11", "12"];
    const allClass = [
        ["10C1", "10C2", "10C3", "10C4"],
        ["11C1", "11C2", "11C3"],
        ["12C1", "12C2", "12C3"]
    ];

    const [selectedGrade, setSelectedGrade] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [className, setClassName] = useState([]);

    const onGradeChange = (value) => {

        if (value.startsWith("10")) {
            setClassName(allClass[0]);
        } else if (value.startsWith("11")) {
            setClassName(allClass[1]);
        } else if (value.startsWith("12")) {
            setClassName(allClass[2]);
        }

        setSelectedGrade(value);
    }

    const onClassChange = (value) => {
        setSelectedClass(value);
    }

    const onSubmit = () => {
        if (selectedClass === "") {
            Swal.fire("Thông báo", "Vui lòng chọn đúng lớp học", "error");
            return;
        }

        window.location.href = "#timesheet/" + selectedClass;
    }

    return (
        <div>
            <Title style={{ color: "green", textAlign: "center", marginBottom: "5%" }} level={2}>Đã cập nhật thời khóa biểu cho cả 3 khối (16/10/2021)</Title>
            <PageHeader
                ghost={false}
                title="Hệ thống quản lí thời khóa biểu"
            >
                <Descriptions size="small" column={1}>
                    <Descriptions.Item>Trường THPT Tôn Đức Thắng</Descriptions.Item>
                    <Descriptions.Item>Địa chỉ: Đức Cơ - Gia Lai</Descriptions.Item>
                </Descriptions>
            </PageHeader>

            <Select placeholder="Chọn khối" style={{ width: 150, marginTop: 100, marginRight: 30 }} onChange={onGradeChange}>
                {
                    allGrade.map(grade => (
                        <Option key={grade}>{grade}</Option>
                    ))
                }
            </Select>

            {
                className.length !== 0 ? (
                    <Select style={{ width: 150, marginRight: 30 }} placeholder="Chọn lớp" onChange={onClassChange}>
                        {
                            className.map(item => (
                                <Option key={item}>{item}</Option>
                            ))
                        }
                    </Select>
                ) : <></>
            }


            <Button type="primary" icon={<SearchOutlined />} onClick={onSubmit}>Tra cứu</Button>
        </div>
    );
}