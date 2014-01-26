# list
  
  [![Build Status](https://secure.travis-ci.org/chemzqm/list.png)](http://travis-ci.org/chemzqm/list)

  list view component for add, remove, filter, sort, reactive etc.

  [demo](http://chemzqm.github.io/list/)


## Installation

  Install with [component(1)](http://component.io):

    $ component install chemzqm/list

## Events

  * `added` triggered with the model object added by calling add method.
  * `removed` triggered with the model object removed by calling remove method.

## Event binding

You can bind event like [component/reactive](https://github.com/component/reactive):

``` html
  <button on-click="destroy">remove</button>
```

Add function `destroy` to your list instance and it will be called with `event object`, `item element` and relative `model object`.

## API

### List(parent, Element)

  Use element(could be html string) for reactive view which append to parent

### .bind(Array)

  Bind array of model objects to list.

### .add(obj, [top])

  Add obj to this list at bottom or top (when top is true).

### .remove([Number|String|Function])

  Remove models from list by index or to-function string or function called by each model object.
  When arguments is empty, all models are removed.
  **Note** `removed` event is not triggered when arguments is empty.

### .sort(fn, [desc])

  Sort all the elements with `fn` called by array.sort()

### .filter([String|Function])

  Show the elements which return true by the `function` called by each model, or all the elements with no arguments.

## License

  The MIT License (MIT)

  Copyright (c) 2013 <copyright chemzqm@gmail.com>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
