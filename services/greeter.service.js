const { MoleculerError } = require('moleculer').Errors;
module.exports = {
    name: 'greeter',
    actions: {
        async sayHello(ctx){
            try{
                const input = ctx.params;
                if(!input.name){
                    throw new MoleculerError('Name input is required', 400, 'INVALID_INPUT');
                }
                return {
                    success: true,
                    message: `Hello ${input.name}`,
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