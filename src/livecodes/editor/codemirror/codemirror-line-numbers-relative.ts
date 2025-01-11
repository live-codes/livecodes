// from https://github.com/jsjoeio/codemirror-line-numbers-relative

import { EditorView, type ViewUpdate, lineNumbers, gutter, GutterMarker } from '@codemirror/view';
import { Compartment, type EditorState, type Extension } from '@codemirror/state';

const relativeLineNumberGutter = new Compartment();

class Marker extends GutterMarker {
  /** The text to render in gutter */
  public text: string;

  public constructor(text: string) {
    super();
    this.text = text;
  }

  public toDOM() {
    return document.createTextNode(this.text);
  }
}

const absoluteLineNumberGutter = gutter({
  lineMarker: (view, line) => {
    const lineNo = view.state.doc.lineAt(line.from).number;
    const absoluteLineNo = new Marker(lineNo.toString());
    const cursorLine = view.state.doc.lineAt(view.state.selection.asSingle().ranges[0].to).number;

    if (lineNo === cursorLine) {
      return absoluteLineNo;
    }

    return null;
  },
  initialSpacer: () => {
    const spacer = new Marker('0');
    return spacer;
  },
});

function relativeLineNumbers(lineNo: number, state: EditorState) {
  if (lineNo > state.doc.lines) {
    return ' ';
  }
  const cursorLine = state.doc.lineAt(state.selection.asSingle().ranges[0].to).number;
  if (lineNo === cursorLine) {
    return ' ';
  } else {
    return Math.abs(cursorLine - lineNo).toString();
  }
}
// This shows the numbers in the gutter
const showLineNumbers = relativeLineNumberGutter.of(
  lineNumbers({ formatNumber: relativeLineNumbers }),
);

// This ensures the numbers update
// when selection (cursorActivity) happens
const lineNumbersUpdateListener = EditorView.updateListener.of((viewUpdate: ViewUpdate) => {
  if (viewUpdate.selectionSet) {
    viewUpdate.view.dispatch({
      effects: relativeLineNumberGutter.reconfigure(
        lineNumbers({ formatNumber: relativeLineNumbers }),
      ),
    });
  }
});

export function lineNumbersRelative(): Extension {
  return [absoluteLineNumberGutter, showLineNumbers, lineNumbersUpdateListener];
}
