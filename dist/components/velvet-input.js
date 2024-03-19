import { concat } from '@ember/helper';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';
import { cn } from '../-private/helpers/cn.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class VelvetInput extends Component {
  changeHandler = event1 => {
    const {
      isDisabled: isDisabled1,
      onChange: onChange1
    } = this.args;
    if (typeof onChange1 !== 'function' || isDisabled1 === true) {
      return;
    }
    onChange1(event1.target.value, event1);
  };
  inputHandler = event1 => {
    const {
      isDisabled: isDisabled1,
      onInput: onInput1
    } = this.args;
    if (typeof onInput1 !== 'function' || isDisabled1 === true) {
      return;
    }
    onInput1(event1.target.value, event1);
  };
  static {
    setComponentTemplate(precompileTemplate("\n    <input class={{cn \"velvet-input\" (concat \"velvet-input-\" (or @size \"md\")) (concat \"velvet-input-\" (or @variant \"primary\")) (if @isInvalid \"velvet-input-invalid\") (if @isPill \"velvet-input-pill\") (if @isDisabled \"velvet-input-disabled\") \"form-input\"}} disabled={{@isDisabled}} placeholder={{@placeholder}} type={{or @type \"text\"}} value={{@value}} {{on \"change\" this.changeHandler}} {{on \"input\" this.inputHandler}} ...attributes />\n  ", {
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

export { VelvetInput as default };
//# sourceMappingURL=velvet-input.js.map
