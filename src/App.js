import './App.css';
import { gql, useQuery } from '@apollo/client'

const query = gql`
  query GetAllTodos{
    getTodos{
      id
      title
      completed
      user
      {
        name
        website
        company{
          name
          bs
        }
      }
    }
  }
`

function App() {

  const {data} = useQuery(query)

  if (!data || !data.getTodos) {
    return <div>Loading...</div>;
  }

  return (

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Username</th>
            <th scope="col">Website</th>
            <th scope="col">Company</th>
            <th scope="col">BS</th>
          </tr>
        </thead>
        <tbody>
          {data.getTodos.filter((todo) => todo.user !== null).map(todo =>
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo?.user?.name}</td>
              <td>{todo?.user?.website}</td>
              <td>{todo?.user?.company?.name}</td>
              <td>{todo?.user?.company?.bs}</td>
            </tr>
          )}
        </tbody>
      </table>
  );
}

export default App;
