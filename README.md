Formbuilder
===========

Build a form

```
// Simple input
Label text ( optionally add "| text or textarea ")

// Special input (i.e checkbox, radio, select)
Label text | radio
- Option a
- Option b
- Option c

// Text/Description
= Add descriptions in the middle of your form

// Label with description
Label text 
> Tiny description
```


## Examples

```
weekend*   (you also have shirt*)
```

Converts to:

```
Dieet | checkbox
- Vegetarisch
- Veganistisch

Maat shirt* | select
- Small
- Medium
- Large

Noodnummer*
> Telefoon nummer in geval van nood

Allergie/medicatie | textarea
> Waar moeten we rekening mee houden
```

Example with text

``` 
= Ik ga akkoord met de voorwaarden om deelnemerskosten voor deze reis te betalen, uiterlijk 25 februari. of ik moet me uiterlijk 1 maand voor aanvang der studiereis uitschrijven dmv een email contact met de organisatie. Mocht ik hiermee te laat zijn betaal ik als nog de deelnemerskosten. 

Betalen | checkbox
- Akkoord


In termijnen betalen| checkbox
- Ik betaal in twee termijnen
> Als ik aangeef in twee termijnen te betalen zal ik de eerste helft uiterlijk 25 januari betalen.
```


```
Hoe lang ga je mee? | radio
- 1 dag
- 2 dagen
```


## FAQ

##### I want to write text
> Use the symbol "=" at the start of a line and start typing.

##### I want to add whitespacing
> Two empty lines or three dashes "---" add whitespace. 

##### I need a dropdown
```
label text | select
- Option a
- Option b
```

##### I need a title
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
