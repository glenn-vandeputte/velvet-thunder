import type VelvetAvatarComponent from 'velvet-thunder/components/velvet-avatar';
import type VelvetProgressComponent from 'velvet-thunder/components/velvet-progress';
import type VelvetSpinnerComponent from 'velvet-thunder/components/velvet-spinner';
import type VelvetTagComponent from 'velvet-thunder/components/velvet-tag';

// Private:
import type VelvetClassListHelper from 'velvet-thunder/helpers/-velvet/class-list';
import type VelvetClassHelper from 'velvet-thunder/helpers/-velvet/class';
import type VelvetNoopHelper from 'velvet-thunder/helpers/-velvet/noop';

// Dependencies:
import OrHelper from '@gavant/glint-template-types/types/ember-truth-helpers/or';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    VelvetAvatar: typeof VelvetAvatarComponent;
    VelvetProgress: typeof VelvetProgressComponent;
    VelvetSpinner: typeof VelvetSpinnerComponent;
    VelvetTag: typeof VelvetTagComponent;

    // Private:
    '-velvet/class-list': typeof VelvetClassListHelper;
    '-velvet/class': typeof VelvetClassHelper;
    '-velvet/noop': typeof VelvetNoopHelper;

    // Dependencies:
    or: typeof OrHelper;
  }
}
