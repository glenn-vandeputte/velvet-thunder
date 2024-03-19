import { concat } from '@ember/helper';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';
import { cn } from '../-private/helpers/cn.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class VelvetTextarea extends Component {
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
    setComponentTemplate(precompileTemplate("\n    <textarea class={{cn \"velvet-textarea\" (concat \"velvet-textarea-\" (or @size \"md\")) (concat \"velvet-textarea-\" (or @variant \"primary\")) (if @isInvalid \"velvet-textarea-invalid\") (if @isDisabled \"velvet-textarea-disabled\") \"form-textarea\"}} disabled={{@isDisabled}} placeholder={{@placeholder}} value={{@value}} {{on \"change\" this.changeHandler}} {{on \"input\" this.inputHandler}} ...attributes></textarea>\n  ", {
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

export { VelvetTextarea as default };
//# sourceMappingURL=velvet-textarea.js.map
