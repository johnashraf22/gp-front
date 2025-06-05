import Navbar from '@/components/Navbar';
import { useUser } from '@/contexts/UserContext'; // هنا بنجيب حالة المستخدم من Context أو أي مكان بتحفظي فيه بيانات اليوزر

const DynamicNavbar = () => {
  const { user } = useUser(); // user = null لو مش مسجل دخول

  if (!user) return <NavbarGuest />;         // لو مفيش يوزر، يعني Guest
  if (user.role === 'user') return <NavbarUser />;   // لو يوزر دوره Buyer
  if (user.role === 'seller') return <NavbarSeller />; // لو Seller
  if (user.role === 'admin') return <NavbarAdmin />;   // لو Admin

  return null; // لو فيه دور غير معروف مثلاً
};

export default DynamicNavbar;