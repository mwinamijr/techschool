import React, { Component } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

class BaseLayout extends Component {
    render() {
        return (
            <div>
                <Navbar />
                { this.props.children }
                <Footer />
            </div>
        )
    }
}

export default BaseLayout;