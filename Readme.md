# list

  list view for add/remove/filter/reactive etc.

  TODO: test

  TODO: remove dom event listeners, as reactive limitation, currently not available.

## Installation

  Install with [component(1)](http://component.io):

    $ component install chemzqm/list

## API

### List(parent, template)

  User template for reactive view which append to parent

### .bind(Array)

  Bind array to list.

### .add(obj, [top])

  Add obj to this list at bottom.

### .remove(Number|String|Function)

  Remove models from list by index or to-function string or function called by each model object

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
