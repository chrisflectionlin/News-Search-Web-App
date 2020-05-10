import React from "react";
import "../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import {MdShare} from "react-icons/md";
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    EmailIcon,
    FacebookIcon,
    TwitterIcon
} from "react-share";


class Sharepopup extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }
    handleshow = (e) => {
        this.setState({showModal:true});
        e.preventDefault();
        e.stopPropagation();
    };
    handlehide = () => {
        this.setState({showModal:false});
    };

    render() {
        return (
            <>
                <MdShare
                    onClick={this.handleshow}
                    className="sharebutton"
                />
                <div onClick={(e)=> e.stopPropagation()}>
                    <Modal show={this.state.showModal} onHide={this.handlehide}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.props.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row className="text-center" sm={1}>
                                    <Col>
                                        <b>Share Via</b>
                                    </Col>
                                </Row>
                                <Row className="text-center" sm={3}>
                                    <Col>
                                        <FacebookShareButton
                                            url={this.props.url}
                                            hashtag={"#CSCI_571_NewsApp"}
                                        >
                                            <FacebookIcon round={true}/>
                                        </FacebookShareButton>
                                    </Col>
                                    <Col>
                                        <TwitterShareButton
                                            url={this.props.url}
                                            hashtags={["CSCI_571_NewsApp"]}
                                        >
                                            <TwitterIcon round={true}/>
                                        </TwitterShareButton>
                                    </Col>
                                    <Col>
                                        <EmailShareButton
                                            subject={"#CSCI_571_NewsApp"}
                                            url={this.props.url}
                                        >
                                            <EmailIcon round={true}/>
                                        </EmailShareButton>
                                    </Col>
                                </Row>
                            </Container>


                        </Modal.Body>
                    </Modal>
                </div>
            </>
        )
    }

}

export default Sharepopup;