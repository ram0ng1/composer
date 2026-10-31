import type ComposerState from 'flarum/forum/states/ComposerState';
/**
 * Se cabem as duas colunas agora: computador (`app.screen()` diz "desktop-hd"
 * a partir de 1100px, e as duas valem), composer aberto ou em tela cheia.
 */
export declare function splitPossible(composer?: ComposerState): boolean;
export declare function splitVisible(composer?: ComposerState): boolean;
export declare function fullPreviewPossible(composer?: ComposerState): boolean;
export declare function fullPreviewVisible(composer?: ComposerState): boolean;
export default function installSplitPreview(): void;
