(() => {
  const colorFrom = '#000';
  const colorTo = '#222';
  const dom_current = document.createElement('div');
  dom_current.setAttribute('id', 'current');
  const dom_rect = document.createElement('div');
  dom_rect.setAttribute('id', 'rect');
  const dom_total = document.createElement('div');
  dom_total.setAttribute('id', 'total');

  const frag = document.createDocumentFragment();
  frag.appendChild(dom_current);
  frag.appendChild(dom_rect);
  frag.appendChild(dom_total);

  const cssStyle = document.createElement('style');
  cssStyle.textContent = `
    #current {
      height: 40px;
      position: fixed;
      top: 30px;
      left: 30px;
      font-size: 36px;
      line-height: initial;
      overflow: scroll;
      text-align: right;
    }

    #current::-webkit-scrollbar {
      display: none;
    }

    #rect {
      width: 4px;
      height: 40px;
      background: #fff;
      position: fixed;
      top: 35px;
      left: 100px;
      line-height: initial;
    }

    #total {
      position: fixed;
      top: 30px;
      left: 130px;
      font-size: 36px;
      line-height: initial;
    }`;

  document.head.appendChild(cssStyle);
  document.body.appendChild(frag);

  const $scrollTop = document.querySelector('.scroll-view');
  const pageLen = document.querySelectorAll(
    '.scroll-view > .scroll-view-item',
  ).length;
  let scrollHeight = $scrollTop.scrollHeight - document.body.scrollHeight;
  const $rect = document.querySelector('#rect');
  const $current = document.querySelector('#current');
  document.getElementById('total').innerText = pageLen;

  const init = () => {
    document.body.addEventListener('resize', onScroll, false);
    $scrollTop.addEventListener(
      'scroll',
      () => {
        scrollHeight = $scrollTop.scrollHeight - document.body.scrollHeight;
        onScroll();
      },
      false,
    );
    onScroll();
    // 动态向#current dom中插入对应数量的页码元素
    $current.innerHTML = new Array(pageLen)
      .fill(null)
      .map((e, i) => i + 1)
      .reduce((prev, curr) => {
        return `${prev}<div>${curr}</div>`;
      }, '');
  };

  const onScroll = () => {
    // 计算滚动百分比
    const bgper = ($scrollTop.scrollTop / scrollHeight) * 100;

    // 设置背景渐变
    document.body.style.background = `linear-gradient(to right, ${colorFrom}, ${colorFrom} ${bgper}%, ${colorTo} ${bgper}%)`; // 线性渐变
    // document.body.style.background = `repeating-linear-gradient(45deg, ${colorFrom}, ${colorTo} ${bgper * 0.01 + 2}%)` // 方格逐渐变大效果
    // document.body.style.background = `radial-gradient(circle at 85px 55px, ${colorFrom}, ${colorFrom} ${bgper}%, ${colorTo} ${bgper}%)` // 圆形从右侧扩大

    // 计算页码 dom 滚动距离
    const per = ($scrollTop.scrollTop / $scrollTop.scrollHeight) * 100;
    $current.scrollTop = ((per / 100) * 50 * pageLen).toFixed(0);

    // 页码分隔符旋转角度
    $rect.style.transform = `rotate(${(
      (per / (100 / pageLen)) * 180 +
      25
    ).toFixed(0)}deg)`;
  };

  init();
})();
