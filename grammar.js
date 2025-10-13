/// <reference types="tree-sitter-cli/dsl" />

const BACKSLASH_ESCAPE = /\\(u[\da-fA-F]{4}|u[\da-fA-F]{8}|[0-7]{3}|[^;\n])/;
const WORD = /[^"';\\\s]+/;
const WORD_KEY = /-|[^-"';\\\s][^"';\\\s]*/;

module.exports = grammar({
  name: "tmux",

  extras: ($) => [/\s/, /\\\r?\n/, $.comment],

  // final argument is optional
  conflicts: ($) => [
    [$.new_session_directive],
    [$.new_window_directive],
    [$.refresh_client_directive],
    [$.resize_pane_directive],
    [$.server_access_directive],
    [$.set_environment_directive],
    [$.show_environment_directive],
    [$.split_window_directive],
  ],

  rules: {
    file: ($) => commands($),

    _command: ($) =>
      choice(
        $.attach_session_directive,
        $.bind_key_directive,
        $.break_pane_directive,
        $.capture_pane_directive,
        $.choose_buffer_directive,
        $.choose_client_directive,
        $.choose_tree_directive,
        $.clear_history_directive,
        $.clear_prompt_history_directive,
        $.clock_mode_directive,
        $.command_prompt_directive,
        $.confirm_before_directive,
        $.copy_mode_directive,
        $.customize_mode_directive,
        $.delete_buffer_directive,
        $.detach_client_directive,
        $.display_menu_directive,
        $.display_message_directive,
        $.display_panes_directive,
        $.display_popup_directive,
        $.environment_assignment,
        $.find_window_directive,
        $.has_session_directive,
        $.hidden_assignment,
        $.if_shell_directive,
        $.join_pane_directive,
        $.kill_pane_directive,
        $.kill_server_directive,
        $.kill_session_directive,
        $.kill_window_directive,
        $.last_pane_directive,
        $.last_window_directive,
        $.link_window_directive,
        $.list_buffers_directive,
        $.list_clients_directive,
        $.list_commands_directive,
        $.list_keys_directive,
        $.list_panes_directive,
        $.list_sessions_directive,
        $.list_windows_directive,
        $.load_buffer_directive,
        $.lock_client_directive,
        $.lock_server_directive,
        $.lock_session_directive,
        $.move_pane_directive,
        $.move_window_directive,
        $.new_session_directive,
        $.new_window_directive,
        $.next_layout_directive,
        $.next_window_directive,
        $.paste_buffer_directive,
        $.pipe_pane_directive,
        $.previous_layout_directive,
        $.previous_window_directive,
        $.refresh_client_directive,
        $.rename_session_directive,
        $.rename_window_directive,
        $.resize_pane_directive,
        $.resize_window_directive,
        $.respawn_pane_directive,
        $.respawn_window_directive,
        $.rotate_window_directive,
        $.run_shell_directive,
        $.save_buffer_directive,
        $.select_layout_directive,
        $.select_pane_directive,
        $.select_window_directive,
        $.send_keys_directive,
        $.send_prefix_directive,
        $.server_access_directive,
        $.set_buffer_directive,
        $.set_environment_directive,
        $.set_hook_directive,
        $.set_option_directive,
        $.set_window_option_directive,
        $.show_buffer_directive,
        $.show_environment_directive,
        $.show_hooks_directive,
        $.show_messages_directive,
        $.show_options_directive,
        $.show_prompt_history_directive,
        $.source_file_directive,
        $.split_window_directive,
        $.start_server_directive,
        $.suspend_client_directive,
        $.swap_pane_directive,
        $.swap_window_directive,
        $.switch_client_directive,
        $.unbind_key_directive,
        $.unlink_window_directive,
        $.wait_for_directive,
        $.alias_directive,
      ),
    _command_separator: (_) => choice(";", "\\;", "';'", /\r?\n/),

    if_statement: ($) =>
      seq(
        alias(/\%if/, $.if_keyword),
        /\s+/,
        alias($.str_double_quotes, $.condition),
        commands($),
        repeat(
          seq(
            alias(/\%elif/, $.elif_keyword),
            /\s+/,
            alias($.str_double_quotes, $.condition),
            commands($),
          ),
        ),
        optional(seq(alias(/\%else/, $.else_keyword), /\s+/, commands($))),
        alias(/%endif/, $.endif_keyword),
      ),

    _working_directory: ($) =>
      option($, "c", alias($._string, $.working_directory)),
    attach_session_directive: ($) =>
      command(
        $,
        choice("attach-session", "attach"),
        cmdOpts(
          options($, "dErx"),
          $._working_directory,
          $._flags,
          $._target_session,
        ),
      ),
    _note: ($) => option($, "N", alias($._string, $.note)),
    _key_table: ($) => option($, "T", alias($._string, $.key_table)),
    bind_key_directive: ($) =>
      command(
        $,
        choice("bind-key", "bind"),
        cmdOpts(options($, "nr"), $._note, $._key_table),
        $.key,
        $._tmux,
      ),
    break_pane_directive: ($) =>
      command(
        $,
        choice("break-pane", "breakp"),
        cmdOpts(
          options($, "abdP"),
          $._format,
          $._window_name,
          $._src_pane,
          $._target_window,
        ),
      ),
    _buffer_name: ($) => option($, "b", alias($._string, $.buffer_name)),
    _new_buffer_name: ($) => option($, "n", alias($._string, $.buffer_name)),
    _start_line: ($) => option($, "S", alias($._string, $.start_line)),
    _end_line: ($) => option($, "E", alias($._string, $.end_line)),
    capture_pane_directive: ($) =>
      command(
        $,
        choice("capture-pane", "capturep"),
        cmdOpts(
          options($, "aepPqCJN"),
          $._buffer_name,
          $._end_line,
          $._start_line,
          $._target_pane,
        ),
      ),
    choose_buffer_directive: ($) =>
      command(
        $,
        "choose-buffer",
        cmdOpts(
          options($, "NrZ"),
          $._format,
          $._filter,
          $._sort_order,
          $._target_pane,
        ),
        $.template,
      ),
    _filter: ($) => option($, "f", alias($._string, $.filter)),
    _key_format: ($) => option($, "K", alias($._string, $.key_format)),
    _sort_order: ($) => option($, "O", alias($._string, $.sort_order)),
    template: ($) => $._string,
    choose_client_directive: ($) =>
      command(
        $,
        "choose-client",
        cmdOpts(
          options($, "NrZ"),
          $._format,
          $._filter,
          $._sort_order,
          $._target_pane,
        ),
        $.template,
      ),
    choose_tree_directive: ($) =>
      command(
        $,
        choice(
          "choose-tree",
          "choose-window", // Alias to `choose-tree -w`
          "choose-session", // Alias to `choose-tree -s`
        ),
        cmdOpts(
          options($, "GNrswZ"),
          $._format,
          $._filter,
          $._key_format,
          $._sort_order,
          $._target_pane,
        ),
        $.template,
      ),
    clear_history_directive: ($) =>
      command($, choice("clear-history", "clearhist"), cmdOpts($._target_pane)),
    clear_prompt_history_directive: ($) =>
      command(
        $,
        choice("clear-prompt-history", "clearphist"),
        cmdOpts($._prompt_type),
      ),
    clock_mode_directive: ($) =>
      command($, choice("clock-mode", "clock"), cmdOpts($._target_pane)),
    _inputs: ($) => option($, "I", alias($._string, $.inputs)),
    _prompts: ($) => option($, "p", alias($._string, $.prompts)),
    _prompt_type: ($) => option($, "T", alias($._string, $.prompt_type)),
    command_prompt_directive: ($) =>
      command(
        $,
        "command-prompt",
        cmdOpts(
          options($, "1bFikN"),
          $._inputs,
          $._prompts,
          $._target_client,
          $._prompt_type,
        ),
        $._tmux,
      ),
    _prompt: ($) => option($, "p", alias($._string, $.prompt)),
    confirm_before_directive: ($) =>
      command(
        $,
        choice("confirm-before", "confirm"),
        cmdOpts(options($, "b"), $._prompt, $._target_client),
        $._tmux,
      ),
    copy_mode_directive: ($) =>
      command(
        $,
        "copy-mode",
        cmdOpts(options($, "eHMqu"), $._src_pane, $._target_pane),
      ),
    customize_mode_directive: ($) =>
      command(
        $,
        "customize-mode",
        cmdOpts(options($, "NZ"), $._format, $._filter, $._target_pane),
        $.template,
      ),
    delete_buffer_directive: ($) =>
      command($, choice("delete-buffer", "deleteb"), cmdOpts($._buffer_name)),
    _shell_command: ($) => option($, "E", $._shell),
    detach_client_directive: ($) =>
      command(
        $,
        choice("detach-client", "detach"),
        cmdOpts(
          options($, "aP"),
          $._shell_command,
          $._target_session_s,
          $._target_client,
        ),
      ),
    _x: ($) => option($, "x", alias($._string, $.position)),
    _y: ($) => option($, "y", alias($._string, $.position)),
    name: ($) => $._string,
    display_menu_directive: ($) =>
      command(
        $,
        choice("display-menu", "menu"),
        cmdOpts(
          options($, "O"),
          $._target_client_c,
          $._target_pane,
          $._title,
          $._x,
          $._y,
        ),
        $.name,
        $.key,
      ),
    message: ($) => $._string,
    display_message_directive: ($) =>
      command(
        $,
        choice("display-message", "display"),
        cmdOpts(
          options($, "aINpv"),
          $._target_client_c,
          $._delay,
          $._target_pane,
        ),
        $.message,
      ),
    display_panes_directive: ($) =>
      command(
        $,
        choice("display-panes", "displayp"),
        // -d duration
        cmdOpts(options($, "bN"), $._delay, $._target_client),
        $.template,
      ),
    _border_lines: ($) => option($, "b", alias($._string, $.border_lines)),
    _style: ($) => option($, "s", alias($._string, $.style)),
    _border_style: ($) => option($, "S", alias($._string, $.border_style)),
    display_popup_directive: ($) =>
      command(
        $,
        choice("display-popup", "popup"),
        cmdOpts(
          options($, "BCE"),
          $._border_lines,
          $._target_client_c,
          $._start_directory_d,
          $._environment,
          $._height_h,
          $._style,
          $._border_style,
          $._target_pane,
          $._title,
          $._width_w,
          $._x,
          $._y,
        ),
        $._shell,
      ),
    _variable_name: (_) => /[A-Za-z_][A-Za-z0-9_]*/,
    environment_assignment: ($) =>
      prec.right(
        seq(
          field("name", alias($._variable_name, $.name)),
          "=",
          field("value", alias($._string, $.value)),
        ),
      ),
    hidden_assignment: ($) =>
      prec.right(
        seq(
          alias(/\%hidden/, $.hidden_keyword),
          /\s+/,
          field("name", alias($._variable_name, $.name)),
          "=",
          field("value", alias($._string, $.value)),
        ),
      ),
    find_window_directive: ($) =>
      command(
        $,
        choice("find-window", "findw"),
        cmdOpts(options($, "iCNrTZ"), $._target_pane),
        $._string,
      ),
    has_session_directive: ($) =>
      command($, choice("has-session", "has"), cmdOpts($._target_session)),
    if_shell_directive: ($) =>
      prec.right(
        2,
        command(
          $,
          choice("if-shell", "if"),
          cmdOpts(options($, "bF"), $._target_pane),
          $._shell,
          $._tmux,
          optional($._tmux),
        ),
      ),
    size: ($) => $._string,
    _size: ($) => option($, "l", $.size),
    _size_s: ($) => option($, "S", $.size),
    join_pane_directive: ($) =>
      command(
        $,
        choice("join-pane", "joinp"),
        cmdOpts(options($, "bdfhv"), $._size, $._src_pane, $._target_pane),
      ),
    kill_pane_directive: ($) =>
      command(
        $,
        choice("kill-pane", "killp"),
        cmdOpts(options($, "a"), $._target_pane),
      ),
    kill_server_directive: ($) => command($, "kill-server"),
    kill_session_directive: ($) =>
      command($, "kill-session", cmdOpts(options($, "aC"), $._target_session)),
    kill_window_directive: ($) =>
      command(
        $,
        choice("kill-window", "killw"),
        cmdOpts(options($, "a"), $._target_window),
      ),
    last_pane_directive: ($) =>
      command(
        $,
        choice("last-pane", "lastp"),
        cmdOpts(options($, "deZ"), $._target_window),
      ),
    last_window_directive: ($) =>
      command($, choice("last-window", "last"), cmdOpts($._target_session)),
    link_window_directive: ($) =>
      command(
        $,
        choice("link-window", "linkw"),
        cmdOpts(options($, "abdk"), $._src_window, $._target_window),
      ),
    list_buffers_directive: ($) =>
      command($, choice("list-buffers", "lsb"), cmdOpts($._format, $._filter)),
    list_clients_directive: ($) =>
      command(
        $,
        choice("list-clients", "lsc"),
        cmdOpts($._format, $._target_session),
      ),
    list_commands_directive: ($) =>
      command($, choice("list-commands", "lscm"), cmdOpts($._format), $._tmux),
    _prefix_string: ($) => option($, "P", alias($._string, $.prefix_string)),
    list_keys_directive: ($) =>
      command(
        $,
        choice("list-keys", "lsk"),
        cmdOpts(options($, "1aN"), $._prefix_string, $._key_table),
        $.key,
      ),
    list_panes_directive: ($) =>
      command(
        $,
        choice("list-panes", "lsp"),
        cmdOpts(options($, "as"), $._format, $._filter, $._target_pane),
      ),
    list_sessions_directive: ($) =>
      command($, choice("list-sessions", "ls"), cmdOpts($._format, $._filter)),
    list_windows_directive: ($) =>
      command(
        $,
        choice("list-windows", "lsw"),
        cmdOpts(options($, "a"), $._format, $._filter, $._target_session),
      ),
    load_buffer_directive: ($) =>
      command(
        $,
        choice("load-buffer", "loadb"),
        cmdOpts(options($, "w"), $._buffer_name, $._target_client),
        $.path,
      ),
    lock_client_directive: ($) =>
      command($, choice("lock-client", "lockc"), cmdOpts($._target_client)),
    lock_server_directive: ($) => command($, choice("lock-server", "lock")),
    lock_session_directive: ($) =>
      command($, choice("lock-session", "locks"), cmdOpts($._target_session)),
    move_pane_directive: ($) =>
      command(
        $,
        choice("move-pane", "movep"),
        cmdOpts(options($, "bdfhv"), $._size, $._src_pane, $._target_pane),
      ),
    move_window_directive: ($) =>
      command(
        $,
        choice("move-window", "movew"),
        cmdOpts(options($, "abrdk"), $._src_window, $._target_window),
      ),
    _start_directory: ($) =>
      option($, "c", alias($._string, $.start_directory)),
    _start_directory_d: ($) =>
      option($, "d", alias($._string, $.start_directory)),
    _environment: ($) => option($, "e", alias($._string, $.environment)),
    _flags: ($) => option($, "f", alias($._string, $.flags)),
    _format: ($) => option($, "F", alias($._string, $.format)),
    _window_name: ($) => option($, "n", alias($._string, $.window_name)),
    _session_name: ($) => option($, "s", alias($._string, $.session_name)),
    _group_name: ($) => option($, "t", alias($._string, $.group_name)),
    _width: ($) => option($, "x", alias($._string, $.width)),
    _width_w: ($) => option($, "w", alias($._string, $.width)),
    _height: ($) => option($, "y", alias($._string, $.height)),
    _height_h: ($) => option($, "h", alias($._string, $.height)),
    new_session_directive: ($) =>
      command(
        $,
        choice("new-session", "new"),
        cmdOpts(
          options($, "AdDEPX"),
          $._start_directory,
          $._environment,
          $._flags,
          $._format,
          $._window_name,
          $._session_name,
          $._group_name,
          $._width,
          $._height,
        ),
        optional($._shell),
      ),
    new_window_directive: ($) =>
      command(
        $,
        choice("new-window", "neww"),
        cmdOpts(
          options($, "abdkPS"),
          $._start_directory,
          $._environment,
          $._format,
          $._window_name,
          $._target_window,
        ),
        optional($._shell),
      ),
    next_layout_directive: ($) =>
      command($, choice("next-layout", "nextl"), cmdOpts($._target_window)),
    next_window_directive: ($) =>
      command(
        $,
        choice("next-window", "next"),
        cmdOpts(options($, "a"), $._target_session),
      ),
    _separator: ($) => option($, "s", alias($._string, $.separator)),
    paste_buffer_directive: ($) =>
      command(
        $,
        choice("paste-buffer", "pasteb"),
        cmdOpts(
          options($, "dpr"),
          $._buffer_name,
          $._separator,
          $._target_pane,
        ),
      ),
    pipe_pane_directive: ($) =>
      command(
        $,
        choice("pipe-pane", "pipep"),
        cmdOpts(options($, "IOo"), $._target_pane),
        $._shell,
      ),
    previous_layout_directive: ($) =>
      command($, choice("previous-layout", "prevl"), cmdOpts($._target_window)),
    previous_window_directive: ($) =>
      command(
        $,
        choice("previous-window", "prev"),
        cmdOpts(options($, "a"), $._target_session),
      ),
    adjustment: ($) => $._string,
    _pane_state: ($) => option($, "A", alias($._string, $.pane_state)),
    _name_what_format: ($) =>
      option($, "B", alias($._string, $.name_what_format)),
    refresh_client_directive: ($) =>
      command(
        $,
        choice("refresh-client", "refresh"),
        cmdOpts(
          options($, "cDLRSU"),
          $._pane_state,
          $._name_what_format,
          $._size_s,
          $._flags,
          $._target_pane_l,
          $._target_client,
        ),
        optional($.adjustment),
      ),
    rename_session_directive: ($) =>
      command(
        $,
        choice("rename-session", "rename"),
        cmdOpts($._target_session),
        $.name,
      ),
    rename_window_directive: ($) =>
      command(
        $,
        choice("rename-window", "renamew"),
        cmdOpts($._target_window),
        $.name,
      ),
    resize_pane_directive: ($) =>
      command(
        $,
        choice("resize-pane", "resizep"),
        cmdOpts(options($, "DLMRTUZ"), $._target_pane, $._width, $._height),
        optional($.adjustment),
      ),
    resize_window_directive: ($) =>
      command(
        $,
        choice("resize-window", "resizew"),
        cmdOpts(options($, "aADLRU"), $._target_window, $._width, $._height),
        $.adjustment,
      ),
    respawn_pane_directive: ($) =>
      command(
        $,
        choice("respawn-pane", "respawnp"),
        cmdOpts(
          options($, "k"),
          $._start_directory,
          $._environment,
          $._target_pane,
        ),
        $._shell,
      ),
    respawn_window_directive: ($) =>
      command(
        $,
        choice("respawn-window", "respawnw"),
        cmdOpts(
          options($, "k"),
          $._start_directory,
          $._environment,
          $._target_pane,
        ),
        $._shell,
      ),
    rotate_window_directive: ($) =>
      command(
        $,
        choice("rotate-window", "rotatew"),
        cmdOpts(options($, "DUZ"), $._target_window),
      ),
    pane: ($) => $._string,
    _target_pane: ($) => option($, "t", $.pane),
    _target_pane_l: ($) => prec.right(option($, "l", optional($.pane))),
    _src_pane: ($) => option($, "s", $.pane),
    window: ($) => $._string,
    _target_window: ($) => option($, "t", $.window),
    _src_window: ($) => option($, "s", $.window),
    session: ($) => $._string,
    _target_session: ($) => option($, "t", $.session),
    _target_session_s: ($) => option($, "s", $.session),
    client: ($) => $._string,
    _target_client: ($) => option($, "t", $.client),
    _target_client_c: ($) => option($, "c", $.client),
    int: (_) => /\d+/,
    _delay: ($) => option($, "d", $.int),
    run_shell_directive: ($) =>
      command(
        $,
        choice("run-shell", "run"),
        cmdOpts(options($, "bC"), $._delay, $._start_directory, $._target_pane),
        $._shell,
      ),
    save_buffer_directive: ($) =>
      command(
        $,
        choice("save-buffer", "saveb"),
        cmdOpts(options($, "a"), $._buffer_name),
        $.path,
      ),
    layout_name: ($) => $._string,
    select_layout_directive: ($) =>
      command(
        $,
        choice("select-layout", "selectl"),
        cmdOpts(options($, "Enop"), $._target_pane),
        $.layout_name,
      ),
    _title: ($) => option($, "T", alias($._string, $.title)),
    select_pane_directive: ($) =>
      command(
        $,
        choice("select-pane", "selectp"),
        cmdOpts(options($, "DdeLlMmRUZ"), $._target_pane, $._title),
      ),
    select_window_directive: ($) =>
      command(
        $,
        choice("select-window", "selectw"),
        cmdOpts(options($, "lnpT"), $._target_window),
      ),
    _keys: ($) => spaceSep1($, $.key),
    send_keys_directive: ($) =>
      command(
        $,
        choice("send-keys", "send"),
        cmdOpts(options($, "FHlMRX"), option($, "N", $.int), $._target_pane),
        $._keys,
      ),
    send_prefix_directive: ($) =>
      command($, "send-prefix", cmdOpts(options($, "2"), $._target_pane)),
    user: ($) => $._string,
    server_access_directive: ($) =>
      command(
        $,
        "server-access",
        cmdOpts(options($, "adlrw")),
        optional($.user),
      ),
    data: ($) => $._string,
    set_buffer_directive: ($) =>
      command(
        $,
        choice("set-buffer", "setb"),
        cmdOpts(
          options($, "aw"),
          $._buffer_name,
          $._target_client,
          $._new_buffer_name,
        ),
        $.data,
      ),
    set_environment_directive: ($) =>
      command(
        $,
        choice("set-environment", "setenv"),
        cmdOpts(options($, "Fhgru"), $._target_session),
        $.name,
        optional($.value),
      ),
    set_hook_directive: ($) =>
      command(
        $,
        "set-hook",
        cmdOpts(options($, "agpRuw"), $._target_pane),
        alias(/[a-z][a-z-]*/, $.hook_name),
        optional(seq("[", $.int, "]")),
        $._tmux,
      ),

    value: ($) => $._string,
    set_option_directive: ($) =>
      command(
        $,
        choice("set-option", "set"),
        optional(options($, "aFgopqsuUw")),
        $.option,
        $.value,
      ),
    set_window_option_directive: ($) =>
      command(
        $,
        choice("set-window-option", "setw"),
        optional(options($, "aFgoqu")),
        $.option,
        $.value,
      ),

    show_buffer_directive: ($) =>
      command($, choice("show-buffer", "showb"), cmdOpts($._buffer_name)),
    show_environment_directive: ($) =>
      command(
        $,
        choice("show-environment", "showenv"),
        cmdOpts(options($, "hgs"), $._target_session),
        optional($.name),
      ),
    show_hooks_directive: ($) =>
      command($, "show-hooks", cmdOpts(options($, "gpw"), $._target_pane)),
    show_messages_directive: ($) =>
      command(
        $,
        choice(
          "show-messages",
          "showmsgs",
          "server-info", // Alias to `show-messages -JT`
          "info", // Alias to `show-messages -JT`
        ),
        cmdOpts(options($, "JT"), $._target_client),
      ),
    show_options_directive: ($) =>
      command(
        $,
        choice("show-options", "show"),
        cmdOpts(options($, "AgHpqsvw"), $._target_pane),
        $.option,
      ),
    show_prompt_history_directive: ($) =>
      command(
        $,
        choice("show-prompt-history", "showphist"),
        cmdOpts($._prompt_type),
      ),

    path: ($) => $._string,
    source_file_directive: ($) =>
      command(
        $,
        choice("source-file", "source"),
        optional(options($, "Fnqv")),
        $.path,
      ),

    split_window_directive: ($) =>
      command(
        $,
        choice(
          "split-window",
          "splitw",
          "split-pane", // Alias to `split-window`
          "splitp", // Alias to `split-window`
        ),
        cmdOpts(
          options($, "bdfhIvPZ"),
          $._start_directory,
          $._environment,
          $._size,
          $._target_pane,
          $._format,
        ),
        optional($._shell),
      ),
    start_server_directive: ($) => command($, choice("start-server", "start")),
    suspend_client_directive: ($) =>
      command(
        $,
        choice("suspend-client", "suspendc"),
        cmdOpts($._target_client),
      ),
    swap_pane_directive: ($) =>
      command(
        $,
        choice("swap-pane", "swapp"),
        cmdOpts(options($, "dDUZ"), $._src_pane, $._target_pane),
      ),
    swap_window_directive: ($) =>
      command(
        $,
        choice("swap-window", "swapw"),
        cmdOpts(options($, "d"), $._src_window, $._target_window),
      ),
    switch_client_directive: ($) =>
      command(
        $,
        choice("switch-client", "switchc"),
        cmdOpts(
          options($, "ElnprZ"),
          $._target_client_c,
          $._target_session,
          $._key_table,
        ),
      ),
    unbind_key_directive: ($) =>
      command(
        $,
        choice("unbind-key", "unbind"),
        cmdOpts(options($, "anq"), $._key_table),
        $.key,
      ),
    unlink_window_directive: ($) =>
      command(
        $,
        choice("unlink-window", "unlinkw"),
        cmdOpts(options($, "k"), $._target_window),
      ),
    channel: ($) => $._string,
    wait_for_directive: ($) =>
      command(
        $,
        choice("wait-for", "wait"),
        optional(choice("-L", "-S", "-U")),
        $.channel,
      ),

    alias_directive: ($) =>
      prec.left(
        command(
          $,
          /[a-z-]+/,
          repeat(alias(/-\w+/, $.command_line_option)),
          repeat(choice($._string)),
        ),
      ),

    option: (_) => /[@A-Za-z-_\d]+/,

    hash_escape: (_) => token.immediate(prec(1, /#[#,}]/)),
    _hash: (_) => token.immediate(prec(1, /#[^#,{}"'HhDPTSFIW]/)),
    backslash_escape: (_) => BACKSLASH_ESCAPE,
    backslash_escape_immediate: (_) => token.immediate(BACKSLASH_ESCAPE),
    _expr_variable_name: (_) => /@?[a-z-_\d]+/,
    _variable_name_short: (_) => /[HhDPTSFIW]/,
    expr_single_quotes: ($) => exprRule($, "'"),
    expr_double_quotes: ($) => exprRule($, '"'),
    operator: (_) => /==|!=|<|>|<=|>=|\|\||&&/,
    attribute: (_) => /[a-z-]+/,
    _str_single_quotes_inner: ($) =>
      choice($.expr_single_quotes, $.hash_escape, $._hash, /([^#'])+/),
    str_single_quotes: ($) =>
      seq(
        "'",
        repeat($._str_single_quotes_inner),
        token.immediate(prec(1, /#'|'/)),
      ),
    str_single_quotes_immediate: ($) =>
      seq(token.immediate("'"), repeat($._str_single_quotes_inner), "'"),
    _str_double_quotes_inner: ($) =>
      choice(
        $.expr_double_quotes,
        $.backslash_escape,
        $.hash_escape,
        $._hash,
        /([^#"\\]|\\\r?\n)+/,
      ),
    str_double_quotes: ($) => seq('"', repeat($._str_double_quotes_inner), '"'),
    str_double_quotes_immediate: ($) =>
      seq(token.immediate('"'), repeat($._str_double_quotes_inner), '"'),
    _word: (_) => WORD,
    _word_immediate: (_) => token.immediate(WORD),
    _string: ($) => stringOrKeyRule($, true),
    _word_key: (_) => WORD_KEY,
    _word_key_immediate: (_) => token.immediate(WORD_KEY),
    key: ($) => stringOrKeyRule($, false),
    block: ($) => seq("{", commands($), "}"),
    block_immediate: ($) => seq(token.immediate("{"), commands($), "}"),
    _shell: ($) => $._string,
    _tmux: ($) =>
      choice(
        $.backslash_escape,
        $.str_double_quotes,
        seq("'", $._command, "'"),
        $._command,
        $.block,
      ),

    comment: (_) => /#[^\n]*/,
    _space: (_) => prec(1, repeat1(/[ \t]/)),
  },
});

function command($, cmd, ...args) {
  return seq(alias(cmd, $.command), ...args);
}

function commands($) {
  return repeat(
    seq(optional(choice($._command, $.if_statement)), $._command_separator),
  );
}

function sep0(rule, separator) {
  return choice(rule, sep1(rule, separator));
}

function sep1(rule, separator) {
  return seq(rule, repeat(seq(separator, rule)));
}

function commaSep1(rule) {
  return sep1(rule, ",");
}

function spaceSep1($, rule) {
  return sep1(choice(rule, $.comment), " ");
}

function options($, chars) {
  return alias(new RegExp("-[" + chars + "]+"), $.command_line_option);
}

function option($, char, ...args) {
  return seq(alias("-" + char, $.command_line_option), ...args);
}

function cmdOpts(...args) {
  return repeat(choice(...args));
}

function exprRule($, quote) {
  const expr = quote == '"' ? $.expr_double_quotes : $.expr_single_quotes;
  return choice(
    seq(token.immediate(prec(1, "#")), alias($._variable_name_short, $.name)),
    seq(
      token.immediate(prec(1, "#{")),
      choice(
        alias($._expr_variable_name, $.name),
        seq(
          choice(
            seq("?", choice(expr, alias($._expr_variable_name, $.name))),
            seq(alias($._expr_variable_name, $.function_name), ":"),
            seq($.operator, ":"),
          ),
          commaSep1(
            repeat(
              choice(
                expr,
                $.hash_escape,
                $._hash,
                token.immediate(
                  prec(1, quote == '"' ? /[^,}"#]+/ : /[^,}'#]+/),
                ),
              ),
            ),
          ),
        ),
      ),
      "}",
    ),
    seq(
      token.immediate(prec(1, "#[")),
      commaSep1(
        choice(
          $.attribute,
          seq(
            $.attribute,
            "=",
            token.immediate(prec(1, quote == '"' ? /[^,\]"]+/ : /[^,\]']+/)),
          ),
        ),
      ),
      "]",
    ),
    seq(
      token.immediate(prec(1, "#(")),
      alias(quote == '"' ? /[^)"]+/ : /[^)']*/, $.shell),
      ")",
    ),
  );
}

function stringOrKeyRule($, isString) {
  return prec.left(
    seq(
      choice(
        $.backslash_escape,
        $.str_double_quotes,
        $.str_single_quotes,
        isString ? $._word : $._word_key,
        $.block,
      ),
      repeat(
        choice(
          alias($.backslash_escape_immediate, $.backslash_escape),
          alias($.str_double_quotes_immediate, $.str_double_quotes),
          alias($.str_single_quotes_immediate, $.str_single_quotes),
          isString ? $._word_immediate : $._word_key_immediate,
          alias($.block_immediate, $.block),
        ),
      ),
    ),
  );
}
