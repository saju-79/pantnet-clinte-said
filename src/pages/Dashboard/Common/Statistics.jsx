import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import CostomerStatistics from '../../../components/Dashboard/Statistics/CostomerStatistics'
import SellerStaristics from '../../../components/Dashboard/Statistics/SellerStaristics'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useRole from '../../../hooks/useRole'
const Statistics = () => {
  const [role, rolepeanding] = useRole()
  if (rolepeanding) return <LoadingSpinner></LoadingSpinner>
  return (
    <div>
      {role === "admin" && <AdminStatistics />}
      {role === "seller" && <SellerStaristics></SellerStaristics>}
      {role === "customer" && <CostomerStatistics />}
    </div>
  )
}

export default Statistics
