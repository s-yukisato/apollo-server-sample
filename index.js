const  { ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`
    type Query {
        allBooks: [Book]
        getBook(isbn: String!): Book
    }
    
    type Book {
        title: String
        author: String
        year: Int!
        isbn: String!
    }
`;


const books = [
    {
        title: 'Webを支える技術',
        author: '山本　陽平',
        year: 2010,
        isbn: '978-4-7741-4204-3'
    },
    {
        title: '失敗から学ぶRDB',
        author: '曾根　壮大',
        year: 2019,
        isbn: '978-4-297-10408-5'
    },
    {
        title: 'Vue.js入門',
        author: '川口和也',
        year: 2018,
        isbn: '978-4-297-10091-9'
    },
]

const resolvers = {
    Query: {
        allBooks: () => books,
        getBook: (_, args) => books.find(book => book.isbn === args.isbn)
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers,

    // context
    // context: ({req}) => ({
    //     // リクエストヘッダの Authorization の値を取得する
    //     const token = req.headers.authorization || '';
    //     // token からユーザーを取得する
    //     const user = getUser(token);
    //     // コンテキストにユーザーをセットする
    //     reutrn { user };
    // })
});

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
})
