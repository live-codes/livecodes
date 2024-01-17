import { modulesService } from '../modules';

describe('modulesService', () => {
  test('CDN urls', () => {
    const url = modulesService.getModuleUrl;

    expect(url('uuid')).toEqual('https://esm.sh/uuid');

    expect(url('uuid@1.0.0')).toEqual('https://esm.sh/uuid@1.0.0');

    expect(url('uuid@1.0.0/sub/directory/file.js')).toEqual(
      'https://esm.sh/uuid@1.0.0/sub/directory/file.js',
    );

    expect(url('jspm:uuid')).toEqual('https://jspm.dev/uuid');

    expect(url('npm:uuid')).toEqual('https://esm.sh/uuid');

    expect(url('skypack:uuid')).toEqual('https://cdn.skypack.dev/uuid');

    expect(url('uuid', { defaultCDN: 'skypack' })).toEqual('https://cdn.skypack.dev/uuid');

    expect(url('uuid@1.0.0', { defaultCDN: 'skypack' })).toEqual(
      'https://cdn.skypack.dev/uuid@1.0.0',
    );

    expect(url('uuid@1.0.0/sub/directory/file.js', { defaultCDN: 'skypack' })).toEqual(
      'https://cdn.skypack.dev/uuid@1.0.0/sub/directory/file.js',
    );

    expect(url('jsdelivr:uuid')).toEqual('https://cdn.jsdelivr.net/npm/uuid');

    expect(url('jsdelivr.gh:jquery/jquery/dist/jquery.min.js')).toEqual(
      'https://cdn.jsdelivr.net/gh/jquery/jquery/dist/jquery.min.js',
    );

    expect(url('esm.run:uuid')).toEqual('https://esm.run/uuid');

    expect(url('esm.sh:uuid')).toEqual('https://esm.sh/uuid');

    expect(url('unpkg:uuid')).toEqual('https://unpkg.com/uuid?module');

    expect(url('bundlejs:uuid')).toEqual('https://deno.bundlejs.com/?file&q=uuid');

    expect(url('deno:uuid')).toEqual(
      'https://deno.bundlejs.com/?file&q=https://deno.land/x/uuid/mod.ts',
    );

    expect(url('https://deno.land/x/uuid/mod.ts')).toEqual(
      'https://deno.bundlejs.com/?file&q=https://deno.land/x/uuid/mod.ts',
    );

    expect(url('https://github.com/uuidjs/uuid/blob/main/src/v4.js')).toEqual(
      'https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/uuidjs/uuid@main/src/v4.js',
    );

    expect(url('github:everthis/leetcode-js/blob/master/1-two-sum.js')).toEqual(
      'https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/everthis/leetcode-js@master/1-two-sum.js',
    );

    expect(url('github:uuidjs/uuid/blob/main/src/v4.js')).toEqual(
      'https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/uuidjs/uuid@main/src/v4.js',
    );

    expect(
      url(
        'gist.github:hatemhosny/8e8d724186e8e239dea099ab88278681/raw/18815f01e7fe1eb1127872edcff1d1f98d8abfd6/index.html',
      ),
    ).toEqual(
      'https://gist.githack.com/hatemhosny/8e8d724186e8e239dea099ab88278681/raw/18815f01e7fe1eb1127872edcff1d1f98d8abfd6/index.html',
    );

    expect(url('gitlab:gitterHQ/webapp/-/blob/develop/server/web.js')).toEqual(
      'https://deno.bundlejs.com/?file&q=https://gl.githack.com/gitterHQ/webapp/-/raw/develop/server/web.js',
    );

    expect(url('https://gitlab.com/gitterHQ/webapp/-/blob/develop/server/web.js')).toEqual(
      'https://deno.bundlejs.com/?file&q=https://gl.githack.com/gitterHQ/webapp/-/raw/develop/server/web.js',
    );
  });
});
