var AutoSuggest = React.createClass({

    getInitialState: function () {
        return {
            results: []
        }
    },

    helper: {

        fetchResults: function (url, searchTerm) {
            var self = this;

            $.ajax({
                url: url + '?search=' + searchTerm,
                cache: false,
                datatype: 'json',
                method: 'GET',
                success: function (response) {
                    self.setState({ results: response });

                },
                error: function (xhr, status, err) {
                    self.setState({ results: [] });
                }

            })
        }
    },

    _onSearchChange: function (e) {
        var term = e.target.value;
        this.helper.fetchResults.apply(this, ['/countries', term]);
    },

    render: function () {
        return (<div>
            <input type='text' placeholder='search' onChange={this._onSearchChange.bind(this) } />
            <SearchItems results={this.state.results} />
        </div>);
    }

});

var SearchItems = React.createClass({

    render: function () {
        return (
            <ul>
                { this.props.results.map(function (item) {
                    return <li>{item.name }</li>
                }) }
            </ul>

        );
    }

});


ReactDOM.render(<AutoSuggest/>, document.getElementById('container'));