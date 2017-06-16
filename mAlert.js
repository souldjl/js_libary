/**
 *
 * @param obj
 * @param sty
 * @param num
 * @constructor
 */

function AlertMessage(obj, sty, num) {
  var wrap = document.createElement('p');
  var css = {
    padding: '15px 35px',
    background: 'rgba(0,0,0,0.7)',
    color: '#fff',
    left: '50%',
    top: '30%',
    transform: 'translateX(-50%)',
    zIndex: 999,
    borderRadius: '10px'
  };
  if (!sty) {
    sty = css;
  }
  if (!num) {
    num = 2000;
  }
  wrap.innerHTML = obj.text;
  wrap.style.padding = sty.padding;
  wrap.style.background = sty.background;
  wrap.style.color = sty.color;
  wrap.style.position = 'fixed';
  wrap.style.left = sty.left;
  wrap.style.top = sty.top;
  wrap.style.transform = sty.transform;
  wrap.style.msTransform = sty.transform;
  wrap.style.webkitTransform = sty.transform;
  wrap.style.mozTransform = sty.transform;
  wrap.style.oTransform = sty.transform;
  wrap.style.zIndex = sty.zIndex;
  wrap.style.borderRadius = sty.borderRadius;
  document.body.appendChild(wrap);
  obj = setTimeout(function () {
    document.body.removeChild(wrap);
    clearTimeout(obj)
  }, num)
}