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
		// match
		const regexp = new RegExp(`^--(no-)?${name}(?:[=\\s](.*))?$`, 'i')
		const match = arg.match(regexp)

		// not found in this argument, continue to next argument
		if (!match) continue

		// extract
		const invert = Boolean(match[1])
		const raw: any = match[2]

		// process value
		let value: any
		if (typeof raw === 'undefined') {
			value = true
		} else if (raw === '') {
			value = false
		} else {
			value = normalify(raw)
		}

		// return the value, and invert it if necessary
		return invert ? !value : value
	}
}
