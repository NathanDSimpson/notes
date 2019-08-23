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

# Colors
__Keywords__
- `color: blue;`

__Hexadecimal__
- `color: #0000ff;` (blue)

__RGB__
- `rgb(0,0,255)` (blue)

__HSL__ (hue, saturation, lightness)
- `color: hsl(240, 100%, 50%)` (blue)
- Hue: 0-360 representing the base color as on a color wheel
- Saturation: 0-100%,  0 = gray, 100% = full saturation
- Lightness: 0-100%,  0 = black, 100% = white

# Transparency
- `Opacity property` sets the transparency of all selected elements and their children.
```css
div {
  background-color: rgb(255,0,0);
  opacity: 0.5;
}
```

- `RGBA and HSLA:` Same as RGB() and HSA(), but take a fourth parameter for the transparency.
  - The fourth parameter is bewteen 0 and 1 and called the alpha channel.
  - `rgba(255,0,0,0.5)` or `hsla(240,100%,50%,0.5)`


# Inheritance 

The CSS shorthand property __`all`__ can be used to apply one of these inheritance values to (almost) all properties at once. It's a convenient way to undo changes made that can't be tracked down, or if you'd like to start fresh.

```css 
div ul li {
  all: unset;
} 
```

__`inherit`__
- Sets the property value applied to a selected element to be the same as that of its parent element.

__`initial`__ (not supported in Internet Explorer)
- Applies the initial (or default) value of a property to an element. This initial value is set by the browser. It can be applied to any CSS property.

__`unset`__ (not supported in Internet Explorer)
- Resets the property to its natural value, which means that if the property is naturally inherited it acts like inherit, otherwise it acts like initial.

__`revert`__
- Reverts the property to the value it would have had if the current origin had not applied any styles to it. In other words, the property's value is set to the user stylesheet's value for the property (if one is set), otherwise, the property's value is taken from the user agent's default stylesheet.

# Box Model

### __Properties of note:__

- `background-clip`: By default background-color/background-image extend to the edge of the border. This behaviour can be changed using the background-clip property.
  - `{ background-clip: border-box;  }` - default 
  - `{ background-clip: padding-box; }`
  - `{ background-clip: content-box; }` 

- `overflow`
  - `auto`: If there is too much content, the overflowing content is hidden and scroll bars are shown to let the user scroll to see all the content.

  - `hidden`: If there is too much content, the overflowing content is hidden.

  - `visible`: If there is too much content, the overflowing content is shown outside of the box (this is usually the default behavior.)

- `box-sizing: border-box;`: Changes the box model height and width to include border and padding.

- `outline`: behaves like the border but is drawn on top of the box without changing the size of the box (to be specific, the outline is drawn outside the border box, inside the margin area.)

### __Types of boxes__




