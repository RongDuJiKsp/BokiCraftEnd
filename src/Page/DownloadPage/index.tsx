import {Col, Row} from "antd";
import SelectDownloadComponent from "../../Component/SelectDownloadComponent";

const DownloadPage = () => {
    return <>
        <Row className={"my-16"}>
            <Col span={3}/>
            <Col span={18}>
                <SelectDownloadComponent/>
            </Col>
            <Col span={3}/>
        </Row>
    </>
}
export default DownloadPage;