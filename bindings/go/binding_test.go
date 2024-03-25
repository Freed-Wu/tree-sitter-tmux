package tree_sitter_tmux_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/tree-sitter/tree-sitter-tmux"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_tmux.Language())
	if language == nil {
		t.Errorf("Error loading Tmux grammar")
	}
}
