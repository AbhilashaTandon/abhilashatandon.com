import esbuild from 'esbuild'

buildAll()

async function buildAll() {
        return Promise.all([
                build('main', {
                        entryPoints: ['assets/js/main.js'],
                        platform: 'browser',
                        minify: true,
                        target: ['es6'],
                }),
                build('esm', {
                        entryPoints: ['assets/js/main.js'],
                        platform: 'neutral'
                }),
                build('cjs', {
                        entryPoints: ['assets/js/main.js'],
                        target: ['node10.4'],
                        platform: 'node',
                }),
        ])
}

async function build(name, options) {
        const path = `${name}.js`
        console.log(`Building ${name}`)

        if (process.argv.includes('--watch')) {
                let ctx = await esbuild.context({
                        outfile: `./_site/${path}`,
                        bundle: true,
                        logLevel: 'info',
                        sourcemap: true,
                        ...options,
                        minify: false
                })
                await ctx.watch()
        }
        else {
                return esbuild.build({
                        outfile: `./_site/${path}`,
                        bundle: true,
                        ...options,
                })
        }
}
