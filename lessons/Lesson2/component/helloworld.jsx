var HelloWorld = React.createClass({
    getDefaultProps: function () {
        return {
            value: "default hello world"
        }
    },

    render: function () {
        return (<div>{this.props.value}</div>);

    }
});

(new HelloWorld({})).render();

//ReactDOM.render(<HelloWorld value='hello world'/>, document.getElementById('container'));