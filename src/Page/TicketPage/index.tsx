import SubmitTicketComponent from "../../Component/SubmitTicketComponent";
import {Col, Row} from "antd";

const TicketPage = () => {
    return <Row>
        <Col span={12}>
            <SubmitTicketComponent/>
        </Col>
    </Row>
}
export default TicketPage;