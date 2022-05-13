import LexicalComposer from '@lexical/react/LexicalComposer';
import { $getRoot, $getSelection } from 'lexical';
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
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input"/>}
        placeholder={<div>type here</div>}
        initialEditorState={null}
      />
      <CollaborationPlugin
        id="main"
        providerFactory={createWebsocketProvider}
        shouldBootstrap={true}
      />
    </LexicalComposer>
  );

}

export default App
