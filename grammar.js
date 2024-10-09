/// <reference types="tree-sitter-cli/dsl" />

module.exports = grammar({
  name: "tmux",

  rules: {
    lines: ($) => optional($.statements),
    statements: ($) =>
      choice(seq($.statement, "\n"), seq($.statements, $.statement, "\n")),
    statement: ($) =>
      optional(choice($.hidden_assignment, $.condition, $.commands)),
    word: (_) => /\S+/, // TODO
    format: ($) => $.word, // TODO
    expanded: ($) => choice($.format, $.token),
    hidden_assignment: ($) => seq("%hidden", $.equals),
    if_open: ($) => seq("%if", $.expanded),
    if_else: (_) => "%else",
    if_elif: ($) => seq("%elif", $.expanded),
    if_close: (_) => "%endif",
    var: (_) => /[a-zA-Z_][a-zA-Z_0-9]*/,
    equals: ($) => seq($.var, "=", $.word),
    condition: ($) =>
      choice(
        seq($.if_open, "\n", $.statements, $.if_close),
        seq(
          $.if_open,
          "\n",
          $.statements,
          $.if_else,
          "\n",
          $.statements,
          $.if_close
        ),
        seq($.if_open, "\n", $.statements, $.elif, $.if_close),
        seq(
          $.if_open,
          "\n",
          $.statements,
          $.elif,
          $.if_else,
          "\n",
          $.statements,
          $.if_close
        )
      ),
    elif: ($) =>
      choice(
        seq($.if_elif, "\n", $.statements),
        seq($.if_elif, "\n", $.statements, $.elif)
      ),
    commands: ($) =>
      choice(
        $.command,
        seq($.commands, ";"),
        seq($.commands, ";", $.condition1),
        seq($.commands, ";", $.command),
        $.condition1
      ),
    optional_assignment: ($) => optional($.equals),
    command: ($) =>
      choice(
        $.equals,
        seq($.optional_assignment, $.token),
        seq($.optional_assignment, $.token, $.arguments)
      ),
    condition1: ($) =>
      choice(
        seq($.if_open, $.commands, $.if_close),
        seq($.if_open, $.commands, $.if_else, $.commands, $.if_close),
        seq($.if_open, $.commands, $.elif1, $.if_close),
        seq($.if_open, $.commands, $.elif1, $.if_else, $.commands, $.if_close)
      ),
    elif1: ($) =>
      choice(seq($.if_elif, $.commands), seq($.if_elif, $.commands, $.elif1)),
    arguments: ($) => choice($.argument, seq($.argument, $.arguments)),
    argument: ($) => choice($.token, $.equals, seq("{", $.argument_statements)),
    argument_statements: ($) =>
      choice(seq($.statement, "}"), seq($.statements, $.statement, "}")),
  },
});
