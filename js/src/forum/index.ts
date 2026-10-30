import app from 'flarum/forum/app';

import installSplitPreview from './installSplitPreview';

app.initializers.add('ramon-composer', () => {
  installSplitPreview();
});
