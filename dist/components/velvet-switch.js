import { concat } from '@ember/helper';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';
import { cn } from '../-private/helpers/cn.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class VelvetSwitch extends Component {
  changeHandler = event1 => {
    const {
      isDisabled: isDisabled1,
      onChange: onChange1
    } = this.args;
    if (typeof onChange1 !== 'function' || isDisabled1 === true) {
      return;
    }
    onChange1(event1.target.checked, event1);
  };
  static {
    setComponentTemplate(precompileTemplate("\n    <label class={{cn \"velvet-switch\" (concat \"velvet-switch-\" (or @size \"md\")) (concat \"velvet-switch-\" (or @alignment \"left\")) (if @isDisabled \"velvet-switch-disabled\")}}>\n      <input checked={{@isChecked}} class=\"velvet-switch-input\" disabled={{@isDisabled}} type=\"checkbox\" {{on \"change\" this.changeHandler}} ...attributes />\n      <div class=\"velvet-switch-track\">\n        <div class=\"velvet-switch-handle\"></div>\n      </div>\n      {{yield}}\n    </label>\n  ", {
      scope: () => ({
        cn,
        concat,
        or,
        on
      }),
      strictMode: true
    }), this);
  }
}

export { VelvetSwitch as default };
//# sourceMappingURL=velvet-switch.js.map
