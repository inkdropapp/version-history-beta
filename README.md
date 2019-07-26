# Inkdrop Release Notes (Beta)

## v4.3.0-beta.2
2019-07-26

* **New feature**: Support changing created datetime and updated datetime of notes
  ![Screenshot](https://github.com/inkdropapp/version-history-beta/blob/master/images/v4.3.0-changing-datetime.png?raw=true)
* **New feature**: Add 'Notes' menu item to notebook filter side menu
* **Improvement**: Support warning about deprecated packages (Thanks Samantha and [Erdem](https://forum.inkdrop.app/t/black-screen-after-4-3-0-beta-version/1405))
* **Improvement**: Add app events `app:ready` and `app:quit` to [Environment](https://docs.inkdrop.app/reference/environment)
* **Improvement**: Update some dev stack

## v4.3.0-beta.1
2019-07-22

* **New feature**: Better table editing support
  * It automatically creates new row when pressing enter key
    * Command: `editor:new-line`
  * It lets you move across table cells with tab key
    * Command: `editor:move-to-next-table-cell` and `editor:move-to-previous-table-cell`
  ![Demo](https://github.com/inkdropapp/version-history-beta/blob/master/images/better-table-editing-support-demo.gif?raw=true)
* **New feature**: Support highlighting tables in the editor
  * Before: ![before](https://github.com/inkdropapp/version-history-beta/blob/master/images/gfm-table-support_before.png?raw=true)
  * After: ![after](https://github.com/inkdropapp/version-history-beta/blob/master/images/gfm-table-support_after.png?raw=true)
* **New feature**: Add [core:search-notes](https://docs.inkdrop.app/manual/list-of-commands#coresearch-notes) and [core:filter-notes](https://docs.inkdrop.app/manual/list-of-commands#corefilter-notes) commands
* **New feature**: Support select all items on note list bar with `core:select-all` command
* **New feature**: Support `enum` key in config schema for plugins. [See the doc for detail](https://docs.inkdrop.app/reference/config#enum).
* **Improvement**: Update syntax themes to support highlighting tables and codeblocks
* **Improvement**: Improve indenting ordered list items
* **Improvement**: Do not focus to the search bar when selecting search item with keyboard input
* **Bugfix**: Close window when it is in fullscreen (Thanks [Sammy](https://forum.inkdrop.app/t/app-crashing-when-quitting-while-fullscreen-on-mac/1329))
* **Bugfix**: Add missing commands for changing note status
  * `editor:change-note-status-(none|active|onhold|completed|dropped)`

## v4.2.0-beta.1
2019-06-30

* **New feature**: Support `editor.indentUnit` config (Thanks [Ahmed](https://forum.inkdrop.app/t/change-indentation-size/1368))
* **New feature**: Add `core:note-list-show-all-notes` and `core:sidebar-focus` commands
* **Improvement**: Add `.htm` extension to dialog filters (Thanks [jiunhsien](https://forum.inkdrop.app/t/import-hypertext-markup-language-files-with-filename-end-in-htm/1380))
* **Bugfix**: Skip listing invisible notes(`Completed`, `Dropped` state) properly (Thanks [Keiji-san](https://forum.inkdrop.app/t/sort-order-affects-visibility-of-notes/1358))
* **Bugfix**: Retain view options when changing order/sort
* **Bugfix**: Autoupdate not working on macOS

## v4.1.0-beta.1
2019-06-20

* **New feature**: Support `<config_dir>/styles.less` for style customizations
* **Improvement**: Highlight search text on running `editor:find` or `editor:replace` command (Thanks [Lu](https://forum.inkdrop.app/t/auto-highlight-last-search-query/1342)
* **Bugfix**: Sync won't work via web proxy (Thanks [Yusuke-san & Christian](https://forum.inkdrop.app/t/proxy-problem-when-synchronizing-notes/1341))
* **Bugfix**: Show error message when it failed to load local database
* **Bugfix**: Note tags are sometimes not properly migrated
* **Bugfix**: Broken sync with Android (Thanks [Joshua and Kato-san](https://forum.inkdrop.app/t/android-sync-appears-broken/1324))

## v4.0.1-beta.1
2019-06-06

* **New feature**: Support `<config_dir>/init.js` for advanced customizations
* **Bugfix**: `https_proxy` with non-ssl web proxy won't work (Thanks [Christian](https://forum.inkdrop.app/t/login-timeout-error-proxy-settings/1279) and [Rino-san](https://forum.inkdrop.app/t/i-cant-log-in-ssl3-get-record-wrong-version/1020/17))
* **Bugfix**: Updating FTS index won't be triggered unless you edit a note (Thanks [Sceptic, Hiro and Masatoshi-san](https://forum.inkdrop.app/t/v4-search-not-working-windows-and-android/1280/11))

## v4.0.0-beta.9
2019-06-04

* **Bugfix**: Plugin won't be loaded correctly due to babel error (Thanks [folks involved on this issue](https://github.com/libeanim/inkdrop-admonition/issues/1))

## v4.0.0-beta.8
2019-06-03

* **New feature**: Support configuring global keymaps to focus the app window (Thanks [Gustavo](https://forum.inkdrop.app/t/hotkey-to-open-show-inkdrop/1262))
* **New feature**: Support inkdrop:// app scheme (macOS) and argv (Windows & Linux) to open a note from external apps
* **New feature**: Hide main window instead of closing it (Thanks [Gustavo](https://forum.inkdrop.app/t/app-takes-a-while-to-open-up-on-macos-after-cmd-w/822))
* **Bugfix**: SVG files cannot be inserted (Thanks [John](https://forum.inkdrop.app/t/cannot-insert-svg-images/1271))

## v4.0.0-beta.7
2019-05-17

* **New feature**: Support inline image widgets for HTML img tags
* **Improvement**: Support filtering by tag (Thanks Horii-san)
* **Improvement**: Remember sidebar visibility (Thanks Horii-san)
* **Improvement**: Add left margin to count badge (Thanks [leptospira489](https://forum.inkdrop.app/t/thinner-scrollbar-on-windows-and-linux))
* **Bugfix**: JS compile cache not working

## v4.0.0-beta.6
2019-05-13

* **Improvement**: New logo
* **Improvement**: Change scrollbar width and color for Windows and Linux (Thanks [leptospira489](https://forum.inkdrop.app/t/thinner-scrollbar-on-windows-and-linux))
* **Improvement**: Change sidebar indent width slightly (Thanks Enokiya-san)
* **Improvement**: `ipm` command uses the client API key for the desktop app instead of requiring to generate an API key
* **Bugfix**: `devMode` won't work (Thanks Otawara-san)

## v4.0.0-beta.5
2019-05-02

* **Bugfix**: The app crashes when the note list scrolls after resizing the window (Thanks Horii-san)
* **Bugfix**: Preferences window crashes when opened a plugin detail
* **Bugfix**: Parse invalid search queries without errors

## v4.0.0-beta.4
2019-04-29

* **Improvement**: Improve sync to be more stable
* **Bugfix**: Clear find state in the editor when search keyword not set (Thanks [Erdem](https://forum.inkdrop.app/t/previous-search-history/1126/7?u=craftzdog))
* **Bugfix**: Notebook picker on the editor not working (Thanks Otawara-san)
* **Bugfix**: Cannot empty the trash (Thanks [Erdem](https://forum.inkdrop.app/t/cannot-empty-the-trash/1189))
* **Bugfix**: Show a proper error message on incompatible plugins

## v4.0.0-beta.3
2019-04-25

* **Improvement**: Way smoother smart scroll sync
* **Bugfix**: `ctrl-y` to redo in the editor not working on Windows and Linux (Thanks Otawara-san)
* **Bugfix**: Dbl-clicking urls to open on the editor not working (Thanks Otawara-san)
* **Bugfix**: Props for HTML `img` tag like `width` not working (Thanks [Kazutaka-san](https://forum.inkdrop.app/t/resizing-images-by-using-html-tag/1167/))
* **Bugfix**: Search keyword not being highlighted until you open a different note (Thanks [Erdem](https://forum.inkdrop.app/t/previous-search-history/1126/3))

## v4.0.0-beta.2
2019-04-24

* **Improvement**: Quicker smart scroll sync
* **Bugfix**: Can't toggle task list on preview
* **Bugfix**: Smart scroll sync is unstable (Thanks Otawara-san)
* **Bugfix**: Previous search text highlighting won't be cleared on the editor (Thanks [Erdem](https://forum.inkdrop.app/t/previous-search-history/1126))
* **Bugfix**: Backspace won't work on tags input bar (Thanks [FORTRAN](https://forum.inkdrop.app/t/tag-removal-not-working/1134))
* **Bugfix**: Can't remove notebooks and tags from sidebar

## v4.0.0-beta.1
2019-04-22

* **New feature**: End-to-end encryption
* **New feature**: New search UI
* **New feature**: Notebook submenus
* **New feature**: Count badges
* **New feature**: Smart scroll sync for side-by-side mode
* **Improvement**: Better performance for full-text search
* **Improvement**: Support embedding attachment images with HTML tags (Thanks [Erdem](https://forum.inkdrop.app/t/images-in-html-tag/1096))
* **Bugfix**: Exported PDF randomly skips inline image (Thanks [Asish](https://forum.inkdrop.app/t/exported-pdf-randomly-skips-inline-images/1070))
* **Bugfix**: First bullet point has an additional newline (Thanks [derkork](https://forum.inkdrop.app/t/first-bullet-point-has-an-additional-newline/1068) and Kuroyanagi-san)

## v3.25.0-beta.0
2019-01-06

* **New feature**: Support jump-to-line command (Thanks Otawara-san))
* **Improvement**: Use break-word for table when printing (Thanks Otawara-san)
* **Bugfix**: Vibrant background does not work on macOS Mojave (Thanks [Caleb](https://forum.inkdrop.app/t/vibrant-dark-ui-rendering-issue/187))
* **Bugfix**: Menu item not rendering properly on Ubuntu 18.04 (Thanks [andy](https://forum.inkdrop.app/t/menu-item-rendering-problem-on-ubuntu-18-04/556))
