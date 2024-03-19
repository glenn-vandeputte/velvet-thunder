import { concat, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';
import { cn } from '../-private/helpers/cn.js';
import VelvetSelectOption from './velvet-select/option.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class VelvetSelect extends Component {
  options = new Map();
  get hasSelection() {
    return this.args.selected !== undefined && this.args.selected !== null;
  }
  get shouldRenderPlaceholder() {
    return Boolean(this.args.placeholder) && this.hasSelection === false;
  }
  changeHandler = event1 => {
    const {
      isDisabled: isDisabled1,
      onChange: onChange1
    } = this.args;
    if (typeof onChange1 !== 'function' || isDisabled1 === true) {
      return;
    }
    onChange1(this.options.get(event1.target.value), event1);
  };
  addOption = (id1, value1) => {
    this.options.set(id1, value1);
  };
  removeOption = id1 => {
    this.options.delete(id1);
  };
  static {
    setComponentTemplate(precompileTemplate("\n    <select class={{cn \"velvet-select\" (concat \"velvet-select-\" (or @size \"md\")) (concat \"velvet-select-\" (or @variant \"primary\")) (if @isInvalid \"velvet-select-invalid\") (if @isPill \"velvet-select-pill\") (if @isDisabled \"velvet-select-disabled\") (if this.shouldRenderPlaceholder \"velvet-select-placeholder\") \"form-select\"}} disabled={{@isDisabled}} {{on \"change\" this.changeHandler}} ...attributes>\n      {{#if this.shouldRenderPlaceholder}}\n        <option disabled selected={{true}}>\n          {{@placeholder}}\n        </option>\n      {{/if}}\n      {{yield (hash Option=(component VelvetSelectOption privateOnCreate=this.addOption privateOnDestroy=this.removeOption privateSelected=@selected))}}\n    </select>\n  ", {
      scope: () => ({
        cn,
        concat,
        or,
        on,
        hash,
        VelvetSelectOption
      }),
      strictMode: true
    }), this);
  }
}

export { VelvetSelect as default };
//# sourceMappingURL=velvet-select.js.map
