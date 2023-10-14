import {Button} from "antd";
import UrlConfig from "../../../Config/UrlConfig";

const DownloadComponent = () => {
    return <div className={"my-5 text-center"}>
        <a href={UrlConfig.bokiFastDownloadUrl}  rel="noreferrer" target={"_blank"}> <Button>p2p高速下载器，启动</Button></a>
        <a href={UrlConfig.bokiDownloadUrl}  rel="noreferrer" target={"_blank"}> <Button>百度网盘3kB/h，启动</Button></a>
    </div>
}
export default DownloadComponent;