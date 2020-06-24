import getarg from './index.js'
import { equal, deepEqual } from 'assert-helpers'
import kava from 'kava'

const args = [
	'--a',
	'--b=',
	'--c=true',
	'--d=false',
	'--e="hello"',
	'--f=1.1',
	'--g={"a":true}',
	'--no-h',
	'--no-i=false',
	'--no-j=true',
]

const expectations = {
	a: true,
	b: false,
	c: true,
	d: false,
	e: 'hello',
	f: 1.1,
	g: { a: true },
	h: false,
	i: true,
	j: false,
}
kava.suite('get-cli-arg', function (suite, test) {
	Object.entries(expectations).forEach(function ([key, expected]) {
		const actual = getarg(key, args)
		test(key, function () {
			deepEqual(actual, expected)
		})
	})
	test('invalid', function () {
		equal(typeof getarg('z', args), 'undefined')
	})
})
