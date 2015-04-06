'use strict';

var $ = require('jquery');
var React = require('react');

var StatusIndicator = React.createClass({
    render : function() {
        return (
            <div id="status_indicator">The Speakers are {this.props.status}</div>
        );
    }
});

var ToggleSpeakerButton = React.createClass({
    getInitialState : function() {
        return {
            status : ''
        };
    },
    render : function() {
        return (
            <button id="toggle_button" onClick={this.props.toggleSpeakers}>Toggle Speaker Power !</button>
        );
    }
});

var SpeakerSwitcherApp = React.createClass({
    getInitialState : function() {
        return {
            status : 'getting status ...'
        };
    },
    componentDidMount : function() {
        $.get('status', function(result) {
            if (this.isMounted()) {
                this.setState({
                    status : result.status
                });
            }
        }.bind(this));
    },
    ajaxToggleSpeakers : function(){
        this.setState({
            status : 'being toggled ...'
        });
        $.post('switch', function(result) {
            if (this.isMounted()) {
                this.setState({
                    status : result.status
                });
            }
        }.bind(this));
    },
    render : function() {
      return (
        <div>
            <StatusIndicator status={this.state.status}/>
            <ToggleSpeakerButton toggleSpeakers ={this.ajaxToggleSpeakers}/>
        </div>
      );
    }
});

React.render(<SpeakerSwitcherApp/>, document.getElementById('main'));
