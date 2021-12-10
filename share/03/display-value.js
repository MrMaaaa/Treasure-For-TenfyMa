(() => {
  const template = document.createElement('template');

  template.innerHTML = `
  <link rel="stylesheet" href="../common.css" />
  <div class="scroll-view-v6l">
    <div class="scroll-view-item align-center">
      <h1 style="text-align: center;"><pre>display</pre> 属性将支持两个值</h1>
    </div>
    <div class="scroll-view-item align-center">
      <h3><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/display/two-value_syntax_of_display" target="_blank">mdn的描述</a>：</h3>
      <img style="display: block; width: 50%;" src="./display-value.png" />
    </div>
    <div class="scroll-view-item align-center">
      <img style="display: block; width: 50%;" src="./display-value-example.png" />
    </div>
    <div class="scroll-view-item align-center">
      <h3>最后再分享几个新的display属性</h3>
      <ul>
        <li>contents: 将设置了该值的元素从可访问性树(accessibility tree)中移除，但保留其子代元素。这会导致该元素自身不再被屏幕阅读技术(screen reading technology)访问。这在 CSS 规范中被视为不正确的行为。</li>
        <li>flow-root: 该值的唯一目的是创建一个新的块格式上下文(BFC)。</li>
      </ul>
    </div>
  </div>
`;

  class Template extends HTMLElement {
    constructor() {
      super();

      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  window.customElements.define('display-value', Template);
})();
