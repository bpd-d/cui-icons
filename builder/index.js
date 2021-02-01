import { CuiIconsPack, CUI_ICONS_VERSION } from "/esm/index.js";

const iconsData = [];
const iconsVersion = document.getElementById("icons-version");
iconsVersion.textContent = CUI_ICONS_VERSION
const iconsContainer = document.getElementById("icons-container");
const modalContent = document.getElementById("out-data");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modal-close");
const submitBtn = document.getElementById('submit');

const switchViewBtn = document.getElementById("switch-view");

function createSvgElement(text) {
    let template = document.createElement('template')
    template.innerHTML = text
    return template.content.children.length > 0 ? template.content.children[0] : null;
}

function createChild(icon, svgStr) {
    const card = document.createElement("div");
    card.classList.add("card");
    const iconSpan = document.createElement('span');
    iconSpan.classList.add("icon");
    const svgEl = createSvgElement(svgStr);
    if (svgEl) {
        iconSpan.appendChild(svgEl)
    }


    const textSpan = document.createElement("span");
    textSpan.classList.add('icon-label');
    textSpan.textContent = icon;

    card.appendChild(iconSpan);
    card.appendChild(textSpan);
    return card;
}

// MAIN

modalClose.addEventListener("click", () => {
    if (modal.classList.contains("active")) {
        modal.classList.remove('active');
    }
})

switchViewBtn.addEventListener("click", () => {
    if (iconsContainer.classList.contains('grid')) {
        iconsContainer.classList.remove('grid');
        switchViewBtn.textContent = "Grid"
        return;
    }

    iconsContainer.classList.add('grid');
    switchViewBtn.textContent = "List"
})

submitBtn.addEventListener('click', () => {
    if (!iconsData || iconsData.length === 0) {
        return;
    }

    const out = {};
    iconsData.forEach(iconData => {
        if (iconData.selected) {
            out[iconData.name] = iconData.svg;
        }
    })
    const outString = JSON.stringify(out);
    modalContent.textContent = outString;

    modal.classList.add("active")
})

for (const icon in CuiIconsPack) {
    const svg = CuiIconsPack[icon];
    const obj = {
        name: icon,
        svg: svg,
        ref: createChild(icon, svg),
        selected: false
    }
    obj.ref.addEventListener("click", () => {
        let isSelected = obj.selected;
        if (isSelected) {
            obj.ref.classList.remove('selected')
        } else {
            obj.ref.classList.add("selected");
        }
        obj.selected = !isSelected;
    })
    iconsData.push(obj)
    iconsContainer.appendChild(obj.ref);
}