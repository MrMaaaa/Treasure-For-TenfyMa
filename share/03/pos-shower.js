(() => {
  const template = document.createElement('template');

  template.innerHTML = `
  <style>
    .box-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      color: #fff;
      text-shadow: -2px -2px 2px #000;
      font-size: 24px;
      transform: translateX(30%);
    }
    .box {
      box-sizing: border-box;
      width: 300px;
      height: 300px;
      border-radius: 2px;
      padding: 5px;
      overflow: hidden;
      box-shadow: -4px -4px 8px 0px #000;
    }
    .box-zindex-less-0 {
      position: absolute;
      top: 50px;
      left: 50px;
      z-index: -1;
      background: gray;
    }
    .box-block {
      margin: 100px 0 0 100px;
      background: lightslategray;
    }
    .box-float {
      margin: -250px 0 0 150px;
      float: left;
      background: lightseagreen;
    }
    .box-inline {
      display: inline-block;
      margin: -200px 0 0 -250px;
      background: lightsteelblue;
    }
    .box-zindex-0 {
      position: absolute;
      top: 250px;
      left: 250px;
      z-index: 0;
      background: lightpink;
    }
    .box-zindex-auto {
      position: absolute;
      top: 300px;
      left: 300px;
      z-index: auto;
      background: lightgreen;
    }
    .box-zindex-greater-0 {
      position: absolute;
      top: 350px;
      left: 350px;
      z-index: 1;
      background: lightcoral;
    }
  </style>
  <link rel="stylesheet" href="../common.css" />
  <div class="scroll-view-v6l">
    <div class="scroll-view-item align-center">
      <div class="box-wrapper">
        <div class="box box-zindex-less-0">z-index < 0</div>
        <div class="box box-block">display: block;</div>
        <div class="box box-float">float: left;</div>
        <div class="box box-inline">display: inline-block;</div>
        <div class="box box-zindex-0">z-index: 0;</div>
        <div class="box box-zindex-auto">z-index: auto;</div>
        <div class="box box-zindex-greater-0">z-index > 0;</div>
      </div>
    </div>
    <div class="scroll-view-item align-center" style="text-align: left;">
      <p>注意：该层叠水平（stacking level)仅在元素都没有生成stacking context（堆叠上下文）时生效，如果生成，以z-index大小为依据</p>
      <p>文档中的层叠上下文由满足以下任意一个条件的元素形成：</p>
      <ol>
        <li>文档根元素（&lt;html&gt;）；</li>
        <li>position 值为 absolute（绝对定位）或  relative（相对定位）且 z-index 值不为 auto 的元素；</li>
        <li>position 值为 fixed（固定定位）或 sticky（粘滞定位）的元素（沾滞定位适配所有移动设备上的浏览器，但老的桌面浏览器不支持）；</li>
        <li>flex (flexbox (en-US)) 容器的子元素，且 z-index 值不为 auto；</li>
        <li>grid (grid) 容器的子元素，且 z-index 值不为 auto；</li>
        <li>opacity 属性值小于 1 的元素（参见 the specification for opacity）；</li>
        <li>mix-blend-mode 属性值不为 normal 的元素；</li>
        <li>以下任意属性值不为 none 的元素：</li>
        <ul>
          <li>transform</li>
          <li>filter</li>
          <li>perspective</li>
          <li>clip-path</li>
        </ul>
        <li>mask / mask-image / mask-border</li>
        <li>isolation 属性值为 isolate 的元素；</li>
        <li>-webkit-overflow-scrolling 属性值为 touch 的元素；</li>
        <li>will-change 值设定了任一属性而该属性在 non-initial 值时会创建层叠上下文的元素（参考这篇文章）；</li>
        <li>contain 属性值为 layout、paint 或包含它们其中之一的合成值（比如 contain: strict、contain: content）的元素。</li>
      </ol>
    </div>
  <div>
`;

  class Template extends HTMLElement {
    constructor() {
      super();

      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  window.customElements.define('pos-shower', Template);
})();
