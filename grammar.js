/// <reference types="tree-sitter-cli/dsl" />

module.exports = grammar({
  name: "tmux",

  extras: (_) => [/\s/, /\\\r?\n/],

  // final argument is optional
  conflicts: ($) => [
    [$.new_session_directive],
    [$.new_window_directive],
    [$.resize_pane_directive],
    [$.server_access_directive],
    [$.set_environment_directive],
    [$.show_environment_directive],
    [$.split_window_directive],
  ],

  rules: {
    file: ($) => repeat(seq(optional($._statement_list), $._end)),

    _statement_list: ($) => sep1($._command, ';'),

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
      ),

    _working_directory: ($) =>
      option($, "c", alias($._string, $.working_directory)),
    attach_session_directive: ($) =>
      command(
        $,
        choice("attach-session", "attach"),
        cmd_opts(
          options($, "dErx"),
          $._working_directory,
          $._flags,
          $._target_session,
        ),
      ),
    _note: ($) => option($, "N", alias($._string, $.note)),
    _key_table: ($) => option($, "T", alias($._string, $.key_table)),
    key: ($) => prec.right(repeat1(choice(
      $.backslash_escape,
      $._string,
    ))),
    bind_key_directive: ($) =>
      command(
        $,
        choice("bind-key", "bind"),
        cmd_opts(options($, "nr"), $._note, $._key_table),
        $.key,
        $._tmux,
      ),
    break_pane_directive: ($) =>
      command(
        $,
        choice("break-pane", "breakp"),
        cmd_opts(
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
        cmd_opts(
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
        cmd_opts(
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
        cmd_opts(
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
        "choose-tree",
        cmd_opts(
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
      command(
        $,
        choice("clear-history", "clearhist"),
        cmd_opts($._target_pane),
      ),
    clear_prompt_history_directive: ($) =>
      command(
        $,
        choice("clear-prompt-history", "clearphist"),
        cmd_opts($._prompt_type),
      ),
    clock_mode_directive: ($) =>
      command($, choice("clock-mode", "clock"), cmd_opts($._target_pane)),
    _inputs: ($) => option($, "I", alias($._string, $.inputs)),
    _prompts: ($) => option($, "p", alias($._string, $.prompts)),
    _prompt_type: ($) => option($, "T", alias($._string, $.prompt_type)),
    command_prompt_directive: ($) =>
      command(
        $,
        "command-prompt",
        cmd_opts(
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
        cmd_opts(options($, "b"), $._prompt, $._target_client),
        $._tmux,
      ),
    copy_mode_directive: ($) =>
      command(
        $,
        "copy-mode",
        cmd_opts(options($, "eHMqu"), $._src_pane, $._target_pane),
      ),
    customize_mode_directive: ($) =>
      command(
        $,
        "customize-mode",
        cmd_opts(options($, "NZ"), $._format, $._filter, $._target_pane),
        $.template,
      ),
    delete_buffer_directive: ($) =>
      command($, choice("delete-buffer", "deleteb"), cmd_opts($._buffer_name)),
    _shell_command: ($) => option($, "E", $._shell),
    detach_client_directive: ($) =>
      command(
        $,
        choice("detach-client", "detach"),
        cmd_opts(
          options($, "aP"),
          $._shell_command,
          $.__target_session,
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
        cmd_opts(
          options($, "O"),
          $.__target_client,
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
        cmd_opts(
          options($, "aINpv"),
          $.__target_client,
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
        cmd_opts(options($, "bN"), $._delay, $._target_client),
        $.template,
      ),
    _border_lines: ($) => option($, "b", alias($._string, $.border_lines)),
    _style: ($) => option($, "s", alias($._string, $.style)),
    _border_style: ($) => option($, "S", alias($._string, $.border_style)),
    display_popup_directive: ($) =>
      command(
        $,
        choice("display-popup", "popup"),
        cmd_opts(
          options($, "BCE"),
          $._border_lines,
          $.__target_client,
          $.__start_directory,
          $._environment,
          $.__height,
          $._style,
          $._border_style,
          $._target_pane,
          $._title,
          $.__width,
          $._x,
          $._y,
        ),
        $._shell,
      ),
    _env_variable_name: (_) => /[A-Za-z_][A-Za-z0-9_]*/,
    environment_assignment: ($) =>
      prec.right(seq(
        field('name', alias($._env_variable_name, $.name)),
        '=',
        field('value', alias(optional($._string), $.value))
      )),
    find_window_directive: ($) =>
      command(
        $,
        choice("find-window", "findw"),
        cmd_opts(options($, "iCNrTZ"), $._target_pane),
        $._string,
      ),
    has_session_directive: ($) =>
      command($, choice("has-session", "has"), cmd_opts($._target_session)),
    if_shell_directive: ($) =>
      prec.right(
        2,
        command(
          $,
          choice("if-shell", "if"),
          cmd_opts(options($, "bF"), $._target_pane),
          $._shell,
          $._tmux,
          optional($._tmux),
        ),
      ),
    size: ($) => $._string,
    _size: ($) => option($, "l", $.size),
    __size: ($) => option($, "S", $.size),
    join_pane_directive: ($) =>
      command(
        $,
        choice("join-pane", "joinp"),
        cmd_opts(options($, "bdfhv"), $._size, $._src_pane, $._target_pane),
      ),
    kill_pane_directive: ($) =>
      command(
        $,
        choice("kill-pane", "killp"),
        cmd_opts(options($, "a"), $._target_pane),
      ),
    kill_server_directive: ($) => command($, "kill-server"),
    kill_session_directive: ($) =>
      command($, "kill-session", cmd_opts(options($, "aC"), $._target_session)),
    kill_window_directive: ($) =>
      command(
        $,
        choice("kill-window", "killw"),
        cmd_opts(options($, "a"), $._target_window),
      ),
    last_pane_directive: ($) =>
      command(
        $,
        choice("last-pane", "lastp"),
        cmd_opts(options($, "deZ"), $._target_window),
      ),
    last_window_directive: ($) =>
      command($, choice("last-window", "last"), cmd_opts($._target_session)),
    link_window_directive: ($) =>
      command(
        $,
        choice("link-window", "linkw"),
        cmd_opts(options($, "abdk"), $._src_window, $._target_window),
      ),
    list_buffers_directive: ($) =>
      command($, choice("list-buffers", "lsb"), cmd_opts($._format, $._filter)),
    list_clients_directive: ($) =>
      command(
        $,
        choice("list-clients", "lsc"),
        cmd_opts($._format, $._target_session),
      ),
    list_commands_directive: ($) =>
      command($, choice("list-commands", "lscm"), cmd_opts($._format), $._tmux),
    _prefix_string: ($) => option($, "P", alias($._string, $.prefix_string)),
    list_keys_directive: ($) =>
      command(
        $,
        choice("list-keys", "lsk"),
        cmd_opts(options($, "1aN"), $._prefix_string, $._key_table),
        $.key,
      ),
    list_panes_directive: ($) =>
      command(
        $,
        choice("list-panes", "lsp"),
        cmd_opts(options($, "as"), $._format, $._filter, $._target_pane),
      ),
    list_sessions_directive: ($) =>
      command($, choice("list-sessions", "ls"), cmd_opts($._format, $._filter)),
    list_windows_directive: ($) =>
      command(
        $,
        choice("list-windows", "lsw"),
        cmd_opts(options($, "a"), $._format, $._filter, $._target_session),
      ),
    load_buffer_directive: ($) =>
      command(
        $,
        choice("load-buffer", "loadb"),
        cmd_opts(options($, "w"), $._buffer_name, $._target_client),
        $.path,
      ),
    lock_client_directive: ($) =>
      command($, choice("lock-client", "lockc"), cmd_opts($._target_client)),
    lock_server_directive: ($) => command($, choice("lock-server", "lock")),
    lock_session_directive: ($) =>
      command($, choice("lock-session", "locks"), cmd_opts($._target_session)),
    move_pane_directive: ($) =>
      command(
        $,
        choice("move-pane", "movep"),
        cmd_opts(options($, "bdfhv"), $._size, $._src_pane, $._target_pane),
      ),
    move_window_directive: ($) =>
      command(
        $,
        choice("move-window", "movew"),
        cmd_opts(options($, "abrdk"), $._src_window, $._target_window),
      ),
    _start_directory: ($) =>
      option($, "c", alias($._string, $.start_directory)),
    __start_directory: ($) =>
      option($, "d", alias($._string, $.start_directory)),
    _environment: ($) => option($, "e", alias($._string, $.environment)),
    _flags: ($) => option($, "f", alias($._string, $.flags)),
    _format: ($) => option($, "F", alias($._string, $.format)),
    _window_name: ($) => option($, "n", alias($._string, $.window_name)),
    _session_name: ($) => option($, "s", alias($._string, $.session_name)),
    _group_name: ($) => option($, "t", alias($._string, $.group_name)),
    _width: ($) => option($, "x", alias($._string, $.width)),
    __width: ($) => option($, "w", alias($._string, $.width)),
    _height: ($) => option($, "y", alias($._string, $.height)),
    __height: ($) => option($, "h", alias($._string, $.height)),
    new_session_directive: ($) =>
      command(
        $,
        choice("new-session", "new"),
        cmd_opts(
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
        cmd_opts(
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
      command($, choice("next-layout", "nextl"), cmd_opts($._target_window)),
    next_window_directive: ($) =>
      command(
        $,
        choice("next-window", "next"),
        cmd_opts(options($, "a"), $._target_session),
      ),
    _separator: ($) => option($, "s", alias($._string, $.separator)),
    paste_buffer_directive: ($) =>
      command(
        $,
        choice("paste-buffer", "pasteb"),
        cmd_opts(
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
        cmd_opts(options($, "IOo"), $._target_pane),
        $._shell,
      ),
    previous_layout_directive: ($) =>
      command(
        $,
        choice("previous-layout", "prevl"),
        cmd_opts($._target_window),
      ),
    previous_window_directive: ($) =>
      command(
        $,
        choice("previous-window", "prev"),
        cmd_opts(options($, "a"), $._target_session),
      ),
    adjustment: ($) => $._string,
    _pane_state: ($) => option($, "A", alias($._string, $.pane_state)),
    _name_what_format: ($) =>
      option($, "B", alias($._string, $.name_what_format)),
    // TODO: -l [target-pane]
    refresh_client_directive: ($) =>
      command(
        $,
        choice("refresh-client", "refresh"),
        cmd_opts(
          options($, "cDLRSU"),
          $._pane_state,
          $._name_what_format,
          $.__size,
          $._flags,
          $.__target_pane,
          $._target_client,
        ),
        $.adjustment,
      ),
    rename_session_directive: ($) =>
      command(
        $,
        choice("rename-session", "rename"),
        cmd_opts($._target_session),
        $.name,
      ),
    rename_window_directive: ($) =>
      command(
        $,
        choice("rename-window", "renamew"),
        cmd_opts($._target_window),
        $.name,
      ),
    resize_pane_directive: ($) =>
      command(
        $,
        choice("resize-pane", "resizep"),
        cmd_opts(options($, "DLMRTUZ"), $._target_pane, $._width, $._height),
        optional($.adjustment),
      ),
    resize_window_directive: ($) =>
      command(
        $,
        choice("resize-window", "resizew"),
        cmd_opts(options($, "aADLRU"), $._target_window, $._width, $._height),
        $.adjustment,
      ),
    respawn_pane_directive: ($) =>
      command(
        $,
        choice("respawn-pane", "respawnp"),
        cmd_opts(
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
        cmd_opts(
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
        cmd_opts(options($, "DUZ"), $._target_window),
      ),
    pane: ($) => $._string,
    _target_pane: ($) => option($, "t", $.pane),
    __target_pane: ($) => option($, "l", $.pane),
    _src_pane: ($) => option($, "s", $.pane),
    window: ($) => $._string,
    _target_window: ($) => option($, "t", $.window),
    _src_window: ($) => option($, "s", $.window),
    session: ($) => $._string,
    _target_session: ($) => option($, "t", $.session),
    __target_session: ($) => option($, "s", $.session),
    client: ($) => $._string,
    _target_client: ($) => option($, "t", $.client),
    __target_client: ($) => option($, "c", $.client),
    int: (_) => /\d+/,
    _delay: ($) => option($, "d", $.int),
    run_shell_directive: ($) =>
      command(
        $,
        choice("run-shell", "run"),
        cmd_opts(options($, "bC"), $._delay, $._start_directory, $._target_pane),
        $._shell,
      ),
    save_buffer_directive: ($) =>
      command(
        $,
        choice("save-buffer", "saveb"),
        cmd_opts(options($, "a"), $._buffer_name),
        $.path,
      ),
    layout_name: ($) => $._string,
    select_layout_directive: ($) =>
      command(
        $,
        choice("select-layout", "selectl"),
        cmd_opts(options($, "Enop"), $._target_pane),
        $.layout_name,
      ),
    _title: ($) => option($, "T", alias($._string, $.title)),
    select_pane_directive: ($) =>
      command(
        $,
        choice("select-pane", "selectp"),
        cmd_opts(options($, "DdeLlMmRUZ"), $._target_pane, $._title),
      ),
    select_window_directive: ($) =>
      command(
        $,
        choice("select-window", "selectw"),
        cmd_opts(options($, "lnpT"), $._target_window),
      ),
    _keys: ($) => spaceSep1($, $.key),
    send_keys_directive: ($) =>
      command(
        $,
        choice("send-keys", "send"),
        cmd_opts(options($, "FHlMRX"), option($, "N", $.int), $._target_pane),
        $._keys,
      ),
    send_prefix_directive: ($) =>
      command($, "send-prefix", cmd_opts(options($, "2"), $._target_pane)),
    user: ($) => $._string,
    server_access_directive: ($) =>
      command(
        $,
        "server-access",
        cmd_opts(options($, "adlrw")),
        optional($.user),
      ),
    data: ($) => $._string,
    set_buffer_directive: ($) =>
      command(
        $,
        choice("set-buffer", "setb"),
        cmd_opts(
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
        cmd_opts(options($, "Fhgru"), $._target_session),
        $.name,
        optional($.value),
      ),
    set_hook_directive: ($) =>
      command(
        $,
        "set-hook",
        cmd_opts(options($, "agpRuw"), $._target_pane),
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
      command($, choice("show-buffer", "showb"), cmd_opts($._buffer_name)),
    show_environment_directive: ($) =>
      command(
        $,
        choice("show-environment", "showenv"),
        cmd_opts(options($, "hgs"), $._target_session),
        optional($.name),
      ),
    show_hooks_directive: ($) =>
      command($, "show-hooks", cmd_opts(options($, "gpw"), $._target_pane)),
    show_messages_directive: ($) =>
      command(
        $,
        choice("show-messages", "showmsgs"),
        cmd_opts(options($, "JT"), $._target_client),
      ),
    show_options_directive: ($) =>
      command(
        $,
        choice("show-options", "show"),
        cmd_opts(options($, "AgHpqsvw"), $._target_pane),
        $.option,
      ),
    show_prompt_history_directive: ($) =>
      command(
        $,
        choice("show-prompt-history", "showphist"),
        cmd_opts($._prompt_type),
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
        choice("split-window", "splitw"),
        cmd_opts(
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
        cmd_opts($._target_client),
      ),
    swap_pane_directive: ($) =>
      command(
        $,
        choice("swap-pane", "swapp"),
        cmd_opts(options($, "dDUZ"), $._src_pane, $._target_pane),
      ),
    swap_window_directive: ($) =>
      command(
        $,
        choice("swap-window", "swapw"),
        cmd_opts(options($, "d"), $._src_window, $._target_window),
      ),
    switch_client_directive: ($) =>
      command(
        $,
        choice("switch-client", "switchc"),
        cmd_opts(
          options($, "ElnprZ"),
          $.__target_client,
          $._target_session,
          $._key_table,
        ),
      ),
    unbind_key_directive: ($) =>
      command(
        $,
        choice("unbind-key", "unbind"),
        cmd_opts(options($, "anq"), $._key_table),
        $.key,
      ),
    unlink_window_directive: ($) =>
      command(
        $,
        choice("unlink-window", "unlinkw"),
        cmd_opts(options($, "k"), $._target_window),
      ),
    channel: ($) => $._string,
    wait_for_directive: ($) =>
      command(
        $,
        choice("wait-for", "wait"),
        optional(choice("-L", "-S", "-U")),
        $.channel,
      ),

    option: (_) => /[@A-Za-z-_\d]+/,

    hash_escape: (_) => /#[#,}]/,
    _hash: (_) => /#[^#,{}"'HhDPTSFIW]/,
    backslash_escape: (_) => /\\(u[\da-fA-F]{4}|u[\da-fA-F]{8}|[0-8]{3}|.)/,
    variable_name_short: (_) => /[HhDPTSFIW]/,
    variable_name: (_) => /[a-z-_\d]+/,
    variable: ($) => variable_rule($, '"'),
    variable_raw: ($) => variable_rule($, "'"),
    operator: (_) => /==|!=|<|>|<=|>=|\|\||&&/,
    attribute: (_) => /[a-z-]+/,
    raw_string_quote: (_) => "'",
    raw_string: ($) =>
      seq("'", optional(repeat(choice(
        $.variable_raw, $.hash_escape, $._hash, /([^#'])+/,
      ))), "'"),
    string: ($) =>
      seq('"', optional(repeat(choice(
        $.variable, $.backslash_escape, $.hash_escape, $._hash, /([^#"\\]|\\\r?\n)+/,
      ))), '"'),
    _word: (_) => /([^"'\\\s])([^"'\\\s]|\\["'\\\s])*/,
    _string: ($) => choice($.string, $.raw_string, $._word, $._code),
    _commands: ($) => repeat1($._command),
    _code: ($) => seq("{", $._commands, "}"),
    _shell: ($) =>
      choice(
        $.backslash_escape,
        $.string,
        quoted_string("'", $.shell, $.raw_string_quote),
        alias($._word, $.shell),
        $._code,
      ),
    _tmux: ($) =>
      choice(
        $.backslash_escape,
        $.string,
        seq($.raw_string_quote, $._command, $.raw_string_quote),
        $._command,
        $._code,
      ),

    comment: (_) => /#[^\n]*/,
    _eol: (_) => /\r?\n/,
    _space: (_) => prec(-1, repeat1(/[ \t]/)),
    _end: ($) => seq(optional($.comment), $._eol),
  },
});

function command($, cmd, ...args) {
  return seq(alias(cmd, $.command), ...args);
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

function quoted_string(char, name, char_rule = null) {
  char_rule = char_rule || char
  return seq(
    char_rule,
    alias(
      field("content", new RegExp("([^" + char + "]|\\\\" + char + ")*")),
      name,
    ),
    char_rule,
  );
}

function options($, chars) {
  return alias(new RegExp("-[" + chars + "]+"), $.command_line_option);
}

function option($, char, ...arg) {
  return choice(
    seq(alias("-" + char, $.command_line_option), ...arg),
    alias(new RegExp("-" + char + "\\S+"), $.command_line_option),
  );
}

function cmd_opts(...args) {
  return repeat(choice(...args));
}

function variable_rule($, quote) {
  const variable = quote == '"' ? $.variable : $.variable_raw
  return choice(
    seq("#", $.variable_name_short),
    seq(
      "#{",
      choice(
        $.variable_name,
        seq(
          choice(
            seq("?", choice(variable, $.variable_name)),
            seq(alias($.variable_name, $.function_name), ":"),
            seq($.operator, ":"),
          ),
          commaSep1(optional(repeat(choice(
            variable,
            $.hash_escape,
            $._hash,
            quote == '"' ? /[^,}"#]+/ : /[^,}'#]+/,
          )))),
        ),
      ),
      "}",
    ),
    seq(
      "#[",
      commaSep1(
        choice(
          $.attribute,
          seq($.attribute, "=", /[^\]]+/),
        ),
      ),
      "]",
    ),
  )
}
