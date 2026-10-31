<p align="center">
  <img src="icon.svg" width="80" height="80" alt="Composer Preview">
</p>

<h1 align="center">Composer Preview</h1>

<p align="center">
  <a href="https://github.com/ram0ng1/composer/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/ram0ng1/composer/ci.yml?branch=main&style=flat-square&label=ci"></a>
  <a href="https://packagist.org/packages/ramon/composer"><img alt="Packagist" src="https://img.shields.io/packagist/v/ramon/composer?style=flat-square&label=packagist"></a>
  <a href="https://packagist.org/packages/ramon/composer"><img alt="Downloads" src="https://img.shields.io/packagist/dt/ramon/composer?style=flat-square"></a>
  <img alt="Flarum" src="https://img.shields.io/badge/flarum-2.x-e7672e?style=flat-square">
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-blue?style=flat-square"></a>
  <a href="https://donate.stripe.com/fZe5o66nebkf39S28a"><img alt="Donate" src="https://img.shields.io/badge/donate-stripe-6772E5?style=flat-square"></a>
</p>

<p align="center">A side-by-side live preview for the Flarum 2 composer.</p>

Composer Preview puts the formatted post right next to the editor while you write: Markdown on the left, the post as it will be published on the right. It uses Flarum's own preview renderer, so mentions, emoji, BBCode and Markdown come out exactly as they will in the discussion.

It started life inside the composer of the [Canela](https://github.com/ram0ng1/canela) theme. People running classic themes asked for it on its own, so here it is, without Canela's styles and in Flarum's default look, ready for any theme.

## What it does

- A second column in the composer on desktop with the live preview, for new discussions, replies and edits, open or in full screen
- Full screen widens to fit both columns, and on a discussion page the composer takes the full width while the preview is open
- A button in the composer corner, next to minimize and full screen, to show or hide the preview; each person's choice is remembered in their browser
- Optionally hides Flarum's own faded preview in the discussion while the side-by-side preview is open, so there is only one preview on screen
- On phones and tablets, where two columns do not fit, a **Preview** button in the composer footer swaps the editor for the formatted post across the full screen, to keep scrolling to a minimum; **Write** brings the editor back with the text and cursor where they were
- Resizing the window switches between the two columns and the full-screen preview as they fit
- Steps aside when the Canela theme's own composer preview is on, so you never get two

## Installation

```sh
composer require ramon/composer
php flarum cache:clear
```

Enable Composer Preview on the Extensions page. There are no permissions and no database changes.

## Good to know

- **Show the preview by default** (on by default) decides whether the preview starts open for people who have not chosen yet. Once someone clicks the button, their own choice wins, in that browser.
- **Hide Flarum's preview in the discussion** (off by default) removes the faded post Flarum shows at the end of the discussion while you reply, and keeps the published text of a post you are editing, but only while the side-by-side preview is open. On phones and tablets, or with the side-by-side preview hidden, Flarum's preview stays, so nobody is left without one.
- **Full-screen preview on phones and tablets** (on by default) adds the **Preview** / **Write** button. On phones the composer grows to the whole screen while previewing (Flarum keeps it short to leave room for the keyboard, and there is no keyboard while you read); on tablets it enters Flarum's own full screen and leaves it when you go back to writing. The formatting toolbar is hidden while previewing, since it would type into the hidden text. Opening another composer, or closing this one, starts back in the editor.
- The composer's "eye" button (which jumps to Flarum's preview in the discussion) is hidden while the side-by-side preview is open, and replaced by **Preview** on phones and tablets.
- The column appears from Flarum's desktop breakpoint (992px) up.
- The preview is drawn inside `.ComposerBody-editor` as its last child, so extensions that add their own items to the composer body or the editor keep working.

## Updating

```sh
composer update ramon/composer
php flarum cache:clear
```

## License

[MIT](LICENSE). Suggestions and bug reports go in the [issue tracker](https://github.com/ram0ng1/composer/issues).
