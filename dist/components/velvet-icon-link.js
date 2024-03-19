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

class VelvetIconLink extends Component {
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
    setComponentTemplate(precompileTemplate("\n    <a class={{cn \"velvet-icon-link\" (concat \"velvet-icon-link-\" (or @size \"md\")) (concat \"velvet-icon-link-\" (or @variant \"primary\")) (if @isRound \"velvet-icon-link-round\")}} href={{this.link.url}} {{on \"click\" this.link.transitionTo}} ...attributes>\n      {{yield}}\n    </a>\n  ", {
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

export { VelvetIconLink as default };
//# sourceMappingURL=velvet-icon-link.js.map
