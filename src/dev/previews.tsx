import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import SubmitTicketComponent from "../Component/SubmitTicketComponent";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/SubmitTicketComponent">
                <SubmitTicketComponent/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;