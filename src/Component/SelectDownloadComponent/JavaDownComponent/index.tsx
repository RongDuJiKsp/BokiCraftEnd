import {Button} from "antd";
import UrlConfig from "../../../Config/UrlConfig";

const JavaDownComponent = () => {
    return <div className={"my-5 text-center"}>
        <a href={UrlConfig.javaUrl} rel="noreferrer" target={"_blank"}> <Button>p2p高速下载器，启动</Button></a>
    </div>
}
export default JavaDownComponent;