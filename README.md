# Inkdrop Release Notes (Beta)

## v4.7.0-beta.2
2020-04-15

### New features
* Support `editor:open-link` command which allows you to open a link on browser from the editor. The default keystroke is <kbd>shift-ctrl-o</kbd>
* Support Workspace feature  
  ![workspace](https://github.com/inkdropapp/version-history-beta/blob/master/images/v4.7.0-beta.2_workspace.png?raw=true)
* Includes sub-notes when notebook item is collapsed  
  Expanded:  
  ![Expanded](https://github.com/inkdropapp/version-history-beta/blob/master/images/v4.7.0-beta.2_notebook-expanded.png?raw=true)  
  Collapsed:  
  ![Collapsed](https://github.com/inkdropapp/version-history-beta/blob/master/images/v4.7.0-beta.2_notebook-collapsed.png?raw=true)  
  The collapsing state also refrects listing notes so you can find sub-notes quickly
* Remember note list state in navigatin history
* Restore note list and editing state when exiting searching  
  While searching:  
  ![Searching](https://github.com/inkdropapp/version-history-beta/blob/master/images/v4.7.0-beta.2_restore-state_searching.png?raw=true)  
  After exiting from searching by hitting <kbd>Esc</kbd> key or clearing keyword, you get back to the previous state of the note list and the editor:  
  ![After exiting search](https://github.com/inkdropapp/version-history-beta/blob/master/images/v4.7.0-beta.2_restore-state.png?raw=true)  
  It is useful to write a note while referring to other notes.
* Filtering notebooks by keyword  
  ![Filter](https://github.com/inkdropapp/version-history-beta/blob/master/images/v4.7.0-beta.2_notebook-filter.png?raw=true)

### Improvements
* Show accelerators in context menu  
  ![accelerators](https://github.com/inkdropapp/version-history-beta/blob/master/images/v4.7.0-beta.2_accelerators.png?raw=true)
* Default keyboard shortcut for pinning notes
  - <kbd>P</kbd> on note list
* Show pinned notes to top on "**All notes**" and remove "**Pins**" menu
* Make `strong` & `em` text clearer in syntax themes
* Improve blockquote styling in syntax and preview themes
* Change the keystroke for `core:insert-link` to <kbd>cmd-k</kbd> or <kbd>ctrl-k</kbd>
* Add Emacsy keybindings for Linux and Windows, which was only supported on macOS:
  ```yaml
  '.CodeMirror textarea': {
    'ctrl-f': 'editor:go-char-right',
    'ctrl-b': 'editor:go-char-left',
    'ctrl-p': 'editor:go-line-up',
    'ctrl-n': 'editor:go-line-down',
    'alt-f': 'editor:go-word-right',
    'alt-b': 'editor:go-word-left',
    'ctrl-a': 'editor:go-line-start',
    'ctrl-e': 'editor:go-line-end',
    'ctrl-v': 'editor:go-page-down',
    'shift-ctrl-v': 'editor:go-page-up',
    'shift-ctrl-f': 'editor:go-char-right',
    'shift-ctrl-b': 'editor:go-char-left',
    'shift-ctrl-p': 'editor:go-line-up',
    'shift-ctrl-n': 'editor:go-line-down',
    'shift-alt-f': 'editor:go-word-right',
    'shift-alt-b': 'editor:go-word-left',
    'shift-ctrl-a': 'editor:go-line-start',
    'shift-ctrl-e': 'editor:go-line-end',
    'ctrl-d': 'editor:delete-char-after',
    'ctrl-h': 'editor:delete-char-before',
    'alt-d': 'editor:delete-word-after',
    'ctrl-k': 'editor:kill-line',
    'ctrl-t': 'editor:transpose-chars',
    'ctrl-o': 'editor:open-line'
  }
  ```
* Select next note when deleting notes (Thanks [Mike](https://forum.inkdrop.app/t/focus-after-deleting/1842))
* Restore focus when closing a dialog
* Smaler font size for note title
* Better performance in rendering note list items

### Bugfixes
* Plugin readme is not showing as expected
* Incorrect parent book Id is used when creating new notebook (Thanks [Gustavo](https://forum.inkdrop.app/t/v4-7-0-beta-1-beta-testing/1834/12?u=craftzdog))
* Prevent closing window on pressing <kbd>ctrl-w</kbd> on note title input bar on Windows and Linux
* Do not blur on pressing backspace with all text selected in tag input

## v4.7.0-beta.1
2020-03-25

### New feature
* [Pin notes to top](https://forum.inkdrop.app/t/pin-notes-and-reminder/672)  
  ![Pin notes to top](https://github.com/inkdropapp/version-history-beta/blob/master/images/v4.7.0-beta.1_pin-to-top.png?raw=true)
  - Todo
  - [ ] Drag & drop to pin notes
  - [ ] Default keyboard shortcut
* [Show sub-notebooks](https://forum.inkdrop.app/t/display-sub-notebooks-when-focussed-on-notebook/) in [notebook submenu](https://docs.inkdrop.app/manual/navigating-notes#notebook-submenu)  
  ![Show sub-notebooks in workspace](https://github.com/inkdropapp/version-history-beta/blob/master/images/v4.7.0-beta.1_subnotebooks-in-workspace.png?raw=true)
* [Remember sort & order](https://forum.inkdrop.app/t/save-remember-sort-order-settings-per-notebook/315) of note list per view (all/notebook/tag/status/pins)  
  ![Remember sort & order](https://github.com/inkdropapp/version-history-beta/blob/master/images/v4.7.0-beta.1_remember-sort-and-order.png?raw=true)
* Toggling statuses and tags in sidebar  
  ![Toggling statuses and tags](https://github.com/inkdropapp/version-history-beta/blob/master/images/v4.7.0-beta.1_toggle-tags-and-status.png?raw=true)

### Improvement
* Upgrade Electron from 7.1.3 to 8.2.0
  * It would be expected some performance improvement by the new IPC serialization with [Structured Clone Algorithm](https://github.com/electron/electron/pull/20214)
  * Node 12.13.0

## v4.4.0-beta.2
2019-10-09

* **Improvement**: Bump up Electron from 6.0.7 to 6.0.11
* **Improvement**: Bump up `ipm` from 2.1.6 to 2.4.3
* **Bugfix**: Opening next/prev note not working (Thanks Otawara-san)
* **Bugfix**: Revert changes regarding checkpointers of data sync which might have been causing that some notes won't be synced in some cases
* **Bugfix**: The scroll position is lost when toggling distraction free mode (Thanks [Bastian](https://forum.inkdrop.app/t/scroll-position-saved-across-sessions/1303/3))

## v4.4.0-beta.1
2019-10-07

* **New feature**: Importing markdown files (Thanks [q1701](https://github.com/q1701/inkdrop-import-markdown))
* **Improvement**: Bump up Electron from 3.1.4 to 6.0.7
* **Improvement**: Better UI performance
* **Bugfix**: Plugin configurations on prefrence window not working
* **Bugfix**: Pages from the second page are blank when exporting as PDF
* **Bugfix**: Some memory leaks in sync

## v4.3.0-beta.3
2019-08-05

* **Improvement**: Unnecessary spaces inserted when generating table rows (Thanks Otawara-san)
* **Improvement**: Prevent restoring window size from exceeding the screen bounds (Thanks [chocolat](https://forum.inkdrop.app/t/supported-restore-window-size-and-location/1419))
* **Improvement**: Re-render when toggled preview (Thanks [James](https://forum.inkdrop.app/t/official-plugin-issue-flowchart-rendering-issue/1412))
* **Improvement**: Change label for moving note to notebook (Thanks [James](https://forum.inkdrop.app/t/incorrect-label-on-move-to-another-notebook/1411))
* **Bugfix**: Error notification not showing when failed to load keymap.cson
* **Bugfix**: Show rendering error when failed to render Markdown and prevent the app crashing (Thanks ofton-san)

## v4.3.0-beta.2
2019-07-26

* **New feature**: Support changing created datetime and updated datetime of notes
  ![Screenshot](https://github.com/inkdropapp/version-history-beta/blob/master/images/v4.3.0-changing-datetime.png?raw=true)
* **New feature**: Add 'Notes' menu item to notebook filter side menu
* **Improvement**: Support warning about deprecated packages (Thanks Samantha and [Erdem](https://forum.inkdrop.app/t/black-screen-after-4-3-0-beta-version/1405))
  * You need to update [spell-checker](https://my.inkdrop.app/plugins/spell-checker) plugin for v4.3.0, which now supports multiple languages
  ![Screenshot](https://github.com/inkdropapp/version-history-beta/blob/master/images/v4.3.0-deprecation-warning.png?raw=true)
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
