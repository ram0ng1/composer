<?php

/*
 * This file is part of ramon/composer.
 *
 * Copyright (c) 2026 Ramon Guilherme.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Ramon\Composer\Tests\integration\api;

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\Test;

class ForumAttributesTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('ramon-composer');
    }

    /**
     * @return array<string, mixed>
     */
    private function forumAttributes(): array
    {
        $response = $this->send($this->request('GET', '/api'));

        $this->assertEquals(200, $response->getStatusCode());

        return json_decode($response->getBody()->getContents(), true)['data']['attributes'];
    }

    #[Test]
    public function previa_aberta_e_previa_do_core_mantida_por_padrao(): void
    {
        $attributes = $this->forumAttributes();

        $this->assertTrue($attributes['ramonComposerPreviewDefaultVisible']);
        $this->assertFalse($attributes['ramonComposerHideCorePreview']);
        $this->assertTrue($attributes['ramonComposerMobilePreview']);
    }

    #[Test]
    public function serializa_as_opcoes_do_admin_como_booleanos(): void
    {
        $this->setting('ramon-composer.preview_default_visible', '0');
        $this->setting('ramon-composer.hide_core_preview', '1');
        $this->setting('ramon-composer.mobile_preview', '0');

        $attributes = $this->forumAttributes();

        $this->assertFalse($attributes['ramonComposerPreviewDefaultVisible']);
        $this->assertTrue($attributes['ramonComposerHideCorePreview']);
        $this->assertFalse($attributes['ramonComposerMobilePreview']);
    }

    #[Test]
    public function visitante_tambem_recebe_as_opcoes(): void
    {
        $this->setting('ramon-composer.hide_core_preview', '1');

        $response = $this->send($this->request('GET', '/api'));
        $attributes = json_decode($response->getBody()->getContents(), true)['data']['attributes'];

        $this->assertArrayHasKey('ramonComposerPreviewDefaultVisible', $attributes);
        $this->assertTrue($attributes['ramonComposerHideCorePreview']);
    }
}
