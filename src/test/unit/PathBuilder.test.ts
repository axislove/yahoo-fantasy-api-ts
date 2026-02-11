import { beforeEach, expect, test } from 'vitest';
import { PathBuilder } from '../../main/PathBuilder';

let pathBuilder: PathBuilder;

beforeEach(() => {
    pathBuilder = new PathBuilder("/beginning");
});

test('pathBuilder - with parameter', () => {
    const originalPath = pathBuilder.buildPath();
    const pb = pathBuilder.withParam("foo", "bar");
    const newPath = pb.buildPath();

    expect(originalPath).to.eql('/beginning');
    expect(newPath).to.eql('/beginning;foo=bar');
});

test('pathBuilder - with parameter map', () => {
    const params: Map<string, string[]> = new Map<string, string[]>();
    params.set('foo', ['fooval1', 'fooval2']);
    params.set('bar', ['barval1', 'barval2']);
    
    const originalPath = pathBuilder.buildPath();
    const newPath = pathBuilder.withParams(params).buildPath();

    expect(originalPath).to.eql('/beginning');
    expect(newPath).to.eql('/beginning;foo=fooval1,fooval2;bar=barval1,barval2'); 
});