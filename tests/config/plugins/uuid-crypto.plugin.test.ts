import { uuidAdapter } from "../../../src/config/plugins"

describe('uuid crypto plugin', () => {

    test('uuidAdapter() should return a UUID', () => {
        const uuid = uuidAdapter();
        
        expect(typeof uuid).toBe('string');
        expect(uuid).toHaveLength(36);
    });

});