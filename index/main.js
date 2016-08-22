var cursor = document.getElementsByClassName('cursor')[0];
var links = document.getElementsByTagName('a'), link;

var wasTouching = false;

for (var i = 0; i < links.length; i++) {
  link = links[i];
  // for each link:

  link.addEventListener('mouseover', moveCursorToLink);
  link.addEventListener('focus', moveCursorToLink);
  link.addEventListener('mouseout', moveCursorFromLink);
  link.addEventListener('blur', moveCursorFromLink);

  link.addEventListener('mousemove', function() {
    moveCursorFromLink();
    moveCursorToLink.apply(this);
  });
  // when the link is tapped, assume that any that will be clicked
  // will have been tapped
  link.addEventListener('touchstart', function() { wasTouching = true; });
  // when the link has been clicked (by touchscreen/mouse),
  // let's be sure to display the mouseover effect; let's
  // display it after click if any of the links were tapped before
  link.addEventListener('click', function(event) {
    // if the device doesn't support mouseover before click,
    // let's wait for the mouseover effect to display before
    // going to the page linked
    if (wasTouching) {
      var thislink = event.target.parentElement,
          url = thislink.getAttribute('href');
      event.preventDefault();
      setTimeout(function() {
        if (thislink.getAttribute('target') === '_blank')
          window.open(url);
        else
          location.href = url;
      }, 200);
      // reset `wasTouching` b/c user might use different input for next link
      wasTouching = false;
      return false;
    }
  });
}

var mouseWasOver = false,
    currLink;
var handling; // to let only one event be handled (mouse/focus)
function moveCursorToLink() {
  if (handling) return;

  handling = true;
  // move cursor element to link
  cursor.className = 'cursor';
  cursor.style.top = this.offsetTop + 'px';
  // style this link, set it up for tab-to-select
  this.className = 'selected';
  this.focus();

  currLink = this;
  mouseWasOver = true;
  handling = false;
}

function moveCursorFromLink() {
  if (handling) return;

  handling = true;
  cursor.style.top = '';
  cursor.className = 'cursor _header';
  if (currLink) currLink.className = '';
  currLink = null;
  mouseWasOver = false;
  handling = false;
}

document.addEventListener('keydown', function onKeydown(e) {
  // if arrow key pressed, move the cursor
  var keyCode = e.keyCode;
  if (!currLink) return;

  if (keyCode === 38) { // up
      var prevLIElement = currLink.parentElement.previousElementSibling;
      if (!prevLIElement) return;

      var prevLink = prevLIElement.querySelector('a');
      moveCursorFromLink.apply(currLink);
      moveCursorToLink.apply(prevLink);
      return;
  }

  if (keyCode === 40) { // down
      var nextLIElement = currLink.parentElement.nextElementSibling;
      if (!nextLIElement) return;

      var nextLink = nextLIElement.querySelector('a');

      moveCursorFromLink.apply(currLink);
      moveCursorToLink.apply(nextLink);
      return;
  }
});