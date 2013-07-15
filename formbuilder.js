// Author: Fabien Tesselaar (https://github.com/Tessmore/formbuilder)

(function($, window, undefined){
  $.fn.formbuilder = function(opts) {

    var templates = $('#formbuilder-templates'); 

    var defaults = {
      'throttle'       : 500,
      'separator'      : '|',
      'args_separator' : ','
    };

    opts = $.extend(defaults, opts);

    var textarea = $(this).find('#builder-input');
    var result   = $(this).find('#result-html');
    var form     = $(this).find('#form');
 
    // Build the form on ENTER, losing focus or after certain periods of typing
    textarea.on('keydown change', function(e) {
      if (e.keyCode === 13 || e.type === 'change') {
        window.clearInterval(timer);
        build_form;
        return;
      }
      
      var timer = setTimeout(build_form, opts.throttle);
    });
      
    var build_form = function build() {
      form.html(''); // Reset
      var lines = textarea.val().split("\n");
      
      for (var i=0; i < lines.length; i++) {
        var line       = trim(lines[i], ' ');
        var first_char = line.charAt(0);
        var attributes = {};
        var type       = '';

        // Trim spaces; Skip empty lines
        if (line === '')
          continue;
          
        if (line.toLowerCase() === "weekend") {
          lines[i] = '';
          lines.splice(i, 0, 
            'Dieet | checkbox', 
            '-Vegetarisch', 
            '-Veganistisch',
            'shirt',
            'Noodnummer',
            '> Telefoon nummer in geval van nood',
            'Allergie/medicatie | textarea',
            '> Waar moeten we rekening mee houden'
          );

          textarea.val(lines.join("\n"));
          textarea.trigger('keyup');
          break;
        }

        if (line.toLowerCase() === "shirt") {
          lines[i] = '';
          lines.splice(i, 0, 
            'Shirt maat | select',
            '-Small',
            '-Medium',
            '-Large'
          );

          textarea.val(lines.join("\n"));
          textarea.trigger('keyup');
          break;
        }
        
        // Check first character; Add headline '#' or paragraph '$'
        if (first_char === '#' || first_char === '$') {
          add((first_char === '$' ? '<p>' : '<h3>') + trim(line, '#$ '));
          continue;
        }

        // Check first character; Add additional info after the label '>'
        if (first_char === '>') {
          form.find('label').last().after('<small>' + trim(line, '> ') + '</small>');
          continue;
        }
          
        // First character is not special; 
        // Check the line is simple `input type="text"` field
        if (line.indexOf(opts.separator) === -1) {
          var label = line;
          var field = templates.find('.text');
          var input = field.find('input');
        }
        else {
          // There are arguments; let's find them
          var tmp   = line.split(opts.separator); 
          var label = trim(tmp[0], ' ');
          
          if (tmp[1]) {
            var args = tmp[1].replace(/["' ]/g, '').split(opts.args_separator);

            for (arg in args) {
              argument = args[arg].split('=');
              
              if (argument[0] === 'textarea' || 
                  argument[0] === 'select'   || 
                  argument[0] === 'radio'    || 
                  argument[0] === 'checkbox') {
                type = argument[0];
              }
              else if (argument[0] === 't' || argument[0] === 'type')
                type = argument[1];
              else
                attributes[argument[0]] = argument[1];
            }
          }
          
          // If a type is found; lets build it
          switch(type) {
            case 'textarea' :
              var field = templates.find('.textarea');
              var input = field.find('textarea');
            break;
            
            case 'select':
              var field = templates.find('.select');
              var input = field.find('select');
              var options = [];
              
              while (++i < lines.length && lines[i].charAt(0) === '-')
                options.push('<option>', trim(lines[i], '- '), '</option>');
              
              i--;
              input.html(options.join(''));
            break;
            
            case 'radio' :
            case 'checkbox' :
              // Since it uses additional labels, the radio / checkbox 
              // continues earlier
              
              var field = templates.find('.box');
                  field.find('label').text(label);
              var input = field.find('.controls');
              var name  = label.replace(/[ ]/g, '_') + '[]';
              var options = [];

              while (++i < lines.length && lines[i].charAt(0) == '-') {
                var val = trim(lines[i], '- ');
                
                options.push(
                  '<label class="checkbox">', 
                    '<input type="'+ type +'" ', 
                      'name="'+ name +'" ',
                      'value="'+ val +'">',
                    val,
                  '</label>'
                );
              }
                  
              i--;
              input.html(options.join(''));
              
              // Add the object to the form
              add(field.clone());
              continue;
            break;
            
            default :
              var field = templates.find('.text');
              var input = field.find('input');
            break;
          }
        }
        
        // Set 'standard' name, same as the label. Can be overridden
        field.find('label').text(label);
        input.attr('name', trim(label, '!@#$%.,:;').replace(/[ ]/g, '_'));
        
        // Add the attributes
        for (attribute in attributes)
          input.attr(attribute, attributes[attribute]);

        // Add the object to the form
        add(field.clone());
      }
      
      // Add the html in result if needed
      result.text(form.html());
    }
    
    function add(str) {
      var tmp = form.append(str).html();
      form.html(tmp + "\n\n");
    }
    
    // Remove character set (string) from beginning and end of string
    function trim(str, characters) {
      var c_array = characters.split('');
      var result  = '';
      
      for (var i=0; i < characters.length; i++)
        result += '\\' + c_array[i];

      return str.replace(
        new RegExp('^['+ result +']+|['+ result +']+$', 'g'), 
        ''
      );
    }

    return this;
  };
})(jQuery, window);