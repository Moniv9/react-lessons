var HelloWorld = React.createClass({

    inlineStyle: {
        color: 'green',
        marginLeft: '50%',
        fontSize: '24px',
        fontWeight: 'bold'
    },

    render: function () {
        return (
            <div className='someclass'>
                <div style={this.inlineStyle}>Hey</div>
            </div>
        );
    }

});

ReactDOM.render(<HelloWorld/>, document.getElementById('container'));