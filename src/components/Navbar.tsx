import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserSidebar from '@/components/UserSidebar';
import { useUser } from '@/contexts/UserContext';

const Navbar = () => {
  const [showUserSidebar, setShowUserSidebar] = useState(false);
  const location = useLocation();
  const { isLoggedIn, userType, username } = useUser();

  const getNavigationLinks = () => {
    console.log(userType);
    const baseLinks = [
      { to: "/", label: "Home" },
      { to: "/about", label: "About" }
    ];

    if (userType === 'user' || userType === 'guest') {
      return [
        ...baseLinks,
        { to: "/books", label: "Books" },
        { to: "/clothes", label: "Clothes" }
      ];
    } else if (userType === 'seller') {
      return [
        ...baseLinks,
        { to: "/seller/add-product", label: "Add Product" },
        { to: "/seller/items", label: "Seller Items" }
      ];
    } else if (userType === 'admin') {
      return [
        ...baseLinks,
        { to: "/admin/categories", label: "Update Categories" },
        { to: "/admin/manage-items", label: "Manage Items" },
        { to: "/admin/rates", label: "Rates" },
        { to: "/admin/requests", label: "Requests" }
      ];
    }

    return baseLinks;
  };

  const navigationLinks = getNavigationLinks();

  return (
    <>
      <nav className="sticky top-0 z-40 bg-[#F8F6F0]/85 backdrop-blur-sm border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex items-center -ml-8">
              <Link to="/" className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors text-3xl">
                The Hidden Haul
              </Link>
            </div>

            {/* Center Navigation Links */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              <div className="flex space-x-8">
                {navigationLinks.map((link) => (
                  <Link 
                    key={link.to}
                    to={link.to} 
                    className="font-medium text-gray-700 hover:text-emerald-600 transition-colors text-xl"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-6 ml-8">
              {!isLoggedIn ? (
                <>
                  <Link to="/register">
                    <Button variant="outline" className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 text-xl px-8 py-4">
                      Register
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xl px-8 py-4">
                      Log In
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  {userType === 'user' && (
                    <Link to="/cart">
                      <Button variant="outline" size="icon" className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 w-14 h-14">
                        <ShoppingCart className="h-7 w-7" />
                      </Button>
                    </Link>
                  )}

                  {userType !== 'guest' && (
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 w-14 h-14"
                      onClick={() => setShowUserSidebar(true)}
                    >
                      <User className="h-7 w-7" />
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar (only for logged-in users excluding guest) */}
      {isLoggedIn && userType !== 'guest' && (
        <UserSidebar 
          isOpen={showUserSidebar} 
          onClose={() => setShowUserSidebar(false)} 
          username={username || 'John Doe'}
          userType={userType}
        />
      )}
    </>
  );
};

export default Navbar;
