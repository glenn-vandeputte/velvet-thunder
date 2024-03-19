import { concat } from '@ember/helper';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';
import { cn } from '../-private/helpers/cn.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class VelvetRadio extends Component {
  get isChecked() {
    const {
      privateInGroup: privateInGroup1,
      isChecked: isChecked1,
      privateGroupValue: privateGroupValue1,
      value: value1
    } = this.args;
    return privateInGroup1 ? value1 === privateGroupValue1 : isChecked1;
  }
  get valueAttr() {
    const {
      value: value1
    } = this.args;
    return value1 === undefined ? undefined : String(value1);
  }
  changeHandler = event1 => {
    if (this.args.isDisabled === true) {
      return;
    }
    const {
      privateInGroup: privateInGroup1,
      onChange: onChange1,
      privateOnChangeGroup: privateOnChangeGroup1,
      value: value1
    } = this.args;
    if (privateInGroup1 && typeof privateOnChangeGroup1 === 'function') {
      privateOnChangeGroup1(value1, event1);
    } else if (typeof onChange1 === 'function') {
      onChange1(event1.target.checked, event1);
    }
  };
  static {
    setComponentTemplate(precompileTemplate("\n    <label class={{cn \"velvet-radio\" (concat \"velvet-radio-\" (or @size \"md\")) (if @isDisabled \"velvet-radio-disabled\")}}>\n      <input checked={{this.isChecked}} class=\"velvet-radio-input form-radio\" disabled={{@isDisabled}} name={{@name}} type=\"radio\" value={{this.valueAttr}} {{on \"change\" this.changeHandler}} ...attributes />\n      {{yield}}\n    </label>\n  ", {
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

export { VelvetRadio as default };
//# sourceMappingURL=velvet-radio.js.map
