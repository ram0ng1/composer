/*
 * Se a prévia fica aberta: a escolha de cada pessoa, guardada no navegador.
 * Sem escolha ainda, vale o padrão do admin.
 */
import app from 'flarum/forum/app';

const STORAGE_KEY = 'ramon-composer.preview';

// Sem localStorage (modo privado do Safari, cookies bloqueados), a escolha
// vale até sair da página.
let memory: boolean | null = null;

function defaultVisible(): boolean {
  return app.forum.attribute<boolean | undefined>('ramonComposerPreviewDefaultVisible') !== false;
}

export function previewPreferred(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored !== null) return stored === '1';
  } catch {
    if (memory !== null) return memory;
  }

  return defaultVisible();
}

export function setPreviewPreferred(visible: boolean): void {
  memory = visible;

  try {
    localStorage.setItem(STORAGE_KEY, visible ? '1' : '0');
  } catch {
    // Fica só na memória.
  }
}
