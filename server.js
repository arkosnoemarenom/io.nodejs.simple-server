


( () => {


    const httpsrv = require( `http` )
    const fs = require( `fs` )
    const serviceport = 9001

    var args = process.argv.slice(2)

    console.log( `${(new Date()).getTime()} / ${(new Date())} - starting service with the following arguments ${JSON.stringify( args )}` )


    if ( args.length < 1 ) {
        var date = new Date()
        console.warn( `${date.getTime()} / ${date} - ERROR: please, provide a correct path to the linkerd example JSON file` )
        process.exit( 2 )
    }
    if ( ! fs.existsSync( args[ 0 ] ) ) {
        var date = new Date()
        console.warn( `${date.getTime()} / ${date} - ERROR: file ${args[ 0 ]} not found` )
        process.exit( 2 )
    }

    server = httpsrv.createServer( ( req, res ) => {

        console.log( `request-headers: ${JSON.stringify( req.headers )}` )

        var requestBody = []

        if ( req.method.toUpperCase() === `POST` || req.method.toUpperCase() === `PUT` || req.method.toUpperCase() === `PATCH` ) {
            req
                .on( `data`, ( chunk ) => {
                    requestBody.push( chunk )
                } )
                .on( `end`, () => {
                    console.log( `linkerd.mock request body` )
                    console.log( Buffer.concat( requestBody ).toString() )
                } )
        }

        var date = new Date()

        let headers = {
            'Content-type': ' application/json'
        }

        res.writeHead( 200, headers )

        json = fs.readFileSync( args[ 0 ] )
        console.log( `${date.getTime()} / ${date} - [ 200 - ${req.method} ] writing response` )
        res.write( json )
        res.end()
    } )

    var date = new Date()
    console.log( `${date.getTime()} / ${date} - listen on port ${serviceport}` )
    server.listen( serviceport )
} )()
