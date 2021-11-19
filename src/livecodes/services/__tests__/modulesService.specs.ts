import { modulesService } from '../modules';

describe('modulesService', () => {
  test('CDN urls', () => {
    const url = modulesService.getModuleUrl;
    expect(url('uuid')).toEqual('https://cdn.skypack.dev/uuid');
    expect(url('uuid@1.0.0')).toEqual('https://cdn.skypack.dev/uuid@1.0.0');
    expect(url('uuid@1.0.0/sub/directory/file.js')).toEqual(
      'https://cdn.skypack.dev/uuid@1.0.0/sub/directory/file.js',
    );
    expect(url('jsdelivr:uuid')).toEqual('https://cdn.jsdelivr.net/npm/uuid');
    expect(url('esm.run:uuid')).toEqual('https://esm.run/uuid');
    expect(url('esm.sh:uuid')).toEqual('https://esm.sh/uuid');
    expect(url('unpkg:uuid')).toEqual('https://unpkg.com/uuid?module');
  });
});
