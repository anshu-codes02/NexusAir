const express=require('express');
const app=express();
const {serverConfig}=require('./config');
const {rateLimit}= require('express-rate-limit');
const {cxreateProxyMiddleware, createProxyMiddleware}=require('http-proxy-middleware');

const limiter= rateLimit({
    windowMs: 2*60*1000,
    limit: 30
});

app.use(limiter);

app.use('/flightService', createProxyMiddleware({
    target: serverConfig.FLIGHT_SERVICE_URL, 
    changeOrigin: true,
    pathRewrite:{'^/flightService': '/'}
}));

app.use('/bookingService', createProxyMiddleware({
    target: serverConfig.BOOKING_SERVICE_URL, 
    changeOrigin: true,
    pathRewrite:{'^/bookingService': '/'}
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', require('./routes'));

app.listen(serverConfig.PORT, ()=>{
    console.log(`API Gateway is running on port ${serverConfig.PORT}`);
});