Formbuilder
===========

Dynamic 'twitter bootstrap' form generator parsed on text input, inspired by http://efbe.arc90.com/636775123b36e74524a1837e58a92c8eb08456ef


## Examples



### FAQ

I want to write text
> Use the symbol "=" at the start of a line and start typing.

I want to add whitespacing
> Two empty lines or three dashes "---" add whitespace. 

I need a dropdown
> label text | select
> - Option a
> - Option b

I need a title
> Use "#" at the beginning of the line



## Dependencies

* jQuery
* Twitter bootstrap css

## Usage

Include the formbuilder script and initialize a div. It will generate a textarea and preview for you.

    <div id="formbuilder"></div>

    <script src="js/formbuilder.js "></script>
    <script>
      $(document).ready(function() {
        $('#formbuilder').formbuilder();
      });
    </script>
