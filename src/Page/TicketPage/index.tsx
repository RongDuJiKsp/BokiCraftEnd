import SubmitTicketComponent from "../../Component/SubmitTicketComponent";
import {Col, Row} from "antd";

const TicketPage = () => {
    return <div className={"py-8"}>
        <Row>
            <Col span={12}>
                <SubmitTicketComponent/>
            </Col>
        </Row>
    </div>
}
export default TicketPage;