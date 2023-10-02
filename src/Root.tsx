import {Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import RootRouter from "./Router/RootRouter";

const Root = () => {
    return <Layout>
        <Header></Header>
        <Content>
            <RootRouter/>
        </Content>
        <Footer style={{
            textAlign: 'center',
        }}>
            BokiCraft ©2023 Created by MihuYouGemHsi
        </Footer>
    </Layout>
}
export default Root;