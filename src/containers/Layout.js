import React, { Component } from "react";

import Navbar from "../components/Navbar";

class BaseLayout extends Component {
    render() {
        return (
            <div>
                <Navbar />
            </div>
        )
    }
}

export default BaseLayout;