import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import { waitForPromise } from '@ember/test-waiters';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import VelvetTooltipContent from './velvet-tooltip/content.js';
import { g, i } from 'decorator-transforms/runtime';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class VelvetTooltip extends Component {
  static {
    g(this.prototype, "isShown", [tracked], function () {
      return false;
    });
  }
  #isShown = (i(this, "isShown"), void 0);
  showTimeout = undefined;
  triggerElement = null;
  get offset() {
    const {
      offset: offset1
    } = this.args;
    return typeof offset1 === 'number' ? offset1 : 4;
  }
  get placement() {
    return this.args.placement || 'top';
  }
  get showDelay() {
    const {
      showDelay: showDelay1
    } = this.args;
    return typeof showDelay1 === 'number' ? showDelay1 : 400;
  }
  get strategy() {
    return this.args.strategy || 'absolute';
  }
  content = modifier(contentElement1 => {
    const {
      placement: placement1,
      strategy: strategy1,
      triggerElement: triggerElement1
    } = this;
    assert('[VelvetTooltip] Trigger element must be present.', triggerElement1);
    // https://floating-ui.com/docs/computeposition#initial-layout:
    Object.assign(contentElement1.style, {
      left: 0,
      position: strategy1,
      top: 0
    });
    const updateFloating1 = async () => {
      const {
        x: x1,
        y: y1
      } = await computePosition(triggerElement1, contentElement1, {
        middleware: [flip(), offset(this.offset)],
        placement: placement1,
        strategy: strategy1
      });
      Object.assign(contentElement1.style, {
        left: `${x1}px`,
        top: `${y1}px`
      });
    };
    const cleanupFloating1 = autoUpdate(triggerElement1, contentElement1, updateFloating1);
    return cleanupFloating1;
  });
  trigger = modifier(triggerElement1 => {
    this.triggerElement = triggerElement1;
    triggerElement1.addEventListener('mouseenter', this.show);
    triggerElement1.addEventListener('mouseleave', this.hide);
    return () => {
      triggerElement1.removeEventListener('mouseenter', this.show);
      triggerElement1.removeEventListener('mouseleave', this.hide);
    };
  });
  hide = () => {
    clearTimeout(this.showTimeout);
    this.isShown = false;
  };
  show = () => {
    clearTimeout(this.showTimeout);
    return waitForPromise(new Promise(resolve1 => {
      this.showTimeout = setTimeout(() => {
        this.isShown = true;
        resolve1();
      }, this.showDelay);
    }));
  };
  toggle = () => {
    if (this.isShown) {
      this.hide();
    } else {
      this.show();
    }
  };
  static {
    setComponentTemplate(precompileTemplate("\n    <div class=\"velvet-tooltip\" ...attributes>\n      {{yield (hash Content=(component VelvetTooltipContent isShown=this.isShown modifier=this.content) isShown=this.isShown hide=this.hide show=this.show toggle=this.toggle content=this.content trigger=this.trigger)}}\n    </div>\n  ", {
      scope: () => ({
        hash,
        VelvetTooltipContent
      }),
      strictMode: true
    }), this);
  }
}

export { VelvetTooltip as default };
//# sourceMappingURL=velvet-tooltip.js.map
