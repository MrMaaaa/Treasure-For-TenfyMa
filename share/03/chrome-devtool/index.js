(() => {
  const template = document.createElement('template');

  template.innerHTML = `
  <link rel="stylesheet" href="../common.css" />
  <div class="scroll-view-v6l">
    <div class="scroll-view-item align-center">
      <h1 style="text-align: center;">你可能没用过的Chrome Devtool</h1>
    </div>
    <div class="scroll-view-item align-center">
      <h1 style="text-align: center;">CSS Overview</h1>
      <img src="./chrome-devtool/css-overview-route.jpg" />
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

  window.customElements.define('chrome-devtool', Template);
})();
