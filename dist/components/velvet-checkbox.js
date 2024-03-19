import { concat } from '@ember/helper';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';
import { cn } from '../-private/helpers/cn.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class VelvetCheckbox extends Component {
  get groupValueAsArray() {
    return this.args.privateGroupValue || [];
  }
  get groupValueAsObject() {
    return this.args.privateGroupValue || {};
  }
  get isCheckedInGroup() {
    const name1 = this.args.name;
    if (this.args.privateGroupValueIsObject) {
      return this.groupValueAsObject[name1] === true;
    }
    return this.groupValueAsArray.includes(name1);
  }
  changeHandler = event1 => {
    if (this.args.isDisabled === true) {
      return;
    }
    const {
      checked: checked1
    } = event1.target;
    const {
      privateInGroup: privateInGroup1,
      onChange: onChange1,
      privateOnChangeGroup: privateOnChangeGroup1
    } = this.args;
    if (privateInGroup1 && typeof privateOnChangeGroup1 === 'function') {
      const {
        groupValueAsArray: groupValueAsArray1,
        groupValueAsObject: groupValueAsObject1
      } = this;
      const {
        privateGroupValueIsObject: privateGroupValueIsObject1,
        name: name1
      } = this.args;
      let groupValue1;
      if (privateGroupValueIsObject1) {
        groupValue1 = {
          ...groupValueAsObject1,
          [name1]: checked1
        };
      } else if (checked1) {
        groupValue1 = [...groupValueAsArray1, name1];
      } else {
        groupValue1 = groupValueAsArray1.filter(n1 => n1 !== name1);
      }
      privateOnChangeGroup1(groupValue1, event1);
    } else if (typeof onChange1 === 'function') {
      onChange1(checked1, event1);
    }
  };
  static {
    setComponentTemplate(precompileTemplate("\n    <label class={{cn \"velvet-checkbox\" (concat \"velvet-checkbox-\" (or @size \"md\")) (if @isDisabled \"velvet-checkbox-disabled\")}}>\n      <input checked={{if @privateInGroup this.isCheckedInGroup @isChecked}} class=\"velvet-checkbox-input form-checkbox\" disabled={{@isDisabled}} indeterminate={{@isIndeterminate}} name={{@name}} type=\"checkbox\" {{on \"change\" this.changeHandler}} ...attributes />\n      {{yield}}\n    </label>\n  ", {
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

export { VelvetCheckbox as default };
//# sourceMappingURL=velvet-checkbox.js.map
