var Calendar = React.createClass({
    render: function () {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return (<div><Month months={months}/></div>);
    }
});

var WeekDays = React.createClass({
    render: function () {
        var weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        return (<ul className='weekdays'>
            { weekDays.map(function (weekDay) {
                return <li>{weekDay}</li>;
            }) }
        </ul>
        );
    }
});

var Days = React.createClass({
    helper: {
        getMonthDays: function (year, month, backlogDays) {
            this.setUrl(year, month);

            var totalDays = new Date(year, month + 1, 0).getDate();
            var prevMonthDays = new Date(year, month, 0).getDate();

            var days = [];
            for (var i = prevMonthDays - backlogDays; i <= prevMonthDays; i++)
                days.push({ day: i, prev: true });

            for (var i = 1; i <= totalDays; i++)
                days.push({ day: i, prev: false });

            return days;
        },

        emptyDays: function (year, month, backlogDays) {
            var prevMonthDays = new Date(year, month, 0).getDate();
            var dayOfMonth = new Date(month == 0 ? year - 1 : year, month == 0 ? 11 : month - 1, prevMonthDays - backlogDays).getDay();
            dayOfMonth = (dayOfMonth == 0) ? 7 : dayOfMonth;

            var emptyDays = [];
            for (var i = 1; i < dayOfMonth; i++)
                emptyDays.push(i);

            return emptyDays;
        },

        setUrl: function (year, month) {
            window.location.href = '#' + year + '#' + month;
        }

    },

    render: function () {
        var days = this.helper.getMonthDays(this.props.year, this.props.month, this.props.backlogDays);
        var emptyDays = this.helper.emptyDays(this.props.year, this.props.month, this.props.backlogDays);

        return (<ul className='days'>
            {
                emptyDays.map(function () {
                    return <li></li>;
                }) }

            {
                days.map(function (item) {
                    return item.prev ? <li>{item.day}</li> : <li><strong>{item.day}</strong></li>;

                }) }
        </ul>
        )

    }
});

var Month = React.createClass({
    getInitialState: function () {
        var value = window.location.href.split('#');

        return {
            month: parseInt(value[2]) || (new Date()).getMonth(),
            year: parseInt(value[1]) || (new Date()).getFullYear()
        }

    },

    getDefaultProps: function () {
        return {
            backlogDays: 1
        }
    },

    localEvents: {
        prevOnClick: function () {
            this.setState({ month: this.state.month == 0 ? 11 : this.state.month - 1 });
            if (this.state.month == 0) this.setState({ year: this.state.year - 1 });
        },

        nextOnClick: function () {
            this.setState({ month: this.state.month == 11 ? 0 : this.state.month + 1 });
            if (this.state.month == 11) this.setState({ year: this.state.year + 1 });
        },

        monthOnChange: function (month) {
            var months = this.props.months;
            this.setState({ month: months.indexOf(month) });
        },

        yearOnChange: function (year) {
            this.setState({ year: year });
        }
    },


    render: function () {
        var months = this.props.months;
        var self = this;

        return (
            <div>
                <div className="dropdown">
                    <span className='pointer'>Selected month - {months[this.state.month]}</span>
                    <div className="dropdown-content">
                        {months.map(function (month) {
                            return <p onClick={self.localEvents.monthOnChange.bind(self, month) }>{month}</p>
                        }) }
                    </div>
                </div>
                <div className="dropdown">
                    <span className='pointer'>Selected year -  {this.state.year}</span>
                    <div className="dropdown-content">
                        {[2012, 2013, 2014, 2015, 2016, 2017, 2018].map(function (year) {
                            return <p onClick={self.localEvents.yearOnChange.bind(self, year) }>{year}</p>
                        }) }
                    </div>
                </div>
                <div className='month'>
                    <ul>
                        <li className='prev' onClick={this.localEvents.prevOnClick.bind(this) }>❮</li>
                        <li className='next' onClick={this.localEvents.nextOnClick.bind(this) }>❯</li>
                        <li className='monthname'>
                            {months[this.state.month]}<br/>
                            <span className='yearname'>{this.state.year}</span>
                        </li>
                    </ul>
                </div>
                <WeekDays /><Days year={this.state.year} month={this.state.month} backlogDays={this.props.backlogDays} />
            </div>
        )
    }

});




ReactDOM.render(< Calendar / >, document.getElementById('calendar'));
