import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
          name: 'Jaewon',
          email: 'ljw1163@naver.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: true,
        },
        {
          name: 'John',
          email: 'user@example.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: false,
        },
      ],
    products: [
        {
            name: 'Headphone',
            image: '/images/headphone.png',
            category: 'Electronics',
            price: 50000,
            status: 'OnSale',
            description: 'asd'
        },
        {
            name: '416Textbook',
            image: '/images/headphone.png',
            category: 'Textbook',
            price: 10000,
            status: 'OnSale',
            description: 'qwe'
        },
        {
            name: 'White Dress',
            image: '/images/headphone.png',
            category: 'Fashion',
            price: 67000,
            status: 'Sold',
            description: 'try'
        }
    ],
  };
  export default data;