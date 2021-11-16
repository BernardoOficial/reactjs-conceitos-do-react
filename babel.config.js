module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        [
            '@babel/preset-react', 
            {
                runtime: 'automatic' // realizar a importação automática do React no arquivos
            }
        ]
    ]
}