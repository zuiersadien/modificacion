import chalk from 'chalk'
import { readFileSync } from 'fs'

const msgPath = process.env.GIT_PARAMS
const msg = readFileSync(msgPath, 'utf-8').trim()

const releaseRE = /^v\d/
const commitRE = /^(revert: )?(CBK-)(\(.+\))?[0-9]{0,999}: .{1,50}/

if (!releaseRE.test(msg) && !commitRE.test(msg)) {
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      `invalid commit message format.`
    )}\n\n` +
      chalk.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
      ) +
      `    ${chalk.green(`CBK-40: Actualizacion del home`)}\n` +
      `    ${chalk.green(`CBK-40: handle events on blur (close #28)`)}\n\n` +
      chalk.red(`  See .github/commit-convention.md for more details.\n`)
  )
  process.exit(1)
}
