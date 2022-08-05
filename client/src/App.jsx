import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import './App.css';
import { CREATE_USER } from './mutations/user';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';

function App() {
  const {data, loading, refetch} = useQuery(GET_ALL_USERS)
  const {data: oneUser, loading: loadingOneUser} = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  })
  const [newUser] = useMutation(CREATE_USER)
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0)

  console.log(oneUser);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data])

  const addUser = (e) => {
    e.preventDefault()
    newUser({
      variables: {
        input: {
          username, age
        }
      }
    }).then(({data}) => {
        console.log(data);
        setUsername('')
        setAge(0)
    })
  }

  const getAll = (e) => {
    e.preventDefault()
    refetch()
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <form>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
          type="text" 
        />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)} 
          type="number" 
        />
        <div className='btns'>
          <button onClick={addUser}>Create</button>
          <button onClick={getAll}>Get</button>
        </div>
      </form>
      <div className={'content'}>
        {users.map(user => 
          <div
            key={user.id}
            className={'item'}
          >{user.id}. {user.username} {user.age}</div>
        )}
      </div>
    </div>
  );
}

export default App;
