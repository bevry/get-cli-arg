import normalify from 'normalify'
export default function(args: Array<string> = process.argv, name: string): any {
	for (const arg of args) {
		let value = null
		// matcha rg
		if (arg.startsWith(name)) {
			value = arg.substring(name.length)
		} else if (arg.startsWith('--' + name)) {
			value = arg.substring(name.length + 2)
		}
		// has value, so arg matched
		if (value !== null) {
			if (value === '') {
				return true
			} else if (value[0] === '=') {
				value = value.substring(1)
				if (value === '') {
					return false
				}
				return normalify(value)
			}
		}
		// next arg
	}
}
