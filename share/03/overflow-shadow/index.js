(() => {
  const template = document.createElement('template');

  template.innerHTML = `
  <link rel="stylesheet" href="../common.css" />
  <div class="scroll-view-v6l">
    <div class="scroll-view-item align-center">
      <h1 style="text-align: center;">纯CSS实现滚动时顶部出现阴影</h1>
      <img src="./overflow-shadow/overflow-shadow-example.gif" />
    </div>
    <div class="scroll-view-item align-center">
      <h1>background-attachment的取值: scroll、fixed、local</h1>
      <iframe src="./overflow-shadow/overflow-shadow-demo.html" style="width: 100%;height: 400px;border: 0;"></iframe>
    </div>
    <div class="scroll-view-item align-center">
      <h1>background-attachment</h1>
      <iframe src="./overflow-shadow/overflow-shadow-example.html" style="width: 100%;height: 100%;border: 0;"></iframe>
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

  window.customElements.define('overflow-shadow', Template);
})();
