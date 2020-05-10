import React from "react";
import "../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Switch from "react-switch";
import {NavLink} from "react-router-dom";
import {MdBookmarkBorder, MdBookmark} from "react-icons/md";
import Autosuggest from "./Autosuggest";
import ReactTooltip from "react-tooltip";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentpage: window.location.pathname
        };
    }

    strToBool(str) {
        if (typeof str === "undefined") return false;
        if (str === "true") {
            return true;
        } else {
            return false;
        }
    }

    renderBookmark() {
        if (this.state.currentpage === "/bookmark") {
            return (
                <Nav>
                    <Nav.Item>
                        <Nav.Link as={NavLink} exact to="/bookmark">
                            <div style={{color: 'white'}}>
                                <MdBookmark
                                    size={35}
                                    data-tip="Bookmark"
                                    data-for="navbar"
                                    className="mt-1"
                                />
                            </div>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            );
        } else if (
            this.state.currentpage.slice(0, 7) === "/search" ||
            this.state.currentpage.slice(0, 8) === "/article") {
            return (
                <Nav>
                    <Nav.Item>
                        <Nav.Link as={NavLink} exact to="/bookmark">
                            <div style={{color: 'white'}}>
                                <MdBookmarkBorder
                                    size={35}
                                    data-tip="Bookmark"
                                    data-for="navbar"
                                    className="bookmark mt-1"
                                />
                            </div>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            );
        } else {
            return (
                <Nav>
                    <Nav.Item>
                        <Nav.Link as={NavLink} exact to="/bookmark">
                            <div style={{color: 'white'}}>
                                <MdBookmarkBorder
                                    size={35}
                                    data-tip="Bookmark"
                                    data-for="navbar"
                                    className="bookmark"
                                />
                            </div>
                        </Nav.Link>
                    </Nav.Item>
                    <Navbar.Text className="mt-1"><span className="navright">NYTimes</span></Navbar.Text>
                    <Switch
                        onChange={() => {
                            this.props.toggled()
                        }}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        checked={this.strToBool(window.localStorage.getItem("isGuardian"))}
                        onColor="#27A8E0"
                        className="ml-2 mr-2 mt-2"
                    />
                    <Navbar.Text className="mt-1"><span className="navright">Guardian</span></Navbar.Text>
                </Nav>
            );
        }
    }

    renderAutosuggest(){
        if(this.state.currentpage.slice(0, 7) === "/search"){
            return(
                <Autosuggest
                    inSearch={true}
                    holder = {this.props.query}
                />
            );
        }else{
            return(
                <Autosuggest />
            );
        }
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" variant="dark">
                <ReactTooltip
                    place="bottom"
                    id="navbar"
                />
                <Nav.Item style={{width: "300px"}}>
                    {this.renderAutosuggest()}
                </Nav.Item>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} exact to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/world">World</Nav.Link>
                        <Nav.Link as={NavLink} to="/politics">Politics</Nav.Link>
                        <Nav.Link as={NavLink} to="/business">Business</Nav.Link>
                        <Nav.Link as={NavLink} to="/technology">Technology</Nav.Link>
                        <Nav.Link as={NavLink} to="/sports">Sports</Nav.Link>
                    </Nav>
                    {this.renderBookmark()}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;