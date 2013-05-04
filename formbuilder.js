// Author: Fabien Tesselaar (https://github.com/Tessmore/formbuilder)

$.fn.formbuilder = function() {  

  var textarea = $('<textarea />');
  var result   = $('<pre />');
  var form     = $('<form />');
  var group    = $('<div class="control-group" />');
  var controls = $('<div class="controls" />');
  var label    = $('<label class="control-label" />');
  
  var fields = {
    'text'     : $('<input type="text" name id>'),
    'radio'    : $('<div />'),
    'checkbox' : $('<div />'),
    'textarea' : $('<textarea name id />'),
    'select'   : $('<select name id></select>'),
    'file'     : $('<input type="file" name id>')
  };

  this
    .append(textarea)
    .after(result)
    .after('<h3>Result</h3>')
    .after(form)
    .after('<h3>Preview</h3>');

  textarea.on('keyup', function() {
    form.html(''); // Reset the control
    var lines = this.value.split("\n");
    
    for (var i=0; i < lines.length; i++) {
      if (lines[i].charAt(0) == '#') {
        form.append('<h3>' + lines[i].substring(1) + '</h3>');
        continue;
      }
      
      options = parseLine(lines[i]);
      type    = options.type || options.t || "text";
      
      if (! options || !fields[type])
        continue;

      group
        .append(label.text(options.label))
        .append(
          controls.html(
            fields[type]
              .attr('name', options.name)
              .attr('id',   options.id)
         ));
      
      if (type === 'select' || type === 'radio' || type === 'checkbox') {
        fields[type].html(''); // Reset the list
        
        while (++i < lines.length && lines[i] && (lines[i].charAt(0) == '*' || lines[i].charAt(0) == '-')) {
          value = lines[i].substring(1);
          
          if (type === 'select')
            fields[type].append($('<option />').text(value));
          else
            fields[type].append(
              '<label class="checkbox">' +
                '<input type="' + type + '" name="' + (type === 'radio' ? options.name : value) + '" value="' + value + '"> ' + 
                value + 
              '</label>'
            );
        }
        
        i--; // Go back 1 step to parse the next element without #hashtag
      }
      
      group.clone().appendTo(form);
    }
    
    result.text(form.html());
  });
  
  function parseLine(line) {
    var line = line.trim().replace(/["']/g, '').split("-");
    var name = line[0];

    if (name == "") // Skip empty lines
      return false;
          
    var options = {
      label : name,
      name  : name.replace(/[ ]/g, '_')
    };
    
    if (line[1]) {
      var args = line[1].replace(/[ ]/g, '').split(',');
      
      for (i in args) {
        argument = args[i].split('=');
        options[argument[0]] = argument[1];
      }
    }

    return options;
  }  
};
