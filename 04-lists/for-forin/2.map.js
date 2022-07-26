const service = require('./service')

Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = []
    for (let indice = 0; indice <= this.length - 1; indice++){
        const resultado = callback(this[indice], indice)
        novoArrayMapeado.push(resultado)
    }

    return novoArrayMapeado
}

async function main() {
    try {
        const results = await service.obterPessoas(`a`)
        // const names = []
        // results.results.forEach(function (item) {
        //     names.push(item.name)
        // })

        // const names = results.results.map(function (pessoa) {
        //     return pessoa.name
        // })
        // const names = results.results.map((pessoa) => pessoa.name)  // same behavior as code above, it just shorts the sentence using an arrow function (=>)

        const names = results.results.meuMap(function (pessoa, indice) {
            return `[${indice}]${pessoa.name}`
        })

        console.log('names', names)
    } catch (error) {
        console.log(`DEU RUIM`, error)
    }
}
main()


// References
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions