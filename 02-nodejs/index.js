 /*
 0 Obter um usuario
 1 Obter o numero de usuario a partir de seu Id
 2 Obter o endereco do usuario pelo Id
*/
// importamos um modulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)


function obterUsuario(){
    // quando der algum problema -> reject
    // quando der sucesso -> resolve
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function (){
            // return reject(new Error('DEU RUIM  DE VERDADE!'))

            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario){
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve( {
                telefone: '489999',
                ddd: 48
            })
        }, 2000);
    })
}

function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua dos bobos',
            numero: 0
        })
    }, 2000);
}

// 1 passo: adicionar a palavra async -> automaticamente ela retornara uma Promise
main()
async function main() {
    try {
        console.time('medida-promise')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const telefone = resultado[0]
        const endereco = resultado[1]
        
        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}) ${telefone.telefone},
            Endereco: ${endereco.rua}, ${endereco.numero}
        `)
        console.timeEnd('medida-promise')

    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

// const usuarioPromise = obterUsuario()
// // para manipular o sucesso usamos a funcao .then
// // para manipular o erro usamos o .catch
// usuarioPromise
//     .then(function (usuario) {
//         return obterTelefone(usuario.id)
//             .then(function resolverTelefone(result) {
//                 return {
//                     usuario: {
//                         nome: usuario.nome,
//                         id: usuario.id
//                     },
//                     telefone: result
//                 }
//             })
//     })
//     .then(function (resultado) {
//         const endereco = obterEnderecoAsync(resultado.usuario.id)
//         return endereco.then(function resolveEndereco(result) {
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: result
//             }
//         })
//     })
//     .then(function (resultado) {
//         console.log(`
//             Nome: ${resultado.usuario.nome}
//             Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//             Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//         `)
//     })
//     .catch(function (error) {
//         console.error('DEU RUIM', error)
//     })

// obterUsuario(function resolverUsuario(error, usuario) {
//     // null || "" || 0 === false
//     if (error) {
//         console.error('DEU RUIM no USUARIO', error)
//         return;
//     }
//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if (error1) {
//             console.error('DEU RUIM no TELEFONE', error1)
//             return;
//         }
//         obterEndereco(usuario.id, function resolveEndereco(error2, endereco) {
//             if (error2) {
//                 console.error('DEU RUIM no ENDERECO', error2)
//                 return;
//             }

//             console.log(`
//              Nome: ${usuario.nome},
//              Endereco: ${endereco.rua}, ${endereco.numero}
//              Telefone: (${telefone.ddd}) ${telefone.telefone}
//             `)
//         })
//     })
// })
// const telefone = obterTelefone(usuario.id)


// console.log('telefone', usuario.telefone)