import { Button } from "antd";
import { PageHeader, Descriptions } from "antd";
import { useContext, useEffect } from "react";
import { DataContext } from "../../Provider/DataProvider";
import dataContent from "../../data/testdata.json";

export const HomePage = (props) => {

    const { preData, setPreData } = useContext(DataContext);

    useEffect(() => {

        setPreData(dataContent);
    }, []);

    return (
        <div style={{backgroundColor:"red"}}>
            Hello world!
        </div>
    );
}