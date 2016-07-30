var HelloWorld = React.createClass({
    getInitialState: function () {
        return {
            value: 'Hello World'
        }
    },

    _changeText: function () {
        this.setState({ value: 'Hello' });
    },

    render: function () {
        return (
            <div onClick={this._changeText}>
                {this.state.value}
            </div>
        )
    }

});

ReactDOM.render(<HelloWorld/>, document.getElementById('container'));