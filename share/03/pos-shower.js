(() => {
  const template = document.createElement('template');

  template.innerHTML = `
  <style>
    .box-wrapper {
      position: relative;
      height: 100%;
      overflow: hidden;
      color: #fff;
      text-shadow: 2px 2px 4px #000;
      font-size: 24px;
      transform: translateX(30%);
    }
    .box {
      box-sizing: border-box;
      width: 300px;
      height: 300px;
      padding: 5px;
      overflow: hidden;
      box-shadow: 0 10px 15px 1px #666;
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
  <div class="box-wrapper">
    <div class="box box-zindex-less-0">z-index < 0</div>
    <div class="box box-block">display: block;</div>
    <div class="box box-float">float: left;</div>
    <div class="box box-inline">display: inline-block;</div>
    <div class="box box-zindex-0">z-index: 0;</div>
    <div class="box box-zindex-auto">z-index: auto;</div>
    <div class="box box-zindex-greater-0">z-index > 0;</div>
  </div>
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
