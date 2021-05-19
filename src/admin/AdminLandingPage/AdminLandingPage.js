import React, { useState, useEffect}from "react";
import { withRouter, Link } from "react-router-dom";

function AdminLandingPage(props) {
    return (
        <div>
            <h1>admin</h1>
            <button><Link to='/adminMemberPage'>memberlist</Link></button>
            <button><Link to='/adminBoardPage'>board</Link></button>
  
        </div>

    )
}

export default withRouter(AdminLandingPage);