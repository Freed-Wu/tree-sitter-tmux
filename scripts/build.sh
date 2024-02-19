#!/usr/bin/env bash
set -e
cd "$(dirname "$(readlink -f "$0")")/.."

tree-sitter generate
cmake -Bbuild -DCMAKE_INSTALL_FULL_LIBDIR="${1:-$HOME/.local/share/nvim/repos/github.com/nvim-treesitter/nvim-treesitter}"
cmake --build build
cmake --install build
