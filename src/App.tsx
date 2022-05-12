import LexicalComposer from '@lexical/react/LexicalComposer';
import { $getRoot, $getSelection } from 'lexical';
import LexicalContentEditable from '@lexical/react/LexicalContentEditable';
import LexicalPlainTextPlugin from '@lexical/react/LexicalPlainTextPlugin';
import LexicalOnChangePlugin from '@lexical/react/LexicalOnChangePlugin';
import { CollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import './App.css'

function App() {
  function onChange(editorState) {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();

      console.log(root, selection);
    });
  }
  const initialConfig = {
    onError: () => { }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <LexicalPlainTextPlugin
        contentEditable={<LexicalContentEditable className="editor-input" />}
        placeholder={<div >hello</div>}
      />
      <LexicalOnChangePlugin onChange={onChange} />
      <CollaborationPlugin
        id="yjs-plugin"
        providerFactory={(id, yjsDocMap) => {

          const doc = new Y.Doc();
          yjsDocMap.set(id, doc);

          const provider = new WebsocketProvider(
            "ws://localhost:1234",
            id,
            doc
          );
          console.log(provider)
          return provider;
        }}
        shouldBootstrap={true}
      />
    </LexicalComposer>
  );

}

export default App
