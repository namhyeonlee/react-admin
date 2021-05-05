import React, { useState } from "react";
import { withRouter } from "react-router-dom";

function BoardMainPage(props) {

    const onUpdatePageHandler = (e) => {
        e.preventDefault();
        props.history.push("/boardupdate")
    }
    return (
        <div>
            <button onClick={onUpdatePageHandler}>글쓰기</button>
        </div>
    )
}

export default withRouter(BoardMainPage);
