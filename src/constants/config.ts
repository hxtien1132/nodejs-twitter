import argv from 'minimist'

const options = argv(process.argv.slice(2))
// console.log("options",options)

export const isProduction = Boolean(options.production)
