rockspec_format = '3.0'
description = {
  summary = '',
  detailed = '',
  labels = {},
  homepage = 'https://github.com/Freed-Wu/tree-sitter-tmux',
  license = 'MIT',
}
package = description.homepage:match('/([^/]+)/?$')
version = 'scm-1'
source = {
  url = description.homepage:gsub('https', 'git')
}

build = {
  type = "treesitter-parser",
  lang = "tmux",
  generate = true,
}
