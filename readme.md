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

ReactDOM.render(<HelloWorld/>,document.getElementById('container'));

```

Points :

1. First letter of your component name should be upper case, else it will not render.
2. This is jsx style of writing react component, to know more about jsx visit https://facebook.github.io/react/docs/jsx-in-depth.html
3. We cannot return multiple element / component from render function. It should return only one parent element.

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
2. We can define validation on props. Curious, we will learn about this later.




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

1. In react we have html attributes as camelCase ( e.g “onClick” )
2. Calling this.setState will re-render the dom/component, but in more intelligent way.
3. Use this._changeText, to call once clicked. If used this._changeText(), it will call it immediately once component is mounted.



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

[Image: https://quip.com/-/blob/LfbAAAKVWRi/YYQuZv3-2kHfmCWhFze51A]


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








