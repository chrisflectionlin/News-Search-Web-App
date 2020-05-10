import React from 'react';
import commentBox from 'commentbox.io';

class Commentbox extends React.Component {

    componentDidMount() {

        this.removeCommentBox = commentBox('5703892713078784-proj',{
            defaultBoxId: this.props.id
        });
    }

    componentWillUnmount() {

        this.removeCommentBox();
    }

    render() {

        return (
            <div className="commentbox" id={this.props.id}/>
        );
    }
}

export default Commentbox;