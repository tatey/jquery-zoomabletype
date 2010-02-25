# Zoomable Type: Mac OS X’s “Show in Large Type” for jQuery

## What

Zoomable Type is a jQuery plugin for reading small text on a display from far away. Text is upscaled to the largest size based on its width and the browser's viewpoint. [Try the live examples](http://zoomabletype.tatey.com/).

![Preview](http://cloud.github.com/downloads/tatey/jquery.zoomable_type/preview.png)

Zoomed text will remain centred in the browser after scrolling or resizing.

Zoomable Type is completely unobtrusive. You only need to set a common class on the elements you care about for them to become zoomable. Works great with the hCard microformat.

The plugin is compatible with all modern browsers, including IE7+. Browsers without CSS3 support fallback to satisfactory defaults.

## Why?

I'm building a web application with many contact numbers.

Reading a contact number off a display and typing it into a handset can be difficult when the text is small and you lose your place.

Apple have already solved this problem in Mac OS X with the “Show in Large Type” functionality found in Address Book and Mail. Zoomable Type implements this as a jQuery plugin for the web.

## How?

Markup your zoomable elements. An element becomes zoomable when you set the `zoomable` class.

    My contact number is <span class="zoomable">(05) 3581 8761</span>
    
Load jQuery, the plugin and the stylesheet.

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" type="text/javascript"></script>
    <script src="jquery.zoomable_type.js" type="text/javascript"></script>
    <link rel="stylesheet" href="jquery.zoomable_type.css" type="text/css" media="all" />
    
Invoke Zoomable Type on DOM ready and you're done!

    jQuery(document).ready(function() {
      jQuery.zoomableType();
    });
    
Optionally, bind to any elements.

    jQuery.zoomableType('.telephone'); // Default is '.zoomable'

## Licence

The MIT Licence

Copyright (c) 2010 Tate Johnson (http://tatey.com)

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
