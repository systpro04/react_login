import { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2/dist/sweetalert2.all'

const Body = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:3002/users');
        setUsers(response.data);
    };

    const deleteUser = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            await axios.delete(`http://localhost:3002/delete/${id}`);
            Swal.fire(
                'Deleted!',
                'The user has been deleted.',
                'success'
            );
            fetchUsers();
        }
    };

    return (
        <div className='container mt-5'>
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <a href="/" className='btn btn-primary'>Logout</a>
                    </div>
                    <div className="card-body">
                        <table className='table table-striped table-hover text-center'>
                            <thead>
                                <tr>
                                    <th className='bg-primary text-light'>Name</th>
                                    <th className='bg-primary text-light'>Username</th>
                                    <th className='bg-primary text-light'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.username}</td>
                                        <td>{user.username}</td>
                                        <td>
                                            <button onClick={() => deleteUser(user.id)}  className='btn btn-sm btn-danger'>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Body;
