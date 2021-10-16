import { Button } from "antd";

export const HomePage = (props) => {
    return (
        <div>
            <div>Hello World!</div>
            <Button type="primary" loading={true} onClick={() => alert("huhu")}>
                Click me!
            </Button>
        </div>
    );
}