import {Menu, MenuProps} from "antd";
import {ReactElement, useState} from "react";
import DownloadComponent from "./DownloadComponent";
import JavaDownComponent from "./JavaDownComponent";

const SelectDownloadComponent = () => {
    const [current, setCurrent] = useState<number>(0);
    const items: MenuProps['items'] = [{
        label: "下载Boki游戏客户端，内附启动器和Java15，一键式启动",
        key: "0"
    }, {
        label: "下载游戏运行时环境(JAVA)  可选",
        key: "1"
    }, {
        label: "下载手机端 (腐竹没做，还在摸鱼，速速压力腐竹)",
        key: "2"
    },{
        label: "下载原神",
        key: "3"
    }];
    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(Number(e.key));
    }
    const onRender: ReactElement[] = [
        <DownloadComponent/>,
        <JavaDownComponent/>,
        <>
           <h1 className={"text-center"}> 腐竹还在摸鱼，催催吧</h1>
        </>,
        <>
            <h1 className={"text-center"}>OPG</h1>
        </>
    ];
    return <>
        <Menu onClick={onClick} selectedKeys={[String(current)]} mode={"horizontal"} items={items}/>
        {onRender[current]}
    </>
}
export default SelectDownloadComponent;