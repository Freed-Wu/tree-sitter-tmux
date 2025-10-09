import XCTest
import SwiftTreeSitter
import TreeSitterTmux

final class TreeSitterTmuxTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_tmux())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading tmux grammar")
    }
}
