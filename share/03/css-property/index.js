(() => {
  const template = document.createElement('template');

  template.innerHTML = `
  <link rel="stylesheet" href="../common.css" />
  <div class="scroll-view-v6l">
    <div class="scroll-view-item align-center">
      <h1 style="text-align: center;">CSS <pre>@property</pre></h1>
      <h3>CSS 自定义属性</h3>
    </div>
    <div class="scroll-view-item align-center">
      <pre>
        <code>
          @property --property-name {
            syntax: '<color>';
            inherits: false;
            initial-value: #fff;
          }

          CSS.registerProperty({
            name: "--property-name",
            syntax: "<color>",
            inherits: false,
            initialValue: "#c0ffee"
          });
        </code>
      </pre>
    </div>
    <div class="scroll-view-item align-center">
      <iframe src="./css-property.html" style="width: 100%;height: 600px;border: 0;" />
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

  window.customElements.define('css-property', Template);
})();
