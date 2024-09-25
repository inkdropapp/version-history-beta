# Inkdrop Release Notes (Beta)

## v5.9.0-beta.0
2024-09-25

## 🔎 The full-text search engine is now language-agnostic

> [!NOTE]
> This is the same update on [mobile v5.4.0](https://forum.inkdrop.app/t/inkdrop-mobile-v5-4-0-ground-up-improvements/4975)

This update would solve this issue: [Odd searching issue when searching for text](https://forum.inkdrop.app/t/odd-searching-issue-when-searching-for-text/4477)

The app had been using the language-dependent tokenization processes called [Porter stemming algorithm](https://tartarus.org/martin/PorterStemmer/) and a Japanese-specific segmentation algorithm.
In some cases, they cause some odd searching issue, where [you can't find notes with particular keywords](https://forum.inkdrop.app/t/odd-searching-issue-when-searching-for-text/4477).

I recently found that SQLite3 officially supports [the trigram tokenizer](https://forum.inkdrop.app/t/odd-searching-issue-when-searching-for-text/4477/3?u=craftzdog).
I managed to migrate to it. Now, you can use any languages including Chinese, Japanese, Arabic, etc., in your notes!
Also, it fully supports partial matching, so it is optimal for searching code snippets.
For example, it can properly find a note with a code fragment like `"er } = require("`.

![trigram-demo](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:1gCh5Ch8/index-public)

## 🕵️‍♀️ Highlight matched keywords in the note list

![highlight-matched-keywords](inkdrop://file:rOo4VOJN)

As you can see in the above screenshot, it now can highlight matched keyworeds in the note list, which would help you more quickly find your desired note.

## Improvements

- feat(context-menu): add 'Paste as Plain Text' to the editor context menu
  ![Paste as Plain Text context menu #x-small](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:nF_3MZmI/index-public)

## Bug fixes

- fix(dialog): `updatedAt` should not be updated when the note gets moved
- fix(theme): Cannot enable Vibrant dark theme on the light mode on the system (Thanks [SDO and Marco](https://forum.inkdrop.app/t/can-not-enable-vibrant-dark-theme/4595))
- fix(redux): prevent performing some actions on the non-existing notebooks (Thanks [Akiya-san](https://forum.inkdrop.app/t/when-i-open-it-in-the-windows-version-its-all-dark/4612)
  - Prevent opening another note when failing to save the current note
  - Prevent creating a new note in the notebook that does not exist
  - Display an error dialog when failing to create a new note
- fix(layouts): editor view icons overlap with Search / Replace buttons (Thanks [Marco](https://forum.inkdrop.app/t/editor-view-icons-overlap-with-search-replace-buttons/4638))
- fix(layout): missing window buttons on the error blank slate (Thanks [gaeulbyul](https://forum.inkdrop.app/t/window-buttons-may-disappear-in-some-situations/4716))
- fix(preview): odd spacing in the metadata pane (Thanks [Lukas and Dmitry](https://forum.inkdrop.app/t/spacing-between-backlinks-is-not-uniform/4710))
- fix(preferences-plugins): queries should be debounced
- fix(theme): Missing olive tag color (Thanks [Lukas](https://forum.inkdrop.app/t/theme-default-dark-ui-missing-color-olive/4491))
- fix(preferences-plugins): Blank screen from search on filter of Installed plugins (Thanks [Bundit](https://forum.inkdrop.app/t/blank-screen-from-search-on-filter-of-installed-plugins/4605))

## v5.8.1-beta.2
2024-04-23

## Bugfixes

- mde: custom font family not being applied (Thanks [Shimizu-san](https://forum.inkdrop.app/t/the-font-family-is-not-reflected-5-8-1-beta-1/4565))
- dev-tools: Copy tag id from sidebar throws an error (Thanks [Lukas](https://forum.inkdrop.app/t/plugin-dev-tools-copy-tag-id-from-sidebar-throws-an-error/4570))
- Do not enable the 'Readable Line Length' option by default (Thanks [Shimizu-san](https://forum.inkdrop.app/t/readable-line-length-option-is-not-accepted/4569))

## Improvements

- Avoid triggering **Auto link title** when the cursor is in the middle of the link
  - For example, when you type `[link title](|` (`|` is the cursor position) and hit <kbd>Cmd/Ctrl-V</kbd>, it shouldn't trigger the paste-as-link dialog.

## Internal changes

### Adopting Cascade Layers

[Cascade layers](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_layers) would make theming much simpler.
They allow themes to avoid rule specificity issues.
Inkdrop will bundle more default styles in the future versions, and with cascade layers, custom themes will only need to override the default styles rather than including every style.

UI, syntax, and preview themes are automatically enclosed with the corresponding cascade layers in v5.8.1.
The order of precedence is defined as the following at the moment:

```css
@layer reset, base, tokens, theme, theme.ui, theme.preview, theme.syntax;
```

- `reset`: Reset styles
- `base`: The app base styles
- `tokens`: CSS common variables
- `theme.ui`: UI theme
- `theme.preview`: Preview theme
- `theme.syntax`: Syntax theme

### Others

- Remove the reset CSS styles from UI theme stylesheets automatically when loading
- 🐛 Focus rings not working on some components
  - Changed the cascading layer to `@layer theme.ui`

## v5.8.1-beta.1
2024-04-19

## Bug fixes

- Wrong icon in 'Apps and Features' list on Windows (Thanks [Dmitry](https://forum.inkdrop.app/t/default-electron-icon-in-apps-and-features-list/4548))
- Scroll positions get reset when changing the layout (Thanks [Ivan](https://forum.inkdrop.app/t/keep-the-edit-location-when-toggle-side-bar/4545))
- Random crashes when quitting Inkdrop on Windows (Thanks [Patrick](https://forum.inkdrop.app/t/error-on-closing-inkdrop-on-win-11/4561))
- The 'Create' button does nothing on the Paste URL as Link dialog (Thanks [Patrick](https://forum.inkdrop.app/t/paste-of-url-does-nothing-on-hitting-create/4559))
- Duplicate menu items in the Trash notebook (Thanks [Dmitry](https://forum.inkdrop.app/t/duplicate-items-in-the-context-menu/3599/5?u=craftzdog))

### Embed the default preview theme in the app

In v5.8.1, the app would solve the following issue by embedding the default preview theme:

- GFM Alerts not working on community preview themes (Thanks [Kentaro and taichi](https://forum.inkdrop.app/t/there-might-be-a-bug-in-rendering-alerts/4529)

The problem is that themes have to provide every style, which requires to update when the app gets a new feature with a stylesheet.
Since we can't expect every theme developer to sustainably and quickly update their themes, it'd be nice to have the default styles instead of requiring the themes to include every style.
So, from this version, themes basically 'override' the default theme.

https://github.com/inkdropapp/inkdrop-github-preview-theme

The default preview theme `github-preview` now doesn't apply any styles.
If you create a new preview theme, you only have to add styles for customizations.

This way, the existing preview themes can continue working without updating, like GFM Alerts.

In the future, I'll make the same change to the UI themes.

## Improvements

### Update the GitHub preview theme to match the latest GitHub styles

The default preview theme was outdated, so it has been updated based on [this reopsitory](https://github.com/sindresorhus/github-markdown-css).
This also fixes the task list identation issue (Thanks [Dmitry](https://forum.inkdrop.app/t/no-text-indentation-in-checklist-preview/4536)).

### Apply the syntax theme to codeblocks in the Markdown preview (Needs update)

While working on simplifying theming the Markdown preview styles mentioned above, I thought it'd be nice to support applying the current syntax theme to the codeblocks in the preview pane automatically.
It allows you to avoid making another preview theme just for changing the codeblock syntax highlighting styles.

For example: Solarized Dark

![Solarized Dark](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:-9cyFnTmz/index-public)

Solarized Light:

![Solarized Light](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:1Weo0dhfD/index-public)

#### How to make your syntax theme support it

The Markdown renderer now adds a class name `.codeblock` to the enclosing `div` elements of the codeblocks.
So, it is easy to add styles to them just by adding a CSS selector `.mde-preview .codeblock pre` to your stylesheet like so:

```diff
diff --git a/styles/index.css b/styles/index.css
index 14ae539..3f6bcbb 100644
--- a/styles/index.css
+++ b/styles/index.css
@@ -26,7 +26,8 @@ http://ethanschoonover.com/solarized/img/solarized-palette.png
   --base-magenta: #d33682;

   /* Color scheme for code-mirror */
-  .CodeMirror {
+  .CodeMirror,
+  .mde-preview .codeblock pre {
     color-scheme: dark;

     color: var(--base05);
     .cm-header {
       color: var(--base-yellow);
     }
```

Check out [Solarized Dark Syntax](https://github.com/inkdropapp/inkdrop-solarized-dark-syntax-theme) for more detail.

### Better Preferences UI

The setting items have been organized and it has got much easier to find and change settings.

![Better setting UIs](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:2HqnvlOPy/index-public)

And the Plugins page has got a filter input:

![Filter installed plugins with keyword](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:ksYfsq6pr/index-public)

### New editor option: "Paste URL as link"

Some people don't like the feature (Thanks [Ryota](https://forum.inkdrop.app/t/how-disable-auto-link-title/4558)).

- **Preferences** -> **Editing** -> **Markdown** -> **Paste URL as link**

![Preferences](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:7bFuyciCn/index-public)

## v5.8.0-beta.3
2024-03-29

## Improvements

- fix(editor): unpin when changing the note status to 'Completed' or 'Dropped'
- feat(tutorial): add video tutorial links
- fix(preview): change the metadata section style to make it clear as a UI rather than note content
- feat(notebook-list-bar): keyword matching includes parent notebook names

## Bugfixes

- fix(markdown): inline style tags not working
- fix(editor): toggline side-by-side mode does not sync scroll bar positions properly
- fix(preview): the broken link icon still remains when editing
- fix(search-bar): keyword won't be reset when changing the note list view
- fix(note-list-bar): selection gets messed up when holding up/down arrow key to select notes so fast
- fix(github-preview): incorrect colors of nested alerts
- fix(auto-link-title): do not insert when inside image link
- fix(markdown): line breaks not working in gfm-alerts (Thanks Lukas)
- fix(editor): layout gets corrupted when having custom panes like sidetoc
- fix(editor-meta): read-only state is not handled in meta-notebook
- fix(preview): remove margin-top for headings immediately under the metadata section
- fix(editor): avoid opening the same note via a command
- fix(preview): do not render the metadata section when print mode
- fix(preferences): incorrect label 'htmlFor' attribute (Thanks [Tahsin](https://forum.inkdrop.app/t/invisible-characters-and-line-length-label-problem/4489))
- fix(editor): allow url to be pasted without an assist feature
- chore(themes): use vanilla CSS instead of LESS

## v5.8.0-beta.2
2024-03-15

## Revisiting the editor drawer

In v5.8.0-beta.1, the backlinks have been added to the editor drawer.
But as [picklecillo pointed out](https://forum.inkdrop.app/t/making-the-editor-drawer-permanently-available/4486), you may want to make it persistent so that you can jump around the linked notes quickly.

First, I considered adding another dropdown for backlinks next to the notebook name under the note title.
But I thought it wouldn't be useful if you want to check backlinks across multiple notes sequentially.
I found myself rarely opening the editor drawer to check the note information.
It should be solely used for additional actions like ‘Revision history’, ‘Share on web’, ‘Pin to top’, etc, that’s simple and easy to understand.
Instead of adding various things to the editor drawer and making it complicated, it’d be nice to display the note metadata and backlinks in the preview.

So, I decided to render the note information in the preview as a part of the note, as you can see below:

![Metadata rendered in the preview](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:YInbeS2wd/index-public)

This way, you can quickly check the metadata without toggling the editor drawer while it doesn’t distract your writing experience.

The backlink section can be folded. The app remembers the fold/unfold state across notes.

![fold/unfold the backlink section](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:Ou6mihANI/index-public)

The scroll sync still works just fine:

![scroll sync](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:WWPL0i2SU/index-public)

## New option: Readable line lengths

This option limits the maximum width of the editor and preview panes to prevent excessively long lines of text. Enabled by default.

![New option](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:VUNwrLDtR/index-public)

## Bugfixes

- fix(macOS): Full Screen Button Disable Problem ([Thanks Tahsin](https://forum.inkdrop.app/t/full-screen-button-disable-problem/4474))
- fix(note-list): Inconsistent tag filtering ([Thanks Lukas](https://forum.inkdrop.app/t/inconsistent-tag-filtering/4480))
- fix(editor): Auto link title: does not properly check whether only exactly one link is inserted ([Thanks Lukas](https://forum.inkdrop.app/t/auto-link-title-does-not-properly-check-whether-only-exactly-one-link-is-inserted/4479))

## v5.8.0-beta.1
2024-03-08

I'm excited to announce v5.8.0-beta.1, which has got so many improvements and new features!

## Inter-note workflow improvements

v5.8.0 works much more efficiently in connecting your notes.

### 🆕 Backlinks

If you connect your notes with internal links, you may want this feature. It now supports displaying which notes have links to the current editing note on the editor drawer.

[![v5-8-0_backlinks](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:nyeS7KLdE/index-public)](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:nyeS7KLdE/index-public)

With backlinks, you can quickly jump around related notes.

### Tip: Wiki-style link creations

If you are used to writing Wiki, do you know Inkdrop supports creating placeholder links? It is simple. Just write a link without an URI!

```
- [Link title]()
```

Then, click it on the preview pane and it will create a new note with the title. As of v5.8.0, it automatically updates link titles in the note when you change the note title.

### 🆕 Create a new note from the selection

When debugging a bug, you sometimes find another issue to solve as your investigation goes deeper. You already took some notes on the new issue. Inkdrop doesn't block your concentration by allowing you to create a new note from the selection.

First, select the text and right-click it on the editor:

[![v5.8.0-beta.1_create-new-note-from-selection_01](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:eQzNYZaJV/index-public)](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:eQzNYZaJV/index-public)

A dialog shows up, then input a note title:

[![v5.8.0-beta.1_create-new-note-from-selection_02](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:iREk41NjW/index-public)](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:iREk41NjW/index-public)

Hit <kbd>Enter</kbd>, and you get a new note with the selected text.

[![v5.8.0-beta.1_create-new-note-from-selection_03](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:m-WMQ5F9a/index-public)](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:m-WMQ5F9a/index-public)As you can see, you already have a backlink from the source note. You can click it to go back.

[![v5.8.0-beta.1_create-new-note-from-selection_04](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:qS5q_-EaZ/index-public)](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:qS5q_-EaZ/index-public)

The selected text is replaced with a link to the new note.

- New command:
  - `core:new-note-from-selection`

### 🙌 Remember the scroll positions

When writing a note while referring to other notes, it was frustrating to always get the cursor and scroll positions to be reset when going back to the note. In order to help you work with multiple notes efficiently, v5.8.0 now remembers the cursor and scroll positions in the navigation history.

In the above example, when clicking a backlink, the cursor position is already where the new link is created.

## Navigation improvements

### 🫡 Preserve the note list order when clicking a tag on the note list item

The tag labels on the note list allow you to click to filter by a tag, which is handy to quickly narrow down to a specific topic on the list. By design, it was using the full-text search feature internally, which always changed the sort order to 'Best match'. It looked strange as you just intended to filter the current notes, but not to search with keywords, so the list sort order should be preserved. As of v5.8.0, it now properly preserves the sort order when filtering by a tag.

For example, some notes are tagged with 'v5.8.0'. Currently, the note list displays all the notes in a workspace of the notebook 'Inkdrop', ordered by last modification dates in descending order. You want to filter notes by the tag by clicking it on the note list item.

[![v5.8.0-beta.1_preserve-note-list-sort-order_01](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:eI86r2uX4/index-public)](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:eI86r2uX4/index-public)

Then, the note list displays only notes with the tag 'v5.8.0'. Before, it changed the order to 'Best Match'. As of v5.8.0, it preserves the sort order, which is the last modification date in the descending order in this example.

[![v5.8.0-beta.1_preserve-note-list-sort-order_02](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:zFSW1sX2o/index-public)](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:zFSW1sX2o/index-public)

You can of course change the order from the dropdown menu on the note list header bar anytime.

### 'Go to Workspace' context menu

When you are checking notes in the 'All Notes' on the sidebar, you may feel like quickly jumping into a workspace view of the viewing note. You could open a notebook but it now also lets you go to the workspace view from the context menu of the notebook dropdown menu on the editor:

[![v5.8.0-beta.1_go-to-workspace](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:PzVbjS52Z/index-public)](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:PzVbjS52Z/index-public)

But what about nested notebooks? Let's say, you see a note in the child notebook, but you want to go to the workspace of the parent notebook. No worries. After selecting the 'Go to Workspace' context menu, the focus moves to the sidebar. Then, you can hit <kbd>Backspace</kbd> to go up to the parent workspace.

[![v5.8.0-beta.1_go-to-workspace_02](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:9ljmf5sQR/index-public)](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:9ljmf5sQR/index-public)

It is helpful to quickly switch between projects.

- New commands:
  - `editor:go-to-workspace-of-editing-note`
  - `core:sidebar-workspace-go-up`

## Editor improvements

### 🔔 Markdown Alerts syntax support

Recently, GitHub officially supports [Alerts](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts). It is a simple extension of Markdown, which allows you to insert 'alerts' a.k.a. admonitions or callouts. For example:

```
> [!IMPORTANT]
> This is currently a work in progress, expect things to be broken!
```

[![v5.8.0-beta.1_gfm-alerts_01](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:c6cvtAUIq/index-public)](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:c6cvtAUIq/index-public)

Inkdrop now supports these alerts, too!

[![v5.8.0-beta.1_gfm-alerts_02](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:wElcnzkli/index-public)](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:wElcnzkli/index-public)

You don't have to remember the syntax. The editor toolbar has got a button for alerts here.

[![v5.8.0-beta.1_gfm-alerts_03](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:7wg_OIJCm/index-public)](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:7wg_OIJCm/index-public)

- New commands:
  - `core:insert-alert-note`
  - `core:insert-alert-tip`
  - `core:insert-alert-important`
  - `core:insert-alert-warning`
  - `core:insert-alert-caution`

### 🔗 Auto link title

Links are crucial for tech note-taking since you often need to refer to external information from your notes.

I've been using John's [paste-url](https://my.inkdrop.app/plugins/paste-url) plugin to paste URLs as a Markdown link. In this release, I'm happy that it is now officially supported!

For example, you are referring to a bug report on the GitHub repository and you'd like to mention it in your note. You can copy the URL from the browser and paste it in the editor, then a dialog shows up:

[![v5.8.0-beta.1_auto-link-title](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:gD2U5mzPv/index-public)](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:gD2U5mzPv/index-public)

The app automatically fetches the page title of the given URL. You can choose a link format with up/down arrow keys. It can correctly extract the page title even if the website doesn't support server-side rendering, which is nice.

## UI design improvements

### 🧐 Focus outlines

I wanted to improve a small but fundamental thing - focus indicators. Since some input components like buttons and the search bar didn't have proper focus outlines, you couldn't tell where the current focus is. This improvement makes you a bit more comfortable to press <kbd>Tab</kbd> to move focus around.

[![v5.8.0-beta.1_focus-outlines](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:ezfusyqt8/index-public)](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:ezfusyqt8/index-public)

### 🔖 Better tag appearances for the dark UI theme

The tag colors were too vibrant when you were on the dark UI theme. As a big fan of using tags, I wanted to make them look more unified for it.

[![v5.8.0-beta.1_tag-redesign-for-dark](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:gxKqYycRI/index-public)](https://uploads.inkdrop.app/attachments/user-d975606d93c067c5ef8d6adfb5db83b5/file:gxKqYycRI/index-public)

## Other improvements and bug fixes

- chore(electron): Bump up to 28.1.3
- fix(ipm): rimraf is not loaded beforehand
- fix(sidebar): hovering sidebar item not highlighting when dragging a note item
- fix(dnd): offset of custom drag layer is incorrect
- fix(database): completed or dropped notes are not properly moved to trash when deleting a notebook
- fix(navigation): Support mouse button 3 and 4 for navigation on Windows and Linux
- fix(semantic-ui): Drop jQuery 😭👍
- fix(process-diff): update internal note links when a note gets renamed its title (Thanks Lukas)
- fix(note-list): Filtering tags with spaces in the tag name does not work (Thanks [Lukas](https://forum.inkdrop.app/t/filtering-tags-with-spaces-in-the-tag-name-does-not-work/4358))
- fix(note-list): Note list not updated when editing so fast

## v5.6.3-beta.0
2024-01-15

## Improvements
- feat(mde-preview): support creating a note from an empty link ([Related topic](https://forum.inkdrop.app/t/backlink-support/4287/4?u=craftzdog))
- feat(deep-link): support opening plugin detail from URI
  - Example: <inkdrop://plugin/mermaid>
- feat(command): add `core:copy-note-uri`, which copies a URI of the selected note
- feat(preview): support internal note link expansion: Render rich internal links to enhance connecting notes
- feat(note-list): **Experimental**: support filtering by tag by just clikcing a tag list item on the note list item
- feat(search): clearing the search keywords should not open the last opened note (Thanks [SDO](https://forum.inkdrop.app/t/do-not-reset-note-when-clearing-search-filter/4317))
- feat(sidebar): animate sidebar list items
- feat(sidebar): animate workspace transition
- feat(ui): animate main layout
- fix(editor-title): support moving focus to editor from title input with DOWN key (Thanks [Phil](https://forum.inkdrop.app/t/consistent-keyboard-navigation-between-note-title-and-body/4335))
- fix(redux-store): navigation: push state when opening a workspace (Thanks [picklecillo](https://forum.inkdrop.app/t/navigating-back-from-detail-view-does-not-update-the-notes-list/4333))

## Bug fixes
- fix(clipboard): cleaning up html unexpectedly removes `\r`
- fix(note-status): make conflicted notes when changing note status via keyboard shortcuts (Thanks [Anon](https://forum.inkdrop.app/t/conflicts-when-statuses-change-quickly/4277))
- fix(proxy): do not use proxy agent with axios. it causes the app to access with a wrong port (Thanks [Shimizu-san](https://forum.inkdrop.app/t/cannot-log-in-under-a-proxy-environment-v5-6-2/4276/2))
- fix(theme-manager): (Internal) ignore the initial `add` event
- fix(package-manager): should ignore the resolve file error (Thanks [Brenton](https://forum.inkdrop.app/t/it-doesnt-fall-back-to-the-default-themes-if-a-custom-one-does-not-exist/4297))
- fix(dropdown): click handler should hide when clicking the dropdown label again when visible (Thanks [Jakub](https://forum.inkdrop.app/t/status-shortcuts-and-drop-menu-issues/2857) and [Simon](https://forum.inkdrop.app/t/status-menu-wont-close-after-clicked-twice/4275))
- fix(keymap): <kbd>cmd-alt-m</kbd> is used by system global shortcut on macOS
  - Changed the keymap for `core:move-to-notebook` from <kbd>cmd-alt-m</kbd> to <kbd>cmd-ctrl-m</kbd>
- fix(redux): the editor should wait for saving the note before closing
- fix(macOS): app hungs when typing text while CapsLock is enabled on macOS (Thanks [Alessandro and Jack](https://forum.inkdrop.app/t/inkdrop-hangs-on-macos-sonoma-with-caps-lock-active/4347))

## v5.6.2-beta.0
2023-11-16

## Bug fixes
- fix(note-list): The popup menu for opening notebook not working (Thanks [Shogo-san](https://forum.inkdrop.app/t/v5-6-0-open-notebook/4215))
- fix(keymap): Canceling multi-stroke keymaps not working (Thanks [Markus](https://forum.inkdrop.app/t/keymap-json-keybindings-mess-up-custom-keymaps/4220))
- fix(editor): "Move to notebook" not working properly, where it randomly moves a previously opened note (Thanks [Shimizu-san](https://forum.inkdrop.app/t/issue-with-changing-notebooks-in-inkdrop-5-6/4243))
- fix(editor): Do not transform HTML into Markdown when pasting if it has special markups (Thanks [Jake and Lukas](https://forum.inkdrop.app/t/copy-paste-can-introduce-foriegn-charachters/4249))

## Improvement
- chore(electron): Bump up to 25.9.5

## v5.6.0-beta.4
2023-10-12

## Bug fixes
- fix(plugins): Bundled plugins are not working (Thanks [Lukas](https://forum.inkdrop.app/t/autoupdate-does-not-install-the-normally-preinstalled-plugins/4196))
- chore(assets): Remove Font Awesome as it is no longer used anywhere

## Improvement
- fix(editor): The notebook picker supports filtering by keyword
  ![notebook picker improved](https://github.com/inkdropapp/version-history-beta/blob/master/images/v5.6.0-notebook-picker-improved.png?raw=true)

## v5.6.0-beta.3
2023-10-10

## Bug fixes
- fix(server): Local HTTP server not working (Thanks [Raivis](https://forum.inkdrop.app/t/impossible-to-connect-live-export/4147/9))
- fix(editor): floating action buttons not appearing right after the launch (Thanks [Lukas](https://forum.inkdrop.app/t/the-editors-floating-actions-are-not-directly-visible/4187))
- fix(ipm): The CLI command `ipm install` not working (Thanks [Raivis](https://forum.inkdrop.app/t/impossible-to-connect-live-export/4147/8))

## v5.6.0-beta.2
2023-10-03

## Bug fixes
- fix(preview): number of task list items not updated correctly (Thanks [Lukas](https://forum.inkdrop.app/t/task-list-is-not-updated-when-saving-notes/4163))
- fix(html): do not load `browser-commons.js` (Thanks [Lukas](https://forum.inkdrop.app/t/unexpected-error-message-in-the-console/4170/2))
- fix(share): The app crashes when sharing a note (Thanks [Martin](https://forum.inkdrop.app/t/black-window-on-sharing-in-5-6-0-beta-1/4174))
- fix(preferences): Add a note on the acrylic background effect on Windows
- fix(login): The login screen is broken

## v5.6.0-beta.1
2023-09-22

## ✨ Nested workspace views
In previous versions, pressing the "Detail" button on the notebook would take you to the workspace view, but you couldn't press the "Detail" button again once you were in that view.
In this update, the "Detail" button is now functional within the workspace view as well!

![nested workspace view](https://forum.inkdrop.app/uploads/default/original/2X/7/70deb1d54021785330b8ff881f949ac253e9c37a.jpeg)

The sidebar now displays the path of the current and parent notebooks:

![nested workspace view 2](https://forum.inkdrop.app/uploads/default/original/2X/b/b4d01ce272032530449d11aa068cd52c488f928b.jpeg)

## Bug fixes
- Can't change tag colors (Thanks [Lukas](https://forum.inkdrop.app/t/changing-the-color-of-a-tag-fails/4107))
- Defer updating the preview a bit longer when the preview is not visible (Thanks [Seito](https://forum.inkdrop.app/t/keystrokes-are-slow-in-the-beta-version/4122/5))
- When exporting, use `Untitled` if the note title is empty
- Different modules like `react` get loaded from an incorrect path, which causes the app to crash (Thanks [Jaime](https://forum.inkdrop.app/t/math-plugin-not-working-nor-found/4130))
- The cursor jumps to a wrong position when toggling the side-by-side mode
- The app crashes when uninstalling a plugin from Preferences (Thanks [Lukas](https://forum.inkdrop.app/t/inkdrop-crashes-when-i-uninstall-a-plugin/4141/))
- The note counts are not updated correctly in the workspace views (Thanks [SDO](https://forum.inkdrop.app/t/status-not-updating-for-subnotebook-notes-in-focused-notebook/4151))
- `open()` does not open the url in a browser but opens it in an internal browser window instead (Thanks [Shimizu](https://forum.inkdrop.app/t/v5-6-how-to-use-an-external-browser-with-the-open-method/4145))
- Sidebar display all notes after toggling off a distraction free (Thanks [Bundit](https://forum.inkdrop.app/t/sidebar-display-all-notes-after-toggling-off-a-distraction-free/4111))

## API
I've been preparing to support the command palette feature. A new API for it is available on `CommandRegistry`. You can use it like so:

```js
inkdrop.commands.findCommands({target: document.querySelector('.CodeMirror')})
```

## v5.6.0-beta.0
2023-08-29

## 💨 Faster launch speed

Managed to make it 500-700ms faster 🚀

Here is a demo:

![file_Gs-9UL_8u|433x500](https://forum.inkdrop.app/uploads/default/original/2X/0/0c3f975cfc231e951ba923fc4d86c959cd116295.gif)

**✍️ STORY**: [How I made Inkdrop 500ms faster to launch🚀](https://www.devas.life/how-i-made-inkdrop-500ms-faster-to-launch/)

### Loading plugins lazily

Along with v5.6.0, some plugins have been updated with performance improvements as well. [mermaid](https://my.inkdrop.app/plugins/mermaid) and [math](https://my.inkdrop.app/plugins/math) load their modules only when you open a note that uses one of them. It would keep the launch speed fast even if you installed plugins that require massive modules like them.

## 🎨 Markdown renderer engine update

v5.6.0 has upgraded Remark and Rehype packages to the latest versions. It isn't only an internal improvement but also gives you more possibilities to get useful features. It now has `mdast` and `hast` data in [the preview state](https://developers.inkdrop.app/states/preview), which allows to add syntax-aware features like outline views more easily without relying on regular expressions.

**✍️ STORY**: [Refactoring the extensible Markdown renderer 🛠️](https://www.devas.life/refactoring-the-extensible-markdown-renderer/)

On the other hand, it may cause some plugins not working due to the breaking changes. For plugin developers, I'll post another topic to help you update your plugins.

## 🌈 Built-in paste-as-markdown support

Plugins are useful but it'd be a burden to explore and decide which plugins to install for light users. I wanted to make the app just work out of the box. As a starter, `paste-as-markdown` is now bundled into the app by default. It allows you to paste HTML as Markdown from the clipboard. It'd be useful for copy-and-pasting formatted texts from browsers.

I'm planning to bundle **Mermaid**, **GitHub Emoji**, and **Math** plugins as well.

## ⬆️ Bump up Electron to 25.1.1

Expected some platform-dependent issues to be fixed with this release.

* https://forum.inkdrop.app/t/showopendialog-opens-behind-the-app-on-linux/3972/3

### 😵 Acrylic window style is not working on Windows

* https://forum.inkdrop.app/t/lag-when-resizing-the-window-with-acrylic-background/4011

On Electron@25.1.1, the module that the app used to support the acrylic window style no longer works, unfortunately. The good news is that Electron itself officially supports the acrylic style for Windows:

https://github.com/electron/electron/pull/38163

The bad news is that it is not stable and working as expected – It doesn't work with frameless windows, besides, it becomes unresizable and loses shadows. So, unfortunately, the acrylic window style is not supported on Windows in this release. Maybe I should stop supporting such an unstable feature 😭

## ✨ New API documentation (WIP)

I've been working on redesigning the documentation and the new API documentation is now available as WIP.

https://developers.inkdrop.app/

The design is heavily inspired by Stripe, built on top of Tailwind UI. It supports full-text search now. There are still many missing pages and broken links though, your help to improve the doc would be greatly appreciated. It will be more comprehensive and easy to understand and I hope you like it :D

I'll be working on creating a new user manual as well!

## Other bug fixes and improvements

* **improvement(note-list)**: The sidebar now has the "Pinned Notes" section. In "All Notes", pinned notes are no longer displayed on top of the note list.
* https://forum.inkdrop.app/t/copy-paste-bullet-point-from-the-web-unexpected-behaviour/4043
* https://forum.inkdrop.app/t/memory-consumption-is-very-high/2583/15
* [Images are converted into PNG when inserting from the toolbar button](https://forum.inkdrop.app/t/images-are-converted-into-png-when-inserting-from-the-toolbar-button/3967)
* **fix(export)**: Some image files do not have file extensions
* **fix(security)**: Show a confirmation alert when clicking non-https links on the preview

## v5.5.2-beta.1
2022-09-28

### Improvements
- **Dev**: Add a link to [dev-tools](https://my.inkdrop.app/plugins/dev-tools) plugin in Preferences
- **Editor**: Remove the file extension from the alt attribute when inserting an image from a file
  - *Before*: `[filename.jpg](inkdrop://file:****)`
  - *After*: `[filename](inkdrop://file:****)`
- **Theme**: Switch the default light/dark themes automatically based on the system preferences (Thanks [Mac and Ben](https://forum.inkdrop.app/t/make-inkdrop-follow-the-dark-light-mode-setting-on-macos-ios/1923/2))
  - You can disable this behavior by setting `core.toggleDarkThemeAutomatically` to `false` in `config.cson`

### Bugfixes
- **Export**: Inline styles not working in exported notes as pdf or html
- **Export**: Canceled dialogs not being handled properly
- **UI**: The note list not updating if a conflict happens
- **Editor**: The editor should refresh after changing custom stylesheets
- **Editor**: The app crashes when inputting a title longer than 128 characters (Thanks [Danielsec](https://forum.inkdrop.app/t/note-title-longer-than-128-chars-results-in-crash/3071))
- **Markdown Preview**: Task checkboxes get wrong position when the item is empty
- **Local server**: The numeric parameters for `_changes` work incorrectly
- **Local server**: `GET /tag:<id>` not working
- **App**: Notes not being saved when immediately quitting after editing (Thanks [Ryuki](https://forum.inkdrop.app/t/edited-content-disappers-when-i-close-app-immediately-after-editing/3445))

## v5.5.0-beta.1
2021-12-20

### Improvements
* Upgrade Electron from 12 to 16.0.4
  * Expected to resolve [the GPU process error on Fefora 35 (Thanks Luis)](https://forum.inkdrop.app/t/bug-on-fedora-35-beta/2617)
* Set focus to the editor title input when a sub window shows up (Thanks [Otawara](https://forum.inkdrop.app/t/topic/2634))

### Bugfixes
* Can't change sort order by commands (Thanks [Ryuki](https://forum.inkdrop.app/t/topic/2645))
* Window gets unintentionally resized when dragging if acrylic background enabled (Thanks [elpnt](https://forum.inkdrop.app/t/window-gets-unintentionally-resized-by-dragging-on-windows-11/2717))
* Move the 'full sync' menu to under the Help menu

## v5.3.0-beta.1
2021-03-12

### New features
* Show editing note title in title bar
  ![Title bar](https://github.com/inkdropapp/version-history-beta/blob/master/images/v5.3.0_title.png?raw=true)
* Dock menu for opening new window (Thanks [Yusuke](https://forum.inkdrop.app/t/macos-dock-inkdrop/2328))  
  ![Dock menu](https://github.com/inkdropapp/version-history-beta/blob/master/images/v5.3.0_dock-menu.png?raw=true)
* Local REST API endpoint ([See 'Accessing via HTTP (Advanced)' section in the doc](https://beta.docs.inkdrop.app/manual/accessing-the-local-database/#accessing-via-http-advanced))

### Improvements
* Upgrade Electron from 7 to 12
* API: add `editor-floating-actions` layout that allows you to add custom floating action buttons on the editor ([See the doc](https://beta.docs.inkdrop.app/reference/state-layouts#editor-floating-actions)) (Thanks Ron)
* Scroll sidebar to the selection automatically when opened a notebook (Thanks [Shogo](https://forum.inkdrop.app/t/open-notebook/2365))
* Network diagnosis to help configure Inkdrop for running it behind corporate proxy from menu *Help -> Run Network Diagnosis*.
* Set window background to dark on dark mode to avoid flashy white backgrounds (Thanks [Hugh](https://forum.inkdrop.app/t/incomplete-darkmode-white-background-when-opening-new-windows/2371))

### Bugfixes
* Prevent adding more than one tags with the same name (Thanks [Avis](https://forum.inkdrop.app/t/multiple-identical-tags/2314/2))
* Change folder structure and file name of backup files that avoid using `:` character, which is prohibited in some cloud storage services (Thanks [Ryan, Nicole, and Evan](https://forum.inkdrop.app/t/is-not-supported-in-onedrive-amazon-drive-or-sync-com/2265))

## v5.2.0-beta.2
2020-12-08

### New features
* Support adding tags and status by drag-and-drop notes (Thanks [Jan](https://forum.inkdrop.app/t/feedback-working-with-tags/2225))  
  ![DnD support](https://github.com/inkdropapp/version-history-beta/blob/master/images/v5.2.0-dnd-support.gif?raw=true)
* Add "Remove Tag" context menu on note tag bar (Thanks [Jan](https://forum.inkdrop.app/t/feedback-working-with-tags/2225))
* Support `inkdrop://` URL scheme on Windows (Thanks [Otawara-san](https://forum.inkdrop.app/t/windows-url/2232))
  * Now the URL scheme works across macOS, Linux and Windows 🎉

### Improvements
* Support YAML frontmatter for Markdown export (Thanks [Robert](https://github.com/inkdropapp/inkdrop-export-utils/pull/3))
* Add some animations 🏃  
  ![DnD support](https://github.com/inkdropapp/version-history-beta/blob/master/images/v5.2.0-animations.gif?raw=true)

### Bugfixes
* Allow smaller window size when distraction free mode (Thanks [Shota-san](https://forum.inkdrop.app/t/topic/2215))
* Move a window into the primary screen if it was outside of screens (Thanks [Alexander](https://forum.inkdrop.app/t/windows-10-app-window-opens-outside-of-screen/869))
* Fix word-break of shared page url on note sharing dialog
* Hide workspace if notebook does not exist when restoring navigation state (Thanks [T_Crain](https://forum.inkdrop.app/t/notes-and-notebooks-not-syncing-on-mac/2214))
* Fix placeholder bug in codemirror (Thanks [Akira-san](https://forum.inkdrop.app/t/just-start-typing-is-shown-when-deleting-unfixed-text-by-back-space-key/2221/6))

## v5.2.0-beta.1
2020-11-23

A vlog for this update :)  
[![vlog](https://github.com/inkdropapp/version-history-beta/blob/master/images/v5.2.0-vlog.jpg?raw=true)](https://www.youtube.com/watch?v=zlrQScqhM90)

### Search feature improvements
* `title:` and `body:` search qualifier to filter notes by title or body (Thanks [Zhuolun](https://forum.inkdrop.app/t/how-to-search-notes-by-the-title/1849))
  ![title qualifier](https://github.com/inkdropapp/version-history-beta/blob/master/images/v5.2.0-title-qualifier.png?raw=true)
* Support changing order of search results (Thanks [Micah_Ledbetter](https://forum.inkdrop.app/t/search-results-are-not-sortable/2181))
  ![Search result order](https://github.com/inkdropapp/version-history-beta/blob/master/images/v5.2.0-search-result-order.png?raw=true)

### Importing feature improvement
* Support importing images when importing from Markdown or HTML files

### Bugfixes
* Some Pug codeblocks cause the app to be crashed (Thanks [Kato-san](https://forum.inkdrop.app/t/pug/2210))

## v5.0.0-beta.2
2020-08-19

### Improvements
* Restart sync when system unlocked
* Restart sync when system resumed

### Bugfixes
* Avoid loading 'null' mode in the editor
* Fix the issue where "Cannot read property 'toString' of undefined" occasionally happens on the note list (Thanks Gustavo and Rael)

## v5.0.0-beta.1
2020-07-02

### New features
* GUI for installing plugins
  ![Plugin GUI](https://github.com/inkdropapp/version-history-beta/blob/master/images/v5.0.0-plugin-gui.png?raw=true)

### Improvements
* Show more human-friendly error messages
* Include 'Completed' & 'Dropped' statuses when filtering with keywords
* Remove 'Search' sidebar menu
* Better conversion from HTML to Markdown

### Bugfixes
* (Revert) The editor not utilizing the full width of the text window (Thanks [Vikas, Jasper, Gustavo, and Samantha](https://forum.inkdrop.app/t/inkdrop-not-utilizing-the-full-width-of-the-text-window/1972))
* Fallback to the default theme if not installed (Thanks [Mark](https://forum.inkdrop.app/t/crash-switching-from-custom-theme-development-to-installed-theme/1858))
* Exporting all notes as Markdown not working when exporting sub-notebooks (Thanks [Tiemen](https://forum.inkdrop.app/t/export-all-notes-functionality-errors-on-file-already-exist/1997))
* Create new notebook modal already has value from previously create notebook (Thanks [Martynas](https://forum.inkdrop.app/t/create-new-notebook-modal-already-has-value-from-previously-create-notebook/1984))

## v4.7.0-beta.4
2020-07-02

### Bugfixes
* Selecting text is not working

## v4.7.0-beta.3
2020-07-02

### New features
* Add MIME type `x-scheme-handler/inkdrop` for Linux so that you can open it with `inkdrop://` URI scheme (Thanks [Andi](https://forum.inkdrop.app/t/allow-inkdrop-scheme-handler-on-linux-ubuntu/1935))
* Toggle task list (`[ ]` or `[x]`) by mouse click in editor
### Improvements
* The app launch speed significantly improved
* Refurbish the editor toolbar
  ![Editor toolbar](https://github.com/inkdropapp/version-history-beta/blob/master/images/v4.7.0-beta.3_refurbishing-editor-toolbar.png?raw=true)  
* Refurbish icons
  ![Editor toolbar](https://github.com/inkdropapp/version-history-beta/blob/master/images/v4.7.0-beta.3_refurbishing-icons.png?raw=true)  
* Add a separator for grouping pinned notes (Thanks [tdudz](https://forum.inkdrop.app/t/v4-7-0-beta-testing/1834/23?u=craftzdog))
* Improve search result by having bigger weight for title field (Thanks [Zhuolun and James](https://forum.inkdrop.app/t/how-to-search-notes-by-the-title/1849))
* Set max-width for editor
* Bump up Electron to v8.3.4
* Show progress of updating local indices
* Show error dialog when failed to load the config files (Thanks [can_Y](https://forum.inkdrop.app/t/inkdrop-client-displays-blank-when-opened-on-macos/1954))
### Bugfixes
* add `https://` if the URL is invalid format (Thanks [Rael](https://forum.inkdrop.app/t/app-hangs-when-click-partial-link/1955))
* fix incorrect English (Thanks Rael)

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


* * *

The release notes for older versions can be found [here](https://github.com/inkdropapp/version-history/blob/master/README-old.md)

