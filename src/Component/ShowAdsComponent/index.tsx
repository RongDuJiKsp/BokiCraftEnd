import React, {ReactNode} from "react";
import {Badge, Card, Carousel, Col, Row, Statistic} from "antd";
import cpu from "./cpu.png"
import chat from "./qp.png"
import update from "./update.png"
import connect from "./connect.png"
import game from "./game.png"
import backup from "./backup.jpg"
import CountUp from "react-countup";

const ShowAdsComponent = () => {
    const formatter: (value: any) => ReactNode = (value: number) => {
        return <CountUp end={value} separator=","/>;
    };
    const contentStyle: React.CSSProperties = {
        height: '320px',
        color: '#fff',
        lineHeight: '320px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (<>
        <Carousel className={"mb-6"} autoplay={true} effect={"fade"} dotPosition={"bottom"} dots={true}
                  autoplaySpeed={2500}>
            <div>
                <h3 style={contentStyle}>1</h3>
            </div>
            <div>
                <h3 style={contentStyle}>2</h3>
            </div>
            <div>
                <h3 style={contentStyle}>3</h3>
            </div>
            <div>
                <h3 style={contentStyle}>4</h3>
            </div>
        </Carousel>
        <div className={"text-center"}>
            <h1 className={"text-5xl"}>我们的</h1>
            <h3 className={"text-7xl"}>优势有哪些</h3>
        </div>
        <Row>
            <Col span={3}/>
            <Col span={4}>
                <div
                    className={"rounded-full bg-purple-700 h-40 w-40 border-8 border-purple-400 border-solid hover:border-white duration-500 text-center   "}>
                    <img alt="" src={cpu} className={"h-16 mt-6 w-16"}/>
                    <p className={"text-center text-white text-xs"}>垃圾桶掏出来的CPU</p>
                </div>
            </Col>
            <Col span={4}>
                <div
                    className={"rounded-full bg-purple-700 h-40 w-40 border-8 border-purple-400 border-solid hover:border-white duration-500 text-center"}>
                    <Badge count={"99-"}>
                        <img alt="" src={chat} className={"h-16 mt-6 w-16"}/>
                        <p className={"text-center text-white text-xs"}>糟糕的聊天环境</p>
                    </Badge>
                </div>
            </Col>
            <Col span={4}>
                <div
                    className={"rounded-full bg-purple-700 h-40 w-40 border-8 border-purple-400 border-solid hover:border-white duration-500 text-center"}>
                    <img alt="" src={update} className={"h-16 mt-6 w-16"}/>
                    <p className={"text-center text-white text-xs"}>充满bug的更新</p>
                </div>
            </Col>
            <Col span={4}>
                <div
                    className={"rounded-full bg-purple-700 h-40 w-40 border-8 border-purple-400 border-solid hover:border-white duration-500 text-center"}>
                    <img alt="" src={connect} className={"h-16 mt-6 w-16"}/>
                    <p className={"text-center text-white text-xs"}>累死人的联动</p>
                </div>
            </Col>
            <Col span={4}>
                <div
                    className={"rounded-full bg-purple-700 h-40 w-40 border-8 border-purple-400 border-solid hover:border-white duration-500 text-center"}>
                    <img alt="" src={game} className={"h-16 mt-6 w-16"}/>
                    <p className={"text-center text-white text-xs"}>人多就卡的玩家基数</p>
                </div>
            </Col>
        </Row>
        <Row className={"m-16"}>
            <Col span={10}>
                <Card className={"my-8"} hoverable={true}>
                    <h1 className={"font-mono"}>我们改写了大量原版配方</h1>
                    <p className={"font-sans"}>魔改，不是单纯的堆物品套娃，我们用了不同模组的特色合成方式
                        ，打造了一条微妙的平衡线，在这里，各种mods得到了平衡，经过测试，整体可玩性得到了大幅提升，
                        每个mod都有他存在的意义
                    </p>
                    <Row>
                        <Col span={8}>
                            <Statistic title="改写合成数量" value={112893} formatter={formatter}/>
                        </Col>
                        <Col span={8}>
                            <Statistic title="改写代码行数" value={112893} formatter={formatter}/>
                        </Col>
                        <Col span={8}>
                            <Statistic title="拥有任务数量" value={112893} formatter={formatter}/>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col offset={2} span={8}>
                <Card hoverable={true} className={"my-8"}>
                    <img alt="" src={backup} className={"h-full w-full"}/>
                </Card>
            </Col>
        </Row>
    </>)
}
export default ShowAdsComponent;