import { Navigate} from 'react-router'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useRole from '../hooks/useRole'

const AdminRoute = ({ children }) => {
    const [role, isRoleLoading] = useRole();
    // console.log('I was here, in Admin route')
    if (isRoleLoading) return <LoadingSpinner />
    if (role === 'admin') return children
    return <Navigate to='/' replace='true' />
}

export default AdminRoute