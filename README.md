# cui-icons

SVG icon pack for cUI libraries

## Specificiation

Icons are built on grid of 20x20 with 1px margin on each side what effectively gives 18x18 canvas for elements.
They do not provide any inside styling - must be styled using CSS.

## Adaptation

Icons can be used also in other project, however they are lacking of style components on paths.
In order to make use of them in HTML following (or similar) CSS rules must be added at it's basic level:

```css
svg {
	fill: none;
	stroke: black;
	stroke-opacity: 1;
	stroke-width: 1px;
	stroke-linecap: round;
	stroke-linejoin: miter;
}
```

Some of icons support alternative look where closed paths can be filled in with color.
This is done by class `fill` set on the fillable paths:

```css
svg path.fill {
	fill: black;
}
```

## Javascript

The simplest way to add icon to HTML document is via element attribute, e.g: `<span data-icon="close"></span>`.
Following example shows basic way to get icon added to document with vanilla javascript:

```javascript
import icons from "./cui-icons.js";

const ICON_ATTRIBUTE = "data-icon";

function createFromTemplate(htmlString) {
	let template = document.createElement("template");
	template.innerHTML = htmlString;
	return template.content.children.length > 0
		? template.content.children[0]
		: null;
}

function getAttributesSelector(...attributes) {
	return `[${attributes.join("][")}]`;
}

function getMatchinElements(root, selector) {
	return [...root.querySelectorAll(selector)];
}

function getIconNameFromElement(element, attribute) {
	return element.getAttribute(attribute);
}

function clearSvg(element) {
	const svgs = element.querySelectorAll("svg");
	for (let el of svgs) {
		el.remove();
	}
}

function registerIcon(element) {
	const iconName = getIconNameFromElement(element, ICONS_ATTRIBUTE);
	const iconString = icons[iconName];
	if (!iconString) {
		return;
	}
	const iconHTML = createFromTemplate(iconString);
	if (!iconHTML) {
		return;
	}
	clearSvg(element);
	element.appendChild(iconHTML);
}

function registerIcons(root) {
	const selector = getAttributesSelector(ICONS_ATTRIBUTE);
	const selected = getMatchinElements(root, selector);
	requestAnimationFrame(() => {
		selected.forEach((el) => registerIcon(el));
	});
}

// Invoke registration
registerIcons(document);
```
