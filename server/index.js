const express=require('express')
const {ApolloServer}=require('@apollo/server')
const {expressMiddleware} =require('@apollo/server/express4')
const bodyParser = require('body-parser')
const cors = require('cors')
const {USERS}=require('./users')


const fetchTodos = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await response.json();
    return todos
}

const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    return users
}
const fetchUser = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const user = await response.json();
    return user
}

async function startServer(){
    const app=express()
    const server=new ApolloServer({
        typeDefs:`
            type Todo{
                id:ID!,
                completed:Boolean,
                title:String
                user:User
            }

            type User{
                id:ID!,
                name:String!,
                website:String!,
                company: Company!
            }

            type Company{
                name:String!
                bs:String!
            }

            type Query{
                getTodos:[Todo]
                getAllUsers:[User]
                getUser(id:ID!):User
            }
        `,
        resolvers:{
            Todo:{
                user:(todo)=>USERS.find(e=>e.id===todo.id)
            },
            Query:{
                getTodos:()=>fetchTodos(),
                getAllUsers:()=>fetchUsers(),
                getUser:()=>fetchUser(id)
            }
        }
    })
    app.use(bodyParser.json())
    app.use(cors())

    await server.start()
    app.use('/', expressMiddleware(server))

    app.listen(8000,()=>{
        console.log('http://localhost:8000')
    })
}


startServer().catch(error=>{
    console.log(error)
})

