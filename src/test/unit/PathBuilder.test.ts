import { beforeEach, expect, test } from 'vitest';
import { PathBuilder } from '../../main/PathBuilder';

let pathBuilder: PathBuilder;

beforeEach(() => {
    pathBuilder = new PathBuilder("/beginning");
});

test('pathBuilder - with parameter', () => {
    pathBuilder.withParam("foo", "bar");

    const path = pathBuilder.buildPath();
    expect(path).to.eql('/beginning;foo=bar');
});

test('pathBuilder - with parameter map', () => {
    const params: Map<string, string[]> = new Map<string, string[]>();
    params.set('foo', ['fooval1', 'fooval2']);
    params.set('bar', ['barval1', 'barval2']);

    pathBuilder.withParams(params);
    
    const path = pathBuilder.buildPath();
    expect(path).to.eql('/beginning;foo=fooval1,fooval2;bar=barval1,barval2'); 
});