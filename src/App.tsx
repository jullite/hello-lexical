import LexicalComposer from '@lexical/react/LexicalComposer';
import { SharedHistoryContext } from './context';

import ContentEditable from '@lexical/react/LexicalContentEditable';
import RichTextPlugin from '@lexical/react/LexicalRichTextPlugin';
import { createWebsocketProvider } from './collaboration';
import { CollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import './App.css'

function App() {
  const initialConfig = {
    onError: () => { }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<div>type here</div>}
          initialEditorState={null}
        />
        <CollaborationPlugin
          id="main"
          providerFactory={createWebsocketProvider}
          shouldBootstrap={true}
        />
      </SharedHistoryContext>
    </LexicalComposer>
  );

}

export default App
