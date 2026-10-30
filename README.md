# Composer Preview

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/ramon/composer.svg)](https://packagist.org/packages/ramon/composer) [![Total Downloads](https://img.shields.io/packagist/dt/ramon/composer.svg)](https://packagist.org/packages/ramon/composer)

A [Flarum 2](https://flarum.org) extension that shows a live, side-by-side preview of the post while you write — in the default Flarum look, for any classic theme.

Extracted from the composer of the [Canela](https://github.com/ram0ng1/canela) theme, without the theme's styles.

## Features

- **Side-by-side preview** on desktop: the editor on the left, the formatted post on the right. It uses core's `ComposerPostPreview`, so Markdown, BBCode, mentions and emoji look exactly like the published post.
- **Show/hide button** in the composer corner (next to minimize and full screen). Each user's choice is remembered in the browser.
- Works in the new discussion, reply and edit composers, open or in full screen. Full screen widens to fit both columns.
- Phones and tablets keep the regular composer.
- When the Canela theme's own composer preview is on, this extension steps aside.

### Settings

- **Show the preview by default** — whether the preview starts open for users who haven't chosen yet.
- **Hide Flarum's preview in the discussion** — while the side-by-side preview is open, the faded post Flarum shows in the discussion (the reply being written, or the post being edited) is not shown. On phones and tablets, or with the side-by-side preview hidden, Flarum's preview stays.

## Installation

```sh
composer require ramon/composer:"*"
```

## Updating

```sh
composer update ramon/composer:"*"
php flarum cache:clear
```

## Links

- [Packagist](https://packagist.org/packages/ramon/composer)
- [GitHub](https://github.com/ram0ng1/composer)
