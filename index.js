const { ServiceBroker } = require('moleculer');
const ApiService = require('moleculer-web');

/* According to my understanding, the transporter is not required here since both the services are running on the same node */
const broker = new ServiceBroker({
    nodeID: "node-1",
    transporter: "NATS", // using NATS as the transporter
});

broker.createService({
    mixins: [ApiService],
    settings: {
        port: 4000,
        cors: {
            origin: '*' // Can specify the domains from which the request can be accepted
        },
        routes: [{
            path: '/',
            whitelist: ['**'], // publish all actions
            mappingPolicy: 'all', // Allows both aliases and default service paths
            /* endpoint is now /hello instead of /greeter/sayHello */
            aliases: {
                'hello': 'greeter.sayHello'
            }
        }]
    }
})
/* Load all the services from the services folder dynamically */
broker.loadServices('./services');

broker.start()
    .then(()=>{
        console.log('All the services are loaded and running on port 4000');
    })
    .catch((err)=>{
        console.log('Error starting the broker', err);
    })

