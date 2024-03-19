import { concat } from '@ember/helper';
import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import 'ember-link';
import { or } from 'ember-truth-helpers';
import { cn } from '../-private/helpers/cn.js';
import { g, i } from 'decorator-transforms/runtime';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class VelvetLink extends Component {
  static {
    g(this.prototype, "linkManagerService", [service('link-manager')]);
  }
  #linkManagerService = (i(this, "linkManagerService"), void 0);
  get link() {
    const {
      to: to1
    } = this.args;
    if (typeof to1 === 'string') {
      return this.linkManagerService.createLink(this.linkManagerService.getLinkParamsFromURL(to1));
    }
    return to1;
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <a class={{cn \"velvet-link\" (concat \"velvet-link-\" (or @size \"md\")) (concat \"velvet-link-\" (or @variant \"primary\")) (if @isPill \"velvet-link-pill\")}} href={{this.link.url}} {{on \"click\" this.link.transitionTo}} ...attributes>\n      {{yield}}\n    </a>\n  ", {
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

export { VelvetLink as default };
//# sourceMappingURL=velvet-link.js.map
