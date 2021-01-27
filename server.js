


( () => {


    const httpsrv = require( `http` )
    const fs = require( `fs` )

    var args = process.argv.slice(2)

    
    if ( args.length < 1 ) {
        var date = new Date()
        console.warn( `${date.getTime()} / ${date} - ERROR: please, provide a correct path to the linkerd example JSON file` )
        process.exit( 2 )
        return
    }
    if ( ! fs.existsSync( args[ 0 ] ) ) {
        var date = new Date()
        console.warn( `${date.getTime()} / ${date} - ERROR: file ${args[ 0 ]} not found` )
        process.exit( 2 )
        return
    }

    server = httpsrv.createServer( ( req, res ) => {

        var date = new Date()

        let headers = {
            'Content-type': ' application/json'
        }

        res.writeHead( 200, headers )
        
        json = fs.readFileSync( args[ 0 ] )
        console.log( `${date.getTime()} / ${date} - [ 200 ] writing response` )
        res.write( json )
        res.end()
    } )

    var date = new Date()
    console.log( `${date.getTime()} / ${date} - listen on port 9000` )
    server.listen( 9000 )
} )()