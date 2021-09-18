# [0.3.0](https://github.com/live-codes/livecodes/compare/v0.2.0...v.0.3.0) (2021-02-11)

### Bug Fixes

- **app:** await async functions ([3e647b7](https://github.com/live-codes/livecodes/commit/3e647b74db9a2568a45bd56213cffd24a4af7fc7))
- **console:** fix changed variable names ([c514815](https://github.com/live-codes/livecodes/commit/c5148152395099d3f2916e5b7c901ebe578f7700))
- **CSS Presets:** fix selecting CSS preset none ([8382605](https://github.com/live-codes/livecodes/commit/838260553c45373ceecf68ded67385f5fe80e6ee))
- **import:** fix importing github and gitlab repos root directory ([ba55e3d](https://github.com/live-codes/livecodes/commit/ba55e3d786d08cba38b37863d950f49fc914f6d5))
- **result:** use postMessage to send code to result page ([636acad](https://github.com/live-codes/livecodes/commit/636acada7782e0706a9912e1f4710ef6d1dfecb3))
- **UI:** fix settings menu too wide on small screens ([18f1159](https://github.com/live-codes/livecodes/commit/18f11597a061fcfa1015bd6c66f37488328cceb7))

### Features

- **compiled:** view compiled code ([f93e2ce](https://github.com/live-codes/livecodes/commit/f93e2cecf2909b25fb9f22fcb3bdd24a9b1a7ed3))
- **console:** add console input auto-complete for user code ([1115331](https://github.com/live-codes/livecodes/commit/1115331c672d1b9ac9dd3ba2a1f0251f344e4410))
- **console:** add JS console ([36a24e9](https://github.com/live-codes/livecodes/commit/36a24e9d1c8c060cc656e0dc9480efdc96c1539e))
- **console:** add tools pane ([aeefcb3](https://github.com/live-codes/livecodes/commit/aeefcb3b7940c58570d9a8f89c9185aaef92b89c))
- **console:** handle logging different data types ([9c59aad](https://github.com/live-codes/livecodes/commit/9c59aad4f5b40d337a03f7f1e705a3a45ee09965))
- **import:** load imports without page refresh ([cce9539](https://github.com/live-codes/livecodes/commit/cce9539d488056f87d7826da87dfb30587006032))
- **loading:** use animating logo as loading indicator ([f65753a](https://github.com/live-codes/livecodes/commit/f65753a22b37ca1a7602fbc7ed874ceb5502579a))
- **result:** show result page size on resize ([a48107e](https://github.com/live-codes/livecodes/commit/a48107e1e1edf2464d16c1ab9100a726b87db64f))
- **UI:** add loading indicator on tools pane ([8b8ea41](https://github.com/live-codes/livecodes/commit/8b8ea410fc440950c48bb4c9f509cf29fa3e2192))
- **UI:** scroll settings menu when longer than view port ([b706274](https://github.com/live-codes/livecodes/commit/b706274cc7e9a9908c5af9200da743211ea7a83b))

# [0.2.0](https://github.com/live-codes/livecodes/compare/v0.1.0...v0.2.0) (2021-01-22)

### Bug Fixes

- **compilers:** fix baseUrl for sass worker ([25320a1](https://github.com/live-codes/livecodes/commit/25320a1c3700d72acf4821b6cc70bb703ba2ace5))
- **compilers:** fix Less transpiler ([d3e4174](https://github.com/live-codes/livecodes/commit/d3e4174c09c905761a24bc75abdccae790b103f2))
- display active editor on loadConfig ([737bce5](https://github.com/live-codes/livecodes/commit/737bce5f6d7f1be595b9e824636f3e9ee2610504))
- set active language on changing editor ([1e884d8](https://github.com/live-codes/livecodes/commit/1e884d8f95b1b49fbd939ad1d2c8303f10418d6d))

### Code Refactoring

- **result**: use blob URL as src for result iframe ([c7c61c8](https://github.com/live-codes/livecodes/commit/c7c61c8e3ccf329756f9751350f99a4564ff70e8))
- **config:** rename snakecase config params to camelcase ([6cc9c99](https://github.com/live-codes/livecodes/commit/6cc9c994c889d3dbcf19e8a1f856bc0b9b33c629))

### Features

- **result:** add iframe sandbox ([217d7ee](https://github.com/live-codes/livecodes/commit/217d7eefbfa51e3e7f80b038b2a54fadfbf97a93))
- **templates**: start new projects from templates ([d2fcdc5](https://github.com/live-codes/livecodes/commit/d2fcdc5d55e2ce5ba54047e05b480b476caf8f3d))
- **CSS Presets**: Add CSS Presets ([347fed8](https://github.com/live-codes/livecodes/commit/347fed8dd7c66a834e3df388ebfe95cde7714757))
- **formatter:** add prettier parser for pug ([b153098](https://github.com/live-codes/livecodes/commit/b15309809231abca546c1418f3260e0c2ed9f196))

### BREAKING CHANGES

- **config:** rename snakecase config params to camelcase

# 0.1.0 (2021-01-10)

- Initial public release
