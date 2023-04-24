---
sidebar_class_name: exclude_from_sidebar
---

# Advanced Topics

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items.filter(item => item.docId !== 'languages/index')}/>
```
