req-flash
=========

Unopinionated middleware for creating flash messages of all types for Express apps.

## Usage

### 1. Install req-flash:

``` javascript
npm install req-flash
```

### 2. Register the req-flash middleware after your session middleware:

``` javascript
var express      = require('express');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var flash        = require('req-flash');

var app          = express();

app.use(cookieParser());
app.use(session({ secret: '123' }));
app.use(flash());
```

**Tipp:** Use `flash({ locals: 'flash' })` to magically make all flash messages available to your views by attaching them to `res.locals['flash']` (or whatever you specifiy instead of 'flash').

### 3. Flash any amount of messages:

``` javascript
app.get('/test', function() {
	req.flash('successMessage', 'You are successfully using req-flash');
	req.flash('errorMessage', 'No errors, you\'re doing fine');

	res.redirect('/');
});

app.get('/', function() {
	res.send(req.flash());
});
```

"/test" redirects to "/" and outputs:

```
{
	"successMessage": "You are successfully using req-flash",
	"errorMessage": "No errors, you're doing fine"
}
```