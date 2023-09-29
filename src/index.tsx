import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import Main from "./Main";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import {App} from "antd";
import {HoxRoot} from "hox";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>

        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            <App>
                <HoxRoot>
                    <BrowserRouter>
                        <Main/>
                    </BrowserRouter>
                </HoxRoot>
            </App>
        </DevSupport>
    </React.StrictMode>
);
