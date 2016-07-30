var AppForm = React.createClass({

    getInitialState: function () {
        return {
            msg: ""
        }
    },

    helper: {
        postToServer: function (url, jsonData) {
            var self = this;

            $.ajax({
                url: url,
                dataType: 'json',
                cache: false,
                data: jsonData,
                method: 'POST',
                success: function (response) {
                    self.setState({ msg: response.key });
                },
                error: function (xhr, status, err) {
                    self.setState({ msg: 'Something went wrong' })
                }
            });

        }
    },

    _onSubmit: function (e) {
        e.preventDefault();

        var value = ReactDOM.findDOMNode(this.refs.name).value;
        this.helper.postToServer.apply(this, ['/submitdetails', { name: value }]);

    },


    render: function () {
        return (
            <form onSubmit={this._onSubmit.bind(this) }>
                <input ref='name' type='text' placeholder='Enter name' name='name' />
                <button>Submit</button><br/>
                <label>{this.state.msg}</label>
            </form>
        );

    }
});



ReactDOM.render(<AppForm/>, document.getElementById('container'));