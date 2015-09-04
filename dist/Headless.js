/*! The MIT License (MIT)

Copyright (c) <2015> <Shreyansh Pandey>

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
THE SOFTWARE. */

(function() {

    /*
        getExtension( str:String ) => Gets the extension of the file name provided.
    */
    function getExtension( str ) {

      return str.substring( str.lastIndexOf( '.' ) + 1 );

    }

    /*
        doesFileExist( fileName:String ) => Executes a simple HTTP 1.0/HEAD request to check if a file exists.
    */
    function doesFileExist( fileName ) {

      var xhr = new XMLHttpRequest();

      xhr.open( 'HEAD', fileName, false );
      xhr.send();

      return ( !(xhr.status === "404") );

    }

    var Headless = function(resourceArray) {

        var scriptElements = [],
            cssElements    = [],
            elements       = [];

        var headElement    = document.getElementsByTagName( 'head' )[0].toString();

        // Loads all the elements provided as argument.
        this.load = function() {

          /* ================================
             Begin File Indexing Loop
          */

          for ( var i = 0; i < resourceArray.length; i++ ) {

            var currentItem = resourceArray[ i ],
                extension   = getExtension( currentItem );

            // Check if the file exists.
            if ( !doesFileExist( currentItem ) ) {
              console.log("HEADLESS DEBUG: FILE " + currentItem + " DOES NOT EXIST. SKIPPING.");
              continue;
            }

            if ( extension === "js" ) {
              scriptElements.push( currentItem );
            } else if ( extension === "css" ) {
              cssElements.push( currentItem );
            } else { continue; }

          }

          /* ================================
             End File Indexing Loop
          */



          /* ================================
             Adding File to the array
          */

          for ( var i = 0; i < scriptElements.length; i++ ) {

            var tag = document.createElement( 'script' );
            tag.src = scriptElements[ i ];

            elements.push( tag );

          }

          for ( var i = 0; i < cssElements.length; i++ ) {

            var tag = document.createElement( 'link' );

            tag.rel  = "stylesheet";
            tag.href = cssElements[ i ];

            elements.push( tag );

          }


          /* ================================
             Adding elements to the HEAD of the document.
          */

          for ( var i = 0; i < elements.length; i++ ) {

            document.head.appendChild( elements[ i ] );

          }

        };

        return this;

    };

    window.headless = Headless;

})();
