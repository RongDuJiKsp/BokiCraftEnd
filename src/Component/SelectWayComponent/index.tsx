import {Tabs, TabsProps} from "antd";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";

const HomePageComponent = () => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '登录----提交工单',
            children: <LoginComponent/>,
        },
        {
            key: '2',
            label: '注册----加入我们',
            children: <RegisterComponent/>,
        }
    ];
    return (<Tabs defaultActiveKey="1" items={items}/>)
}
export default HomePageComponent;