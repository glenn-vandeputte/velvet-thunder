import { concat } from '@ember/helper';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';
import { cn } from '../-private/helpers/cn.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class VelvetProgress extends Component {
  get lineStyle() {
    const {
      max: max1,
      min: min1,
      value: value1
    } = this;
    const progress1 = Math.floor((value1 - min1) / (max1 - min1) * 100);
    const progressClipped1 = Math.max(0, Math.min(100, progress1));
    return htmlSafe(`width: ${progressClipped1}%;`);
  }
  get max() {
    return typeof this.args.max === 'number' ? this.args.max : 100;
  }
  get min() {
    return typeof this.args.min === 'number' ? this.args.min : 0;
  }
  get value() {
    return typeof this.args.value === 'number' ? this.args.value : 0;
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <div class={{cn \"velvet-progress\" (concat \"velvet-progress-\" (or @size \"md\")) (concat \"velvet-progress-\" (or @variant \"primary\"))}} aria-valuemax={{this.max}} aria-valuemin={{this.min}} aria-valuenow={{this.value}} aria-valuetext={{@text}} role=\"progressbar\" ...attributes>\n      <div class=\"velvet-progress-line\" style={{this.lineStyle}}></div>\n    </div>\n  ", {
      scope: () => ({
        cn,
        concat,
        or
      }),
      strictMode: true
    }), this);
  }
}

export { VelvetProgress as default };
//# sourceMappingURL=velvet-progress.js.map
