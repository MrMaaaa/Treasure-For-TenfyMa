(() => {
  const template = document.createElement('template');

  template.innerHTML = `
  <link rel="stylesheet" href="../common.css" />
  <div class="scroll-view-v6l">
    <div class="scroll-view-item align-center">
      <h1 style="text-align: center;">不使用 overflow: hidden; 来实现 overflow: hidden; 的效果</h1>
      <h2>这是真的有使用场景的</h2>
      <h3>比如，容器内的内容，在竖直方向上超出容器会被裁剪，而在水平方向上超出容器，则不会被裁剪。</h3>
      <img src="./overflow-hidden/overflow-demand-example.gif" />
    </div>
    <div class="scroll-view-item align-center">
      <h1>clip-path</h1>
      <iframe src="./overflow-hidden/overflow-clip-path.html" style="width: 100%;height: 100%;border: 0;" />
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

  window.customElements.define('overflow-hidden', Template);
})();
