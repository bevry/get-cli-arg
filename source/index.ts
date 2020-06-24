import { argv } from 'process'
import normalify from 'normalify'

/**
 * Get the value of a CLI argument that is provided via:
 * --arg
 * --arg=value
 * --no-arg
 * --no-arg=value
 * @param name the name of the argument to find
 * @param args the list of the arguments to search, defaults to `process.argv`
 * @returns the result typecasted to whatever format the value represented
 */
export default function (name: string, args: Array<string> = argv): any {
	for (const arg of args) {
		let value: any,
			invert = false
		// match arg
		if (arg.startsWith('--' + name)) {
			value = arg.substring(name.length + 2)
		} else if (arg.startsWith('--no-' + name)) {
			value = arg.substring(name.length + 5)
			invert = true
		} else {
			// not found in this argument, continue to next argument
			continue
		}
		// adapt the value
		if (value === '') {
			value = true
		} else if (value[0] === '=') {
			value = value.substring(1)
			if (value === '') {
				value = false
			} else {
				value = normalify(value)
			}
		}
		// return the value, and invert it if necessary
		return invert ? !value : value
	}
}
