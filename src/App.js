import React from "react";
import Home from "./Component/Home";
import {Route, Switch} from "react-router-dom";
import Sports from "./Component/Sports";
import Business from "./Component/Business";
import Technology from "./Component/Technology";
import Politics from "./Component/Politics";
import World from "./Component/World";
import DetailedArticle from "./Component/DetailedArticle";
import Bookmark from "./Component/Bookmark";
import Search from "./Component/Search";

class App extends React.Component {

    render() {
        return (
            <>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/sports" component={Sports}/>
                    <Route exact path="/world" component={World}/>
                    <Route exact path="/politics" component={Politics}/>
                    <Route exact path="/business" component={Business}/>
                    <Route exact path="/technology" component={Technology}/>
                    <Route exact path="/article?id=:title" component={DetailedArticle}/>
                    <Route exact path="/bookmark" component={Bookmark}/>
                    <Route exact path="/search?q=:query" component={Search}/>
                </Switch>
            </>
        );
    }
}


export default App;