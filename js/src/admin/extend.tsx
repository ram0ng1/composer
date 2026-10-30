import Extend from 'flarum/common/extenders';
import app from 'flarum/admin/app';

export default [
  new Extend.Admin()
    .setting(() => ({
      setting: 'ramon-composer.preview_default_visible',
      type: 'boolean',
      label: app.translator.trans('ramon-composer.admin.settings.preview_default_visible_label'),
      help: app.translator.trans('ramon-composer.admin.settings.preview_default_visible_help'),
    }))
    .setting(() => ({
      setting: 'ramon-composer.hide_core_preview',
      type: 'boolean',
      label: app.translator.trans('ramon-composer.admin.settings.hide_core_preview_label'),
      help: app.translator.trans('ramon-composer.admin.settings.hide_core_preview_help'),
    })),
];
