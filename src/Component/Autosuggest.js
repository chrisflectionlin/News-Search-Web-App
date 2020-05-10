import React from "react";
import "../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import AsyncSelect from 'react-select/async';
import {Redirect} from "react-router-dom";
import _ from 'lodash';

class Autosuggest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queryString: "",
            redirect: false
        }
    }

    renderRedirect = () => {
        if(this.state.redirect){
            return (
                <Redirect to={{
                    pathname: "/search?q=" + this.state.queryString
                }}/>
            );
        }
    };

    toSearchPage = (v: string) => {
        this.setState({
            queryString: v.value,
            redirect: true
        });
    };

    autoSuggestion = async (input: string) => {
        let suggestion = [{value: input, label:input}];
        try {
            const apicall = await fetch(
                "https://csci571-beingautosuggestion.cognitiveservices.azure.com/bing/v7.0/suggestions?mkt=en-US&q=" + input,
                {
                    headers: {
                        "Ocp-Apim-Subscription-Key": "20438b581e8b4b7b995afcc2f48ea2ff"
                    }
                }
            );
            const response = await apicall.json();
            let data = response["suggestionGroups"][0]["searchSuggestions"];
            for(const result of data){
                suggestion.push({
                    value: result["displayText"],
                    label: result["displayText"]
                });
            }
            return suggestion
        } catch (e) {
            console.log('Autosuggestion call failed');
            return suggestion;
        }
    };

    renderAsyncSelect(){
        if(this.props.inSearch){
            return (
                <AsyncSelect
                    placeholder = {this.props.holder}
                    loadOptions={_.debounce(this.autoSuggestion,1000,{leading:true})}
                    cacheOptions
                    onChange={this.toSearchPage}
                />
            );
        }else{
            return(
                <AsyncSelect
                    placeholder = "Enter keyword..."
                    loadOptions={_.debounce(this.autoSuggestion,1000,{leading:true})}
                    cacheOptions
                    onChange={this.toSearchPage}
                />
            );
        }
    }

    render() {
      return (
          <>
              {this.renderRedirect()}
              {this.renderAsyncSelect()}
          </>

      );
    }
}

export default Autosuggest;