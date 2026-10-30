/*
 * A prévia ao lado do editor: no computador, o post aparece formatado à
 * direita enquanto se escreve. Um botão no canto do composer (junto de
 * minimizar e tela cheia) a mostra ou esconde.
 *
 * A prévia é o ComposerPostPreview do core (o mesmo formatador do servidor,
 * em JS), então menções, emoji e markdown saem iguais ao post publicado.
 *
 * Os componentes do core são estendidos pelo nome do módulo: Composer,
 * ComposerBody e ComposerPostPreview vêm num pedaço carregado sob demanda, e
 * um import direto de CommentPost e ReplyPlaceholder chega `undefined` ao
 * initializer.
 */
import app from 'flarum/forum/app';
import { extend, override } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import TextEditor from 'flarum/common/components/TextEditor';
import type ComposerState from 'flarum/forum/states/ComposerState';
import type ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';

import { previewPreferred, setPreviewPreferred } from './preference';

const COMPOSER = 'flarum/forum/components/Composer';
const COMPOSER_BODY = 'flarum/forum/components/ComposerBody';
const COMMENT_POST = 'flarum/forum/components/CommentPost';
const REPLY_PLACEHOLDER = 'flarum/forum/components/ReplyPlaceholder';

/**
 * O tema Canela já traz a mesma prévia no composer dele; com as duas, o
 * editor ganharia duas colunas de prévia.
 */
function canelaPreviewOn(): boolean {
  const forum = app.forum;

  return forum.attribute('canelaComposerPreview') === true && forum.attribute('canelaComposerEnabled') !== false;
}

/**
 * Se cabem as duas colunas agora: computador (`app.screen()` diz "desktop-hd"
 * a partir de 1100px, e as duas valem), composer aberto ou em tela cheia.
 */
export function splitPossible(composer: ComposerState = app.composer): boolean {
  const screen = app.screen();

  if (screen !== 'desktop' && screen !== 'desktop-hd') return false;
  if (composer !== app.composer || !composer.isVisible() || canelaPreviewOn()) return false;

  return composer.position === 'normal' || composer.position === 'fullScreen';
}

export function splitVisible(composer?: ComposerState): boolean {
  return splitPossible(composer) && previewPreferred();
}

/**
 * Se a prévia do core no tópico (o post esmaecido da resposta ou da edição)
 * sai: só com a opção do admin e enquanto a prévia ao lado está aberta. No
 * celular e no tablet, ou com a prévia ao lado escondida, ela continua.
 */
function hideCorePreview(): boolean {
  return app.forum.attribute('ramonComposerHideCorePreview') === true && splitVisible();
}

/** O nó (no vdom da view) com a classe dada, procurando em profundidade. */
function findByClass(vnode: any, className: string): any {
  if (!vnode || typeof vnode !== 'object') return null;

  if (Array.isArray(vnode)) {
    for (const child of vnode) {
      const found = findByClass(child, className);
      if (found) return found;
    }

    return null;
  }

  const classes = String(vnode.attrs?.className || vnode.attrs?.class || '').split(/\s+/);

  if (classes.includes(className)) return vnode;

  return findByClass(vnode.children, className);
}

function toggleButton(): Mithril.Children {
  const visible = previewPreferred();
  const label = app.translator.trans(visible ? 'ramon-composer.forum.preview.hide_tooltip' : 'ramon-composer.forum.preview.show_tooltip', {}, true);

  return (
    <Button
      className={`Button Button--icon Button--link ComposerPreview-toggle${visible ? ' active' : ''}`}
      icon="fas fa-table-columns"
      title={label}
      aria-label={label}
      aria-pressed={visible ? 'true' : 'false'}
      onclick={() => setPreviewPreferred(!visible)}
    />
  );
}

// O que a última view do ComposerBody desenhou (ver o `resize` abaixo).
let renderedSplit = false;

export default function installSplitPreview() {
  // A prévia entra ao lado do editor, dentro de `.ComposerBody-editor`.
  // Mexer no vdom pronto evita reescrever a view do ComposerBody (e o que
  // outras extensões põem nela).
  extend(COMPOSER_BODY as any, 'view', function (this: any, vdom: Mithril.Children) {
    renderedSplit = splitVisible(this.composer);

    if (!renderedSplit) return;

    const editor = findByClass(vdom, 'ComposerBody-editor');

    if (!editor || !Array.isArray(editor.children)) return;

    editor.attrs.className = `${editor.attrs.className} ComposerPreview-split`;

    const ComposerPostPreview = flarum.reg.get('core', 'forum/components/ComposerPostPreview');

    // Sem `key`: o TextEditor, irmão dela, não tem, e o Mithril recusa uma
    // lista que mistura nós com e sem chave. Entrando sempre por último, a
    // posição do editor não muda e ele não é recriado.
    editor.children.push(
      <div className="ComposerPreview" aria-label={app.translator.trans('ramon-composer.forum.preview.label', {}, true)}>
        <div className="ComposerPreview-scroll">
          <ComposerPostPreview className="Post-body ComposerPreview-body" composer={this.composer} />
        </div>
      </div>
    );
  });

  // A classe na raiz deixa o CSS alargar o composer (na tela cheia e na
  // página do tópico) para as duas colunas.
  extend(COMPOSER as any, 'view', function (vdom: any) {
    if (vdom?.attrs && splitVisible()) vdom.attrs.className = `${vdom.attrs.className || ''} Composer--splitPreview`;
  });

  // O botão vem antes de minimizar e tela cheia.
  extend(COMPOSER as any, 'controlItems', function (items: ItemList<Mithril.Children>) {
    if (splitPossible()) items.add('ramonComposerPreview', toggleButton(), 10);
  });

  // Com a prévia ao lado, o "olho" do core (que leva à prévia dentro do
  // tópico) sobra.
  extend(TextEditor.prototype, 'controlItems', function (this: TextEditor, items: ItemList<Mithril.Children>) {
    const composer = (this.attrs as any)?.composer as ComposerState | undefined;

    if (composer && items.has('preview') && splitVisible(composer)) items.remove('preview');
  });

  // A resposta em andamento no fim do tópico: o placeholder volta a ser o
  // "Escreva uma resposta…" em vez do post esmaecido.
  override(REPLY_PLACEHOLDER as any, 'view', function (this: any, original: () => Mithril.Children) {
    if (!hideCorePreview()) return original();

    const attrs = this.attrs;
    const composingReply = attrs.composingReply;

    attrs.composingReply = () => false;

    try {
      return original();
    } finally {
      attrs.composingReply = composingReply;
    }
  });

  // O post em edição continua com o texto publicado, em vez da prévia esmaecida.
  override(COMMENT_POST as any, 'isEditing', function (original: () => boolean) {
    return original() && !hideCorePreview();
  });

  // `app.screen()` muda ao redimensionar a janela sem que nada redesenhe: a
  // coluna da prévia ficaria aberta num composer estreito (ou não voltaria).
  window.addEventListener('resize', () => {
    if (app.composer?.isVisible() && splitVisible() !== renderedSplit) m.redraw();
  });
}
