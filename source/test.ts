import getarg from './'
import { equal, deepEqual } from 'assert-helpers'
import kava from 'kava'

const args = [
	'--a',
	'--b=',
	'--c=true',
	'--d=false',
	'--e="hello"',
	'--f=1.1',
	'--g={"a":true}'
]
const expectations = {
	a: true,
	b: false,
	c: true,
	d: false,
	e: 'hello',
	f: 1.1,
	g: { a: true }
}
kava.suite('get-cli-arg', function(suite, test) {
	Object.entries(expectations).forEach(function([key, expected]) {
		const actual = getarg(args, key)
		test(key, function() {
			deepEqual(actual, expected)
		})
	})
	test('invalid', function() {
		equal(typeof getarg(args, 'z'), 'undefined')
	})
})
