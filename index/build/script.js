const minVal = 10;
const maxVal = 80; // 67.64;
const requiredDistFromPrev = 0.25; // 0.3;
// const requiredDistFromCenter = 0.16; // 0.15;
let newVal,lastVal = 0;
function getMargin() {
  do newVal = Math.random(); while (
  Math.abs(lastVal - newVal) < requiredDistFromPrev);
  // || Math.abs(newVal - 0.5) < requiredDistFromCenter);
  lastVal = newVal;
  return minVal + newVal * (maxVal - minVal);
}
const maxAttempts = 10;
function setMargins(gw, firstLoad = false) {
  const avatar = gw.querySelector("div.avatar > div");
  let numAttempts1 = 0,numAttempts2 = 0;
  gw.
  querySelectorAll("div.link").
  forEach(el => {
    const elWidth = el.querySelector("a").offsetWidth;
    el.style.transition = '';
    const oldMargin = el.style.paddingLeft;
    // margin = getMargin();
    // if (margin > 25) {
    //   el.style.right = (margin) + "%";
    //   el.style.left = '';
    // } else {
    //   el.style.left = margin + "%";
    //   el.style.right = '';
    // }
    do el.style.paddingLeft = getMargin() + "%"; // `calc(${getMargin() + "%"} - ${elWidth / 2}px)`;
    while (testElsOverlap(el.querySelector(":scope > a"), gw.querySelector("div.avatar")) && ++numAttempts1 <= maxAttempts ||
    testOverflowsPageX(el.querySelector(":scope > *")) && ++numAttempts2 <= maxAttempts);

    if (firstLoad) {
      return;
    }

    const newMargin = el.style.paddingLeft;
    el.style.paddingLeft = oldMargin;

    setTimeout(() => {
      el.style.transition = '1000ms padding-left ease';
      el.style.paddingLeft = newMargin;
    }, 0);
    const lineRefreshInt = setInterval(updateAllLines, 16);
    setTimeout(() => clearInterval(lineRefreshInt), 1000);
  });
}
function testElsOverlap(el1, el2) {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();
  return !(rect1.right < rect2.left ||
  rect1.left > rect2.right ||
  rect1.bottom < rect2.top ||
  rect1.top > rect2.bottom);
}
function testOverflowsPageX(element) {
  const docWidth = document.documentElement.offsetWidth;
  const rect = element.getBoundingClientRect();
  return rect.right > docWidth || rect.left < 0;
}
const linksGatewayWrapper = document.querySelector(".links-gateway-wrapper");
function newLayer() {
  let gw = linksGatewayWrapper.querySelector(".links-gateway:not(.-ghost)");
  let newGw = gw.cloneNode(true);
  linksGatewayWrapper.insertBefore(newGw, gw);
  linksGatewayWrapper.removeChild(gw); // disabling the ghosts
  // gw.className = "links-gateway -ghost";
  // newGw.className = "links-gateway";
  setupLayer(newGw);
  linksGatewayWrapper.querySelectorAll(".links-gateway:nth-of-type(20) + .links-gateway").forEach(el => linksGatewayWrapper.removeChild(el));
}
function onButtonClick() {
  // for (let i = 0; i < 10; i++) newLayer();
  // autoModeOn = false;
  // updateAuto();
  /*if (!autoModeOn)*/ // newLayer();
  setupLayer(linksGatewayWrapper.querySelector(".links-gateway"));
}
/*let autoInterval, autoModeOn;
  function onButtonDblClick() {
    autoModeOn = !autoModeOn;
    updateAuto();
  }
  function updateAuto() {
    if (autoModeOn) {
      autoInterval = setInterval(newLayer, 75);
    } else {
      clearInterval(autoInterval)
    }
  }*/

// Drawing network edges

const lineUpdaters = [];
function createLineBetween(div1, div2, svgEl) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  svgEl.append(line);
  function update() {
    svgElPosition = svgEl.getBoundingClientRect();
    div1Position = div1.getBoundingClientRect();
    div2Position = div2.getBoundingClientRect();
    const x1 = div1Position.left - svgElPosition.left + div1.offsetWidth / 2;
    const y1 = div1Position.top - svgElPosition.top + div1.offsetHeight / 2;
    const x2 = div2Position.left - svgElPosition.left + div2.offsetWidth / 2;
    const y2 = div2Position.top - svgElPosition.top + div2.offsetHeight / 2;
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
  }
  lineUpdaters.push(update);
  update();
}
const updateAllLines = () => lineUpdaters.forEach(fn => fn());
window.addEventListener('resize', updateAllLines);
function clearEdges(svgEl) {
  svgEl.
  querySelectorAll(":scope > line").
  forEach(el => {el.remove();});
}
function createEdgesToAvatar(gw, svgEl) {
  const avatar = gw.querySelector("div.avatar > div");

  // Move avatar to average width
  // const margins = [...gw.querySelectorAll("div.link")]
  //   .map(el => el.style.paddingLeft)
  //   .map(str => parseFloat(str.slice(0, -1)));
  // const avgMargin = margins.reduce((a, b) => a + b) / margins.length;
  // avatar.parentElement.style.left = `${avgMargin}%`;

  gw.
  querySelectorAll("div.link > a").
  forEach(el => {createLineBetween(el, avatar, svgEl);});
}

// Set up

function setupLayer(gw, firstLoad = false) {
  setMargins(gw, firstLoad);

  const gwSvgEl = gw.querySelector(":scope > svg.edges");
  clearEdges(gwSvgEl);

  createEdgesToAvatar(gw, gwSvgEl);

  // function connect(nameA, nameB) {
  //   createLineBetween(document.querySelector(`.${nameA} > a`),
  //                     document.querySelector(`.${nameB} > a`), gwSvgEl)
  // }
  // connect("code", "projects");
  // connect("writing", "notebook");
  // connect("email", "keys");
}
function introAnimation() {
  // setTimeout(() => {
  const gw = document.querySelector(".links-gateway");
  // gw.querySelectorAll("div.link").forEach(el => el.style.transition = '');
  setupLayer(gw, true);
  // TODO: make it less glitchy on load
  // gw.className += " ready";
  // }, 1000);
}
// TODO: refine the intro--do I like the shelves idea? (i.e. "idea 1: associating across bookshelves")
// TODO: add restart button that removes the class "ready" from the .links-gateway and calls introAnimation()
introAnimation();
// TODO: refine how the shelves look
// TODO: try to make the SVG lines fade in during the intro (right now they just appear) -- would probably look smoother