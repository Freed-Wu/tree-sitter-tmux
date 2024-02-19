# tree-sitter-tmux

[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/Freed-Wu/tree-sitter-tmux/main.svg)](https://results.pre-commit.ci/latest/github/Freed-Wu/tree-sitter-tmux/main)
[![github/workflow](https://github.com/Freed-Wu/tree-sitter-tmux/actions/workflows/main.yml/badge.svg)](https://github.com/Freed-Wu/tree-sitter-tmux/actions)
[![codecov](https://codecov.io/gh/Freed-Wu/tree-sitter-tmux/branch/main/graph/badge.svg)](https://codecov.io/gh/Freed-Wu/tree-sitter-tmux)
[![DeepSource](https://deepsource.io/gh/Freed-Wu/tree-sitter-tmux.svg/?show_trend=true)](https://deepsource.io/gh/Freed-Wu/tree-sitter-tmux)

[![github/downloads](https://shields.io/github/downloads/Freed-Wu/tree-sitter-tmux/total)](https://github.com/Freed-Wu/tree-sitter-tmux/releases)
[![github/downloads/latest](https://shields.io/github/downloads/Freed-Wu/tree-sitter-tmux/latest/total)](https://github.com/Freed-Wu/tree-sitter-tmux/releases/latest)
[![github/issues](https://shields.io/github/issues/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux/issues)
[![github/issues-closed](https://shields.io/github/issues-closed/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux/issues?q=is%3Aissue+is%3Aclosed)
[![github/issues-pr](https://shields.io/github/issues-pr/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux/pulls)
[![github/issues-pr-closed](https://shields.io/github/issues-pr-closed/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux/pulls?q=is%3Apr+is%3Aclosed)
[![github/discussions](https://shields.io/github/discussions/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux/discussions)
[![github/milestones](https://shields.io/github/milestones/all/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux/milestones)
[![github/forks](https://shields.io/github/forks/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux/network/members)
[![github/stars](https://shields.io/github/stars/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux/stargazers)
[![github/watchers](https://shields.io/github/watchers/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux/watchers)
[![github/contributors](https://shields.io/github/contributors/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux/graphs/contributors)
[![github/commit-activity](https://shields.io/github/commit-activity/w/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux/graphs/commit-activity)
[![github/last-commit](https://shields.io/github/last-commit/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux/commits)
[![github/release-date](https://shields.io/github/release-date/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux/releases/latest)

[![github/license](https://shields.io/github/license/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux/blob/main/LICENSE)
[![github/languages](https://shields.io/github/languages/count/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux)
[![github/languages/top](https://shields.io/github/languages/top/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux)
[![github/directory-file-count](https://shields.io/github/directory-file-count/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux)
[![github/code-size](https://shields.io/github/languages/code-size/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux)
[![github/repo-size](https://shields.io/github/repo-size/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux)
[![github/v](https://shields.io/github/v/release/Freed-Wu/tree-sitter-tmux)](https://github.com/Freed-Wu/tree-sitter-tmux)

[![pypi/status](https://shields.io/pypi/status/tree-sitter-tmux)](https://pypi.org/project/tree-sitter-tmux/#description)
[![pypi/v](https://shields.io/pypi/v/tree-sitter-tmux)](https://pypi.org/project/tree-sitter-tmux/#history)
[![pypi/downloads](https://shields.io/pypi/dd/tree-sitter-tmux)](https://pypi.org/project/tree-sitter-tmux/#files)
[![pypi/format](https://shields.io/pypi/format/tree-sitter-tmux)](https://pypi.org/project/tree-sitter-tmux/#files)
[![pypi/implementation](https://shields.io/pypi/implementation/tree-sitter-tmux)](https://pypi.org/project/tree-sitter-tmux/#files)
[![pypi/pyversions](https://shields.io/pypi/pyversions/tree-sitter-tmux)](https://pypi.org/project/tree-sitter-tmux/#files)

[![npm](https://img.shields.io/npm/dw/tree-sitter-tmux)](https://www.npmjs.com/package/tree-sitter-tmux)

[![Crates.io (recent)](https://img.shields.io/crates/dr/tree-sitter-tmux)](https://crates.io/crates/tree-sitter-tmux)

[tmux grammar](https://man.archlinux.org/man/tmux.1.en) for
[tree-sitter](https://github.com/tree-sitter/tree-sitter).

It can be used by:

- Syntax highlight
  - editors
    - [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter): for
      [neovim](https://github.com/neovim/neovim)
    - [tree-sitter-langs](https://github.com/emacs-tree-sitter/tree-sitter-langs):
      for [emacs](https://www.gnu.org/software/emacs/)
    - [kak-tree-sitter](https://github.com/phaazon/kak-tree-sitter): for
      [kakoune](https://kakoune.org/)
    - [helix](https://helix-editor.com/)
    - [zed](https://zed.dev)
    - [atom](https://github.com/atom/atom)
    - [syntax-highlighter](https://github.com/EvgeniyPeshkov/syntax-highlighter):
      for [VS Code](https://github.com/microsoft/vscode)
  - pagers
    - [syncat](https://github.com/foxfriends/syncat)
    - [`tree-sitter highlight`](https://tree-sitter.github.io/tree-sitter/syntax-highlighting):
      Make sure `/the/parent/directory/of/this/repo` in `parser-directories` of
      your `~/.config/tree-sitter/config.json`
- Language servers
  - [tmux-language-server](https://github.com/Freed-Wu/tmux-language-server)
  - [vscode-anycode](https://github.com/microsoft/vscode-anycode)
  - [Navigating code on GitHub](https://docs.github.com/en/repositories/working-with-files/using-files/navigating-code-on-github):
    supported by [semantic](https://github.com/github/semantic)
- Libraries
  - [tree-sitter-tmux](https://www.npmjs.com/package/tree-sitter-tmux):
    for node
  - [tree-sitter-tmux](https://crates.io/crates/tree-sitter-tmux):
    for rust
  - [tree-sitter-tmux](https://pypi.org/project/tree-sitter-tmux):
    for python
  - [tree-sitter-languages](https://github.com/grantjenks/py-tree-sitter-languages):
    for python

## Related Projects

- [vim-tmux](https://github.com/tmux-plugins/vim-tmux): vim syntax
