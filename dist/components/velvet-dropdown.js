import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import VelvetButton from './velvet-button.js';
import VelvetDropdownContent from './velvet-dropdown/content.js';
import VelvetIconButton from './velvet-icon-button.js';
import { g, i } from 'decorator-transforms/runtime';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class VelvetDropdown extends Component {
  static {
    g(this.prototype, "isShown", [tracked], function () {
      return false;
    });
  }
  #isShown = (i(this, "isShown"), void 0);
  triggerElement = null;
  get offset() {
    const {
      offset: offset1
    } = this.args;
    return typeof offset1 === 'number' ? offset1 : 4;
  }
  get placement() {
    return this.args.placement || 'bottom-start';
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
    assert('[VelvetDropdown] Trigger element must be present.', triggerElement1);
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
    const clickOutsideHandler1 = ({
      target: target1
    }) => {
      if (target1 !== contentElement1 && target1 !== triggerElement1 && contentElement1.contains(target1) === false && triggerElement1.contains(target1) === false) {
        this.hide();
      }
    };
    const pressEscapeHandler1 = ({
      key: key1
    }) => {
      if (key1 === 'Escape') {
        this.hide();
      }
    };
    document.addEventListener('click', clickOutsideHandler1);
    document.addEventListener('keydown', pressEscapeHandler1);
    return () => {
      cleanupFloating1();
      document.removeEventListener('click', clickOutsideHandler1);
      document.removeEventListener('keydown', pressEscapeHandler1);
    };
  });
  trigger = modifier(triggerElement1 => {
    this.triggerElement = triggerElement1;
    triggerElement1.addEventListener('click', this.toggle);
    return () => triggerElement1.removeEventListener('click', this.toggle);
  });
  hide = () => {
    this.isShown = false;
  };
  show = () => {
    this.isShown = true;
  };
  toggle = () => {
    if (this.isShown) {
      this.hide();
    } else {
      this.show();
    }
  };
  static {
    setComponentTemplate(precompileTemplate("\n    <div class=\"velvet-dropdown\" ...attributes>\n      {{yield (hash Button=(component VelvetButton isDisclosure=true isExpanded=this.isShown privateDropdownTrigger=this.trigger) Content=(component VelvetDropdownContent isShown=this.isShown modifier=this.content) IconButton=(component VelvetIconButton privateDropdownTrigger=this.trigger) isShown=this.isShown hide=this.hide show=this.show toggle=this.toggle content=this.content trigger=this.trigger)}}\n    </div>\n  ", {
      scope: () => ({
        hash,
        VelvetButton,
        VelvetDropdownContent,
        VelvetIconButton
      }),
      strictMode: true
    }), this);
  }
}

export { VelvetDropdown as default };
//# sourceMappingURL=velvet-dropdown.js.map
