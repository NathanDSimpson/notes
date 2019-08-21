# @Rules
`@media`: content is applied only if the device which runs the browser matches the expressed condition.

`@supports`: content is applied only if the browser actually supports the tested feature.

`@document`: content is applied only if the current page matches some conditions.

# Types of Selectors

__`Simple selectors`__ : Match one or more elements based on element type, class, or id.

__`Attribute selectors`__: Match one or more elements based on their attributes/attribute values. [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)

- `[attr]` : This selector will select all elements with the attribute attr, whatever its value.

- `[attr=val]` : This selector will select all elements with the attribute attr, but only if its value is val.

- `[attr~=val]`: This selector will select all elements with the attribute attr, but only if  val is one of a space-separated list of words contained in attr's value. 

- `[attr^=val]` : This selector will select all elements with the attribute attr for which the value starts with val.

- `[attr$=val]` : This selector will select all elements with the attribute attr for which the value ends with val.

- `[attr*=val]` : This selector will select all elements with the attribute attr for which the value contains the substring val. (A substring is simply part of a string, e.g. "cat" is a substring in the string "caterpillar".) 

__`Pseudo-classes`__: Match one or more elements that exist in a certain state, such as an element that is being hovered over by the mouse pointer, or a checkbox that is currently disabled or checked, or an element that is the first child of its parent in the DOM tree.

```css
a {
  color: blue;
  font-weight: bold;
}

/* We want visited links to be a different color
   as non visited links */
a:visited {
  color: purple;
}

/* We highlight the link when it is
   hovered over (mouse over), activated (mouse down)
   or focused (keyboard) */
a:hover,
a:active,
a:focus {
  color: darkred;
  text-decoration: none;
}
```

__`Pseudo-elements`__: Match one or more parts of content that are in a certain position in relation to an element, for example the first word of each paragraph, or generated content appearing just before an element.

```css
/* All elements with an attribute "href" with values
   starting with "http" will have an arrow added after their
   content (to indicate they are external links) */
[href^=http]::after {
  content: '⤴';
}
```

__`Combinators`__: These are not exactly selectors themselves, but ways of combining two or more selectors in useful ways for very specific selections. So for example, you could select only paragraphs that are direct descendants of divs, or paragraphs that come directly after headings.

- __Selector list__	 `A, B:`	Any element matching A and/or B (see Groups of selectors on one rule, below - Group of Selectors is not considered to be a combinator).

- __Descendant combinator__	`A B`	Any element matching B that is a descendant of an element matching A (that is, a child, or a child of a child, etc.). the combinator is one or more spaces or dual greater than signs.

- __Child combinator__	`A > B`	Any element matching B that is a direct child of an element matching A.

- __Adjacent sibling combinator__	`A + B`	Any element matching B that is the next sibling of an element matching A (that is, the next child of the same parent).

- __General sibling combinator__	`A ~ B`	Any element matching B that is one of the next siblings of an element matching A (that is, one of the next children of the same parent).

__`Multiple selectors`__: Again, these are not separate selectors; the idea is that you can put multiple selectors on the same CSS rule, separated by commas, to apply a single set of declarations to all the elements selected by those selectors.

# Units

__Absolute:__ 
- `q, mm, cm, in` - Quarter millimeters, millimeters, centimeters, or inches
- `pt, pc` - Points (1/72 of an inch) or picas (12 points)

__Relative__
- `em` -  1em is the same as the font-size of the current element. The default base font-size given to web pages by web browsers before CSS styling is applied is 16 pixels, which means the computed value of 1em is 16 pixels for an element by default. But beware — font sizes are inherited by elements from their parents, so if different font sizes have been set on parent elements, the pixel equivalent of an em can start to become complicated.

- `rem` - The rem (root em) works in exactly the same way as the em, except that it will always equal the size of the default base font-size; inherited font sizes will have no effect, so this sounds like a much better option than em, although rems don't work in older versions of Internet Explorer

- `percentages` - refer to the percent as compared to the parent

- `unitless` 
  - Anything with a value of zero can be unitless. 
  - Another case is line-height. The line-height becomes a multiple of the font size. 
    - (ie - `line-height: 1.5;`)
  - Quantities - like how many times an animation should rotate 
```css
  @keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

p {
  color: red;
  width: 100px;
  font-size: 40px;
  transform-origin: center;
}

p:hover {
  animation-name: rotate;
  animation-duration: 0.6s;
  animation-timing-function: linear;
  animation-iteration-count: 5;
}
```