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
	'--ab',
	'--l=',
	'--m space',
	'--n\ttab',
	'--o\nnewline',
	'--no-p false',
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
	ab: true,
	l: false,
	m: 'space',
	n: 'tab',
	o: 'newline',
	p: true,
}

kava.suite('get-cli-arg', function (suite, test) {
	Object.entries(expectations).forEach(function ([key, expected]) {
		test(key, function () {
			const actual = getarg(key, args)
			deepEqual(actual, expected)
		})
	})
	test('invalid', function () {
		equal(typeof getarg('z', args), 'undefined')
	})
})
