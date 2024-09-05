import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="p-1">
      <Row>
        <Col className="text-center py-3">
          Copyright &copy; {new Date().getFullYear()} Tech School. All rights
          reserved. <br />
          Designed by <Link to="https://mwinamijr.github.io">Mwinami Jr</Link>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
