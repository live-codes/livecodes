import type { Template } from '../../models';

export const blocklyStarter: Template = {
  name: 'blockly',
  title: 'Blockly Starter',
  thumbnail: 'assets/templates/blockly.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<xml
  data-src="{{ __CDN_URL__ }}@live-codes/blockly-utils@0.1.0/src/dom-blocks.xml"
  data-type="blockly/xml"
  style="display: none"
></xml>
<script
  src="{{ __CDN_URL__ }}@live-codes/blockly-utils@0.1.0/src/dom-blocks.js"
  type="blockly/script"
></script>

<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/blockly.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart(),
  },
  script: {
    language: 'blockly',
    content: `
<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="?\`Dl!ysD-zLY64Lpe)c(">count</variable>
  </variables>
  <block type="dom_set_property" id="sr4sLpCoHdr%yw}lz]{u" x="35" y="35">
    <value name="element">
      <shadow type="dom_element_selector" id="8q6b-NxGim%yU^KHWg+M">
        <value name="selector">
          <shadow type="text" id="8MF#)_03uL#%YWyCDgM^">
            <field name="TEXT">

            </field>
          </shadow>
        </value>
      </shadow>
      <block type="dom_element_by_id" id="hXkkuwcC=n!.Z6H?$ROO">
        <value name="id">
          <shadow type="text" id="q=C\`rbb\`[ki-OOw7GiYK">
            <field name="TEXT">title</field>
          </shadow>
        </value>
      </block>
    </value>
    <value name="property">
      <shadow type="dom_element_properties" id="AHLrrpzt[m1Yx/4?2U-{">
        <field name="property">innerText</field>
      </shadow>
    </value>
    <value name="value">
      <shadow type="text" id="M8W]wK^:#Db^F_bIEad3">
        <field name="TEXT">Blockly</field>
      </shadow>
    </value>
    <next>
      <block type="variables_set" id="Ecm7Dkj.nJmeV{jTL8Y_">
        <field name="VAR" id="?\`Dl!ysD-zLY64Lpe)c(">count</field>
        <value name="VALUE">
          <block type="math_number" id="D%LW6COR3l5[Z9MCjx/L">
            <field name="NUM">0</field>
          </block>
        </value>
      </block>
    </next>
  </block>
  <block type="dom_handle_event" id="K,_92]w;quNkxuUv*s9n" x="35" y="270">
    <value name="element">
      <shadow type="dom_element_selector" id="QV~_0VyIy(*b{r\`yJWy1">
        <value name="selector">
          <shadow type="text" id="iYe)MS{x+-J}5Kph!n7M">
            <field name="TEXT">button</field>
          </shadow>
        </value>
      </shadow>
    </value>
    <value name="event">
      <shadow type="dom_events" id="Dfnt}40u]T$?:p:S}irM">
        <field name="event">click</field>
      </shadow>
    </value>
    <statement name="event_handler">
      <block type="math_change" id="dxKITU6a]\`3w(sSIus2K">
        <field name="VAR" id="?\`Dl!ysD-zLY64Lpe)c(">count</field>
        <value name="DELTA">
          <shadow type="math_number" id="_exnsV4gci%)lqM3#)2A">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <next>
          <block type="dom_set_property" id="c]gWo#)7YgY8eszx.]fO">
            <value name="element">
              <shadow type="dom_element_selector" id="\`p]W.N%K-bP39x)tC,j0">
                <value name="selector">
                  <shadow type="text" id="}uE=/^7ZJn-xR4v1Oumn">
                    <field name="TEXT">

                    </field>
                  </shadow>
                </value>
              </shadow>
              <block type="dom_element_by_id" id="PWFAw[cc{xg0qf}Frlw|">
                <value name="id">
                  <shadow type="text" id="}0V..:dc(=V;hNFV53R[">
                    <field name="TEXT">counter</field>
                  </shadow>
                </value>
              </block>
            </value>
            <value name="property">
              <shadow type="dom_element_properties" id=")K$1i925QSZjn/w:{j[Z">
                <field name="property">innerText</field>
              </shadow>
            </value>
            <value name="value">
              <shadow type="text" id="gu4kA*Ig3*6\`sGaI*P6C">
                <field name="TEXT">

                </field>
              </shadow>
              <block type="variables_get" id="LmiNr+~z9=zAWH]H8gqm">
                <field name="VAR" id="?\`Dl!ysD-zLY64Lpe)c(">count</field>
              </block>
            </value>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
