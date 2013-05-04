formbuilder
===========

Dynamic 'twitter bootstrap' form generator parsed on text input, heavily inspired by http://efbe.arc90.com/636775123b36e74524a1837e58a92c8eb08456ef and a little bit of markdown.

## Dependencies

* jQuery
* Twitter bootstrap css


## Usage

Include the formbuilder script and initialize some element

    <div id="formbuilder"></div>

    <script src="js/formbuilder.js "></script>
    <script>
      $(document).ready(function() {
        $('#formbuilder').formbuilder();
      });
    </script>

Default input field

    Name

(sub) Title
`# Title`
  
Complex(er) fields
`Name - arguments (comma seperated tuples "argument=value" )`

Checkboxes / radio button groups
`Name - t=checkbox`
`* First`
`* Second`
`* Third`
  
<table class='table'>
  <tr><th>Argument <th>Possible value(s)
  <tr><td><code>type</code> or <code>t</code> <td>text, textarea, select, radio, checkbox, file
  <tr><td><code>label</code><td>"Text"  
 <tr><td><code>id</code><td>"Text"
</table>