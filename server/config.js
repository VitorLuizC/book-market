const process = require('process') // Sim, eu importo o módulo process. Não
                                   // gosto de usar variáveis mágicas que surgem
                                   // do nada no código.

const config = {
  port: 9000 || process.env.PORT,
  /**
   * Informa no terminal (console) que a aplicação inicializou e a URL dela.
   */
  callback() {
    console.log(
      trim(`
        Application was started!
        Application is listening at http://localhost:${config.port}/.
      `)
    )
  }
}

/**
 * Remove a indentação do texto.
 * @param {string} text
 * @returns {string}
 */
function trim(text) { // Útil pra escrever template strings com
  return text         // indentação mas não a exibir (indentação).
    .replace(/\ \ /gm, '')
    .replace(/^\r?\n|\r?\n$/gm, '')
}

module.exports = config
