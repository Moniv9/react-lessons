var HelloWorld = React.createClass({
    propTypes: {
        value: React.PropTypes.string.isRequired
    },

    getDefaultProps: function () {
        return {
            key: "default hello world"
        }
    },

    render: function () {
        return (<div>{this.props.value}</div>);

    }
});

ReactDOM.render(<HelloWorld value={'sdf'} />, document.getElementById('container'));