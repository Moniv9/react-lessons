## What is react js?

A javascript library for creating maintainable, reusable & fast user interfaces.

## Why react js?

a. Easy to implement in existing project.
b. Rendering is fast because of virtual dom concept.
c. React implements one way data flow which reduces boilerplate.

and you can know a lot more by visiting  https://facebook.github.io/react/




## Lets begin with small lessons on how to use react.js



## Lesson  1

1. Show “Hello world” text using react component.

```
var HelloWorld = React.createClass({
    render:function(){
        return (<div>Hello World</div>);

    }
});

/* render an instance of HelloWorld into specific dom node  */
ReactDOM.render(<HelloWorld/>,document.getElementById('container'));

```

Points :

1. First letter of your component name should be upper case, else it will not render.
2. This is jsx style of writing react component, to know more about jsx visit https://facebook.github.io/react/docs/jsx-in-depth.html
3. Component must implement render function.
4. Render can even return null or false.
5. Render function return React elements, not actual DOM elements ( there is a difference between these two. Just consider react element as virtual representation of actual DOM ).
6. We cannot return multiple element / component from render function. It should return only one parent element / component.

```
/* will throw an error */

var HelloWorld = React.createClass({
    render: function () {
        return (
            <div>Hello World</div>
            <div>Hello</div>
            );

    }
});

ReactDOM.render(<HelloWorld/>, document.getElementById('container'));

```

```
/* should be used this way */

var HelloWorld = React.createClass({
    render: function () {
        return (
            <div>
                <div>Hello World</div>
                <div>Hello</div>
            </div>
        );

    }
});

ReactDOM.render(<HelloWorld/>, document.getElementById('container'));

```



**Should Know**

```
var element = React.createElement(HelloWorld) /* returns react element */
var el = <HelloWorld/> /* JSX style, and also return react element */

/* will call component constructor function & return component instance */
ReactDOM.render(element , domNodeToMountOn)

```

Also remember, react elements are just the virtual representation of actual DOM.









## Lesson 2

1. Show “hello world” text using props if passed, else use the default one.

```
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

ReactDOM.render(<HelloWorld value='hello world'/>, document.getElementById('container'));


```

Points :

1. Props are immutable.
2. We can define validation on props. Curious !!, we will learn about this later.
3. Props are nothing but plain javascript object, which act as component's configuration.
4. Props flows one way in React - from parents to children ( mostly ).








## Lesson 3

1. Show “hello world” text on render, and change to “hello” once clicked.

```
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
```


Points :


1. In react we have html attributes as camelCase ( e.g “onClick” ).
2. State is mutable, so it's minimal use is preferred.
3. Calling this.setState will re-render the dom/component, but in more intelligent way.
4. Use this._changeText, to call once clicked. If used this._changeText(), it will call it immediately once component is mounted.
5. **this.setState** does not immediately mutate the state, so using **this.state** after **this.setState** will return previous state only.
6. Again, state is too plain javascript object, which act as data source.
7. this.setState does not run synchronously, they are batched in queue








## Lesson 4

1. Show “hello world” text on render, and throw validation warning if not string or empty

```
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

ReactDOM.render(<HelloWorld value={5} />, document.getElementById('container'));
```


Points:

1.  Although this will show '5' on screen, but you will get warning on console.

![Error screenshot](https://raw.githubusercontent.com/Moniv9/react-lessons/master/images/1.png)







## Lesson 5

1. Submitting forms in react component

```
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
```









## Lesson 6

1. Basic auto suggest feature.

```
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
```








## Lesson 7

1. Understanding life cycle of react components.

```
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
        /* can perform ajax request here or can do some browser interaction */

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

```

Points:

1. Know more about component's lifecycle here [https://facebook.github.io/react/docs/component-specs.html#lifecycle-method](https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods)







## Lesson 8

1. Using classes and styles in react components.

```
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
```










## Lesson 9

1. Basic calendar in react.

```
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
```
