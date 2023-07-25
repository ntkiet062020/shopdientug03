const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv');
const path = require('path')
const port = 3000; // Đặt cổng của bạn ở đây

const errorMiddleware = require('./middlewares/errors')

// Setting up config file 
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
dotenv.config({ path: 'backend/config/config.env' })

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload());

//Code thêm
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');


app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', payment)
app.use('/api/v1', order)

// Cấu hình cho môi trường 'PRODUCTION'
if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    });
} else { // Môi trường phát triển
    // Cấu hình để phục vụ các tệp nguồn (source files) của bạn trong thư mục frontend
    app.use(express.static(path.join(__dirname, '../frontend')));

    // Nếu bạn sử dụng React Router hoặc tương tự, bạn cần xử lý tất cả các đường dẫn ở phía máy chủ
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app
