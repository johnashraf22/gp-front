import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type UserType = 'user' | 'seller' | 'admin';

interface UserSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  userType: UserType;
}

const UserSidebar = ({ isOpen, onClose, username, userType }: UserSidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // هنا ممكن تضيف لوجيك تسجيل الخروج
    console.log('Logged out');
    onClose();
    navigate('/login');
  };

  const renderLinks = () => {
    if (userType === 'user') {
      return (
        <>
          <Button variant="ghost" className="justify-start w-full" onClick={() => navigate('/orders')}>
            My Orders
          </Button>
          <Button variant="ghost" className="justify-start w-full" onClick={() => navigate('/wishlist')}>
            Wishlist
          </Button>
        </>
      );
    }

    if (userType === 'seller') {
      return (
        <>
          <Button variant="ghost" className="justify-start w-full" onClick={() => navigate('/seller/add-product')}>
            Add Product
          </Button>
          <Button variant="ghost" className="justify-start w-full" onClick={() => navigate('/seller/items')}>
            My Items
          </Button>
        </>
      );
    }

    if (userType === 'admin') {
      return (
        <>
          <Button variant="ghost" className="justify-start w-full" onClick={() => navigate('/admin/categories')}>
            Manage Categories
          </Button>
          <Button variant="ghost" className="justify-start w-full" onClick={() => navigate('/admin/manage-items')}>
            Manage Items
          </Button>
          <Button variant="ghost" className="justify-start w-full" onClick={() => navigate('/admin/rates')}>
            Rates
          </Button>
          <Button variant="ghost" className="justify-start w-full" onClick={() => navigate('/admin/requests')}>
            Requests
          </Button>
        </>
      );
    }

    return null;
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[300px] sm:w-[350px]">
        <SheetHeader className="mb-4 flex items-center justify-between">
          <SheetTitle className="text-lg font-semibold">Hello, {username}</SheetTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </SheetHeader>

        <div className="flex flex-col space-y-2">
          {renderLinks()}
        </div>

        <div className="absolute bottom-4 left-0 w-full px-6">
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserSidebar;
