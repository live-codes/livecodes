# Advanced Topics {#advanced-topics-custom-content-top}

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items.filter(item => item.docId !== 'languages/index')}/>
```