const { MoleculerError } = require('moleculer').Errors;
module.exports = {
    name: 'test',
    actions:{
        testAction(ctx){
            try{
                const input = ctx.params;
                /* Business logic goes here */
                return {
                    success: true,
                    message: `Response from testAction route`,
                    statusCode: 200,
                };
            }catch(err){
                if(err instanceof MoleculerError){
                    return {
                        success: false,
                        error: {
                            message: err.message,
                            code: err.code,
                            type: err.type || 'UNKOWN_ERROR'
                        },
                        statusCode: err.code,
                    }
                }
                return {
                    success: false,
                    error: {
                        message: 'An unexpected error occurred',
                        type: 'INTERNAL_ERROR',
                    },
                    statusCode: 500,
                }
            }
        }
    }
};