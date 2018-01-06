/*
	wiki2HTML Parses wiki markup and generates HTML 5 showing a preview.
    Copyright (C) 2010-2013 Elia Contini

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see http://www.gnu.org/licenses/.
 */

// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp

var wiki2html = {

  version_w2h:"1.1.1",

	parse: function(wikicode) {
		var html = '<p>function wiki2html(wikicode): an error occurs</p>';

		wikicode = this._deleteCR(wikicode);
		wikicode = this._headers(wikicode);
		wikicode = this._horizontalRule(wikicode);
		wikicode = this._inlineElement(wikicode);
		wikicode = this._list(wikicode);
		wikicode = this._table(wikicode);
		wikicode = this._paragraph(wikicode);
		wikicode = this._toc(wikicode);

		html = wikicode;

		return html;
	},

	// this function normalize line breaks
	// in order to have a common base string
	// for all browser
	_deleteCR: function (wikicode) {
		wikicode = wikicode.replace(/\r/g, '');
		return wikicode;
	},

	// *******************************************************************************
	// *                                    HEADER                                   *
	// *******************************************************************************
	_headers: function(wikicode) {
		var heading_1_regEx = /^=[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?=/gm;
		var heading_2_regEx = /^==[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?==/gm;
		var heading_3_regEx = /^===[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?===/gm;
		var heading_4_regEx = /^====[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?====/gm;
		var heading_5_regEx = /^=====[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?=====/gm;
		var heading_6_regEx = /^======[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?======/gm;

		wikicode = wikicode.replace(heading_6_regEx, '<h6>$1</h6>');
		wikicode = wikicode.replace(heading_5_regEx, '<h5>$1</h5>');
		wikicode = wikicode.replace(heading_4_regEx, '<h4>$1</h4>');
		wikicode = wikicode.replace(heading_3_regEx, '<h3>$1</h3>');
		wikicode = wikicode.replace(heading_2_regEx, '<h2>$1</h2>');
		wikicode = wikicode.replace(heading_1_regEx, '<h1>$1</h1>');

		return wikicode;
	},

	// *******************************************************************************
	// *                             HORIZONTAL LINE                                 *
	// *******************************************************************************
	_horizontalRule: function(wikicode) {
		var horizontalLine = /----/g;

		wikicode = wikicode.replace(horizontalLine, '<hr>');

		return wikicode;
	},

	// *******************************************************************************
	// *                               INLINE ELEMENT                                *
	// *******************************************************************************
	_inlineElement: function(wikicode) {
		var strongEm = /'''''([0-9A-Za-z].*)'''''/g;
		var strong = /'''([0-9A-Za-z].*)'''/g;
		var em = /''([0-9A-Za-z].*)''/g;
		var image = /\[\[File:(.[^\]|]*)([|]thumb|frame)?([|]alt=.[^\]|]*)?([|].[^\]|]*)?\]\]/g;
		var anchor = /\[([a-zA-Z0-9].[^\s]*) ([a-zA-Z0-9].[^\]]*)\]/g;

		wikicode = wikicode.replace(strongEm, '<strong><em>$1</em></strong>');
		wikicode = wikicode.replace(strong, '<strong>$1</strong>');
		wikicode = wikicode.replace(em, '<em>$1</em>');

		while(tokens = image.exec(wikicode)) {
			if(tokens.length == 5 &&
				typeof(tokens[2]) != 'undefined' &&
				typeof(tokens[3]) != 'undefined' &&
				typeof(tokens[4]) != 'undefined') {
				tokens[2] = tokens[2].replace('|', '');
				tokens[3] = tokens[3].replace('|alt=', '');
				tokens[4] = tokens[4].replace('|', '');
				wikicode = wikicode.replace(tokens[0], '<figure class="' + tokens[2] + '"><img src="' + tokens[1] + '" class="' + tokens[2] + '" alt="' + tokens[3] + '"><figcaption>' + tokens[4] + '</figcaption></figure>');
			}
			else
				wikicode = wikicode.replace(tokens[0], '<div class="warning">WARNING: your image code is incomplete. Good practices for images impose to specify an alternative text, a caption and if the image is a frame or a thumbnail. For example, <code>&#091;&#091;File:anImage.png|thumb|alt=Alternative text|Caption text&#093;&#093;</code></div>');
		}

		wikicode = wikicode.replace(anchor, '<a href="$1">$2</a>');

		return wikicode;
	},

	// *******************************************************************************
	// *                                  LIST                                       *
	// *******************************************************************************
	_list: function(wikicode) {
		// unordered
		var unorderedStartList = /\n\n<li>/gm; //|\r\n\r\n<li>
		var unorderedListItem = /^\*(.*)/gm;
		var unorderedEndList = /<\/li>\n(?!<li>)/gm; // |<\/li>\r\n(?!<li>)

		wikicode = wikicode.replace(unorderedListItem, '<li>$1</li>');
		wikicode = wikicode.replace(unorderedStartList, "\n<ul>\n<li>");
		wikicode = wikicode.replace(unorderedEndList, "</li>\n</ul>\n\n");

		// ordered
		var orderedStartList = /\n\n<li>/gm; // |\r\n\r\n<li> ///([^<\/li>][>]?[\n])<li>/g;
		var orderedListItem = /^#[:]?[#]* (.*)/gm;
		var orderedEndList = /<\/li>\n(?!<li>|<\/ul>)/gm; // |<\/li>\r\n(?!<li>|<\/ul>) ///<\/li>\n(?!<li>)/gm;

		wikicode = wikicode.replace(orderedListItem, '<li>$1</li>');
		wikicode = wikicode.replace(orderedStartList, "\n<ol>\n<li>");
		wikicode = wikicode.replace(orderedEndList, "</li>\n</ol>\n\n");

		return wikicode;
	},

	// *******************************************************************************
	// *                                  PARAGRAPH                                  *
	// *******************************************************************************
	_paragraph: function(wikicode) {
		var paragraph = /\n\n([^#\*=].*)/gm; //|\r\n\r\n([^#\*=].*)

		wikicode = wikicode.replace(paragraph, "\n<p>$1</p>\n");

		return wikicode;
	},

	// *******************************************************************************
	// *                                  TABLE                                      *
	// *******************************************************************************
	_table: function(wikicode) {
		// http://www.mediawiki.org/wiki/Help:Tables
		var tableStart = /^\{\|/gm;
		var tableRow = /^\|-/gm;
		var tableHeader = /^!\s(.*)/gm;
		var tableData = /^\|\s(.*)/gm;
		var tableEnd = /^\|\}/gm;

		wikicode = wikicode.replace(tableStart, '<table><tr>');
		wikicode = wikicode.replace(tableRow, '</tr><tr>');
		wikicode = wikicode.replace(tableHeader, '<th>$1</th>');
		wikicode = wikicode.replace(tableData, '<td>$1</td>');
		wikicode = wikicode.replace(tableEnd, '</tr></table>');

		return wikicode;
	},

	// *******************************************************************************
	// *                             TABLE OF CONTENTS                               *
	// *******************************************************************************
	_toc: function(wikicode) {
		var toc = /^__TOC__/g;

		wikicode = wikicode.replace(toc, '<div class="warning">__TOC__ command is not supported yet.</div>');

		return wikicode;
	}
};
