var LifeCycle = React.createClass({
    getInitialState: function () {
        return {
            value: "initial value"
        }
    },

    componentWillMount: function () {
        console.log('component will mount');
    },

    componentDidMount: function () {
        /* can perform ajax request here */

        console.log('component did mount');
    },

    componentWillUpdate: function () {
        console.log('component will update');
    },

    componentDidUpdate: function () {
        console.log('component did update');
    },

    componentWillUnmount: function () {
        console.log('component will unmount');
    },

    _changeState: function () {
        this.setState({ value: 'changed value' });
    },

    render: function () {
        return (
            <div>
                <button onClick={this._changeState}>Change State</button><br/>
                <label>{this.state.value}</label>
                <Child value={this.state.value} />
            </div>
        );
    }

});

var Child = React.createClass({

    componentWillReceiveProps: function () {
        console.log('component will recieve new props');
    },

    render: function () {
        return null;
    }

})

ReactDOM.render(<LifeCycle/>, document.getElementById('container'));