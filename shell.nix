{
  pkgs ? import <nixpkgs> { },
}:

with pkgs;
mkShell {
  name = "tree-sitter-tmux";
  buildInputs = [
    tree-sitter
  ];
}
