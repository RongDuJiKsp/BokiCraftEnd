import {Radio, RadioChangeEvent} from "antd";
import {useState} from "react";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";

const HomePageComponent = () => {
    const [loginOrRegister, setLoginAndRegister] = useState<number>(0);
    const routerTable = [<LoginComponent/>, <RegisterComponent/>]

    function onChange(e: RadioChangeEvent) {
        setLoginAndRegister(e.target.value);
    }

    return (<>
        <Radio.Group defaultValue={0} buttonStyle="solid" onChange={onChange}>
            <Radio.Button value={0}>登录</Radio.Button>
            <Radio.Button value={1}>注册</Radio.Button>
        </Radio.Group>
        {routerTable[loginOrRegister]}
    </>)
}
export default HomePageComponent;