<?php

/*
 * This file is part of ramon/composer.
 *
 * Copyright (c) 2026 Ramon Guilherme.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Ramon\Composer;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    new Extend\Locales(__DIR__.'/locale'),

    // A prévia abre sozinha no primeiro uso; depois vale a escolha de cada
    // pessoa, guardada no navegador.
    (new Extend\Settings())
        ->default('ramon-composer.preview_default_visible', true)
        ->default('ramon-composer.hide_core_preview', false)
        ->default('ramon-composer.mobile_preview', true)
        ->serializeToForum('ramonComposerPreviewDefaultVisible', 'ramon-composer.preview_default_visible', 'boolval')
        ->serializeToForum('ramonComposerHideCorePreview', 'ramon-composer.hide_core_preview', 'boolval')
        ->serializeToForum('ramonComposerMobilePreview', 'ramon-composer.mobile_preview', 'boolval'),
];
